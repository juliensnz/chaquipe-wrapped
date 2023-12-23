import {Client} from '@/domain/model/Client';
import {GlobalStats, LeaderBoard} from '@/domain/model/GlobalStats';
import {Payment} from '@/domain/model/Payment';
import {Purchase} from '@/domain/model/Purchase';
import {Either, Result} from '@/domain/model/Result';
import {RuntimeError} from '@/domain/model/RuntimeError';
import {EnrichedUserStats, UserStats} from '@/domain/model/UserStats';
import {clientRepository} from '@/infrastructure/firestore/ClientRepository';
import {paymentRepository} from '@/infrastructure/firestore/PaymentRepository';
import {purchaseRepository} from '@/infrastructure/firestore/PurchaseRepository';

const TWELVE_HOURS = 12 * 60 * 60 * 1000;
const THIRTY_MINUTES = 30 * 60 * 1000;
// https://askentomologists.com/2016/09/29/how-much-water-can-ants-drink/
const NUMBER_OF_ANTS_PER_CL = 1 / (7 / 10_000);

const getFirstPurchase = (purchases: Purchase[]) =>
  purchases.reduce((first, purchase) => {
    if (purchase.time < first.time) {
      return purchase;
    }

    return first;
  }, purchases[0]);

const getLastPurchase = (purchases: Purchase[]) =>
  purchases.reduce((last, purchase) => {
    if (purchase.time > last.time) {
      return purchase;
    }

    return last;
  }, purchases[0]);

const getNumberOfRounds = (
  purchases: Purchase[]
): {drinksForSelf: number; offeredRounds: number; drinks: number; biggestRound: number} => {
  let rounds: Purchase[][] = [];
  let index = 0;

  for (const purchase of purchases) {
    if (undefined === rounds[index] || undefined === rounds[index][0]) {
      rounds[index] = [purchase];
      continue;
    }
    if (purchase.time - rounds[index][0].time < 10_000) {
      rounds[index].push(purchase);
    } else {
      index++;
      rounds[index] = [purchase];
    }
  }

  const offeredRounds = rounds.filter(round => round.length > 1);
  const offeredDrinks = offeredRounds.reduce((total, round) => total + round.length - 1, 0);
  const biggestRound = offeredRounds.reduce((total, round) => {
    if (round.length > total) {
      return round.length;
    }

    return total;
  }, 0);
  return {drinksForSelf: rounds.length, offeredRounds: offeredRounds.length, drinks: offeredDrinks, biggestRound};
};

const generateAllStats = async (): Promise<
  Either<{allUserStats: Record<string, EnrichedUserStats>; globalStats: GlobalStats}, RuntimeError>
> => {
  const paymentsResult = await paymentRepository.findAll();
  const purchasesResult = await purchaseRepository.findAll();
  const clientsResult = await clientRepository.findAll();

  if (clientsResult.isError()) {
    return Result.Error(clientsResult.getError());
  }
  if (paymentsResult.isError()) {
    return Result.Error(paymentsResult.getError());
  }
  if (purchasesResult.isError()) {
    return Result.Error(purchasesResult.getError());
  }

  const purchases = purchasesResult.get();
  const payments = paymentsResult.get();
  const clients = clientsResult.get();

  const allUserStats: Record<string, UserStats> = Object.fromEntries(
    clients
      .map(client => [
        client.id,
        generateUserStats(
          purchases.filter(purchase => purchase.client.id === client.id),
          payments.filter(payment => payment.client.id === client.id),
          client
        ),
      ])
      .filter(([, stats]) => stats !== null)
  );

  const globalStats = generateGlobalStats(allUserStats);

  const enrichedUserStats = generateEnrichedUserStats(allUserStats, globalStats, clients);

  return Result.Ok({allUserStats: enrichedUserStats, globalStats});
};

const generateUserStats = (purchases: Purchase[], payments: Payment[], client: Client): UserStats | null => {
  if (purchases.length === 0) {
    return null;
  }

  const firstDate = new Date(purchases[0].time).toLocaleDateString('fr-FR');

  const purchasesGroupedByDay = purchases.reduce((grouped, purchase) => {
    const day = new Date(purchase.time - TWELVE_HOURS).toLocaleDateString('fr-FR');
    if (!grouped[day]) {
      grouped[day] = [];
    }
    grouped[day].push(purchase);

    return grouped;
  }, {} as {[key: string]: Purchase[]});

  const daysOfPresence: {[day: string]: boolean} = {};
  const timeSpentPerDay = Object.keys(purchasesGroupedByDay).map(day => {
    const purchasesOfTheDay = purchasesGroupedByDay[day];
    const timeSpent =
      getLastPurchase(purchasesOfTheDay).time - getFirstPurchase(purchasesOfTheDay).time + THIRTY_MINUTES;
    daysOfPresence[day] = true;
    return {timeSpent, date: day};
  });
  const totalTimeSpent = timeSpentPerDay.reduce((total, day) => total + day.timeSpent, 0);

  const longestNight = timeSpentPerDay.reduce<{timeSpent: number; date: string}>(
    (biggest, day) => {
      const timeSpent = day.timeSpent;
      if (timeSpent > biggest.timeSpent) {
        return day;
      }

      return biggest;
    },
    {timeSpent: 0, date: timeSpentPerDay[0].date}
  );

  const latestNight = Object.keys(purchasesGroupedByDay).reduce<{
    leftAt: number;
    timeElapsedSinceNoon: number;
    date: string;
  }>(
    (biggest, currentDay) => {
      const [day, month, year] = currentDay.split('/').map(data => parseInt(data));
      const timeElapsedSinceNoon =
        getLastPurchase(purchasesGroupedByDay[currentDay]).time -
        new Date(year, month - 1, day, 12, 0).getTime() +
        THIRTY_MINUTES;

      if (timeElapsedSinceNoon > biggest.timeElapsedSinceNoon) {
        return {
          leftAt: getLastPurchase(purchasesGroupedByDay[currentDay]).time + THIRTY_MINUTES,
          timeElapsedSinceNoon,
          date: currentDay,
        };
      }

      return biggest;
    },
    {leftAt: 0, timeElapsedSinceNoon: 0, date: firstDate}
  );

  const mostExpensiveNight = Object.keys(purchasesGroupedByDay).reduce<{
    expenses: number;
    quantity: number;
    date: string;
  }>(
    (biggest, day) => {
      const expenses = purchasesGroupedByDay[day].reduce((total, purchase) => total + purchase.item.price, 0);
      const quantity = purchasesGroupedByDay[day].reduce((total, purchase) => total + purchase.item.volume, 0);
      if (expenses > biggest.expenses) {
        return {expenses, quantity: Math.floor((quantity / 330) * 250), date: day};
      }

      return biggest;
    },
    {expenses: 0, quantity: 0, date: firstDate}
  );

  const visits = timeSpentPerDay.reduce<UserStats['visits']>(
    (visits, {date}) => {
      const [day, month, year] = date.split('/').map(data => parseInt(data));
      const currentDay = new Date(year, month - 1, day).getDay();
      visits.days[currentDay]++;
      visits.totalVisits++;

      return {
        ...visits,
        favouriteDay:
          visits.days[currentDay] > visits.favouriteDay.numberOfVisits
            ? {
                day: currentDay,
                numberOfVisits: visits.days[currentDay],
              }
            : visits.favouriteDay,
        dates: {
          ...visits.dates,
          [date]: true,
        },
      };
    },
    {
      days: {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
      } as {[day: number]: number},
      favouriteDay: {
        day: 0,
        numberOfVisits: 0,
      },
      totalVisits: 0,
      dates: {},
    }
  );

  const totalVolume = Math.floor((purchases.reduce((total, purchase) => total + purchase.item.volume, 0) / 330) * 250);
  const totalPaid = payments.reduce((total, payment) => total + payment.amount, 0);
  const rounds = getNumberOfRounds(purchases);

  const personnalConsumption = {
    numberOfDrinks: rounds.drinksForSelf,
    drinksPerHour: Math.ceil((totalTimeSpent / 1000 / 60 / 60 / rounds.drinksForSelf) * 10) / 10,
    numberOfRequiredAnts: Math.round(NUMBER_OF_ANTS_PER_CL * (rounds.drinksForSelf * 250)),
  };

  return {
    client,
    totalPaid,
    totalVolume,
    longestNight,
    mostExpensiveNight,
    latestNight,
    totalTimeSpent,
    rounds,
    visits,
    personnalConsumption,
  };
};

type StatPerUser = {
  userId: string;
  name: string;
  picture: string;
  drinks: number;
  giftedRounds: number;
  numberOfDays: number;
  totalTime: number;
};

const sortAndRank = (
  statsPerUser: StatPerUser[],
  statName: 'drinks' | 'giftedRounds' | 'numberOfDays' | 'totalTime'
): LeaderBoard => {
  return Object.fromEntries(
    statsPerUser
      .sort(({[statName]: a}, {[statName]: b}) => b - a)
      .map(({userId, name, picture, [statName]: amount}, rank) => [userId, {amount, name, picture, rank}])
  );
};

const generateGlobalStats = (allUserStats: Record<string, UserStats>): GlobalStats => {
  const statsPerUser = Object.entries(allUserStats).map(([userId, userStats]) => ({
    userId,
    name: `${userStats.client.profile.first_name} ${userStats.client.profile.last_name}`,
    picture: userStats.client.profile.image_192,
    drinks: userStats.personnalConsumption.numberOfDrinks,
    giftedRounds: userStats.rounds.offeredRounds,
    numberOfDays: userStats.visits.totalVisits,
    totalTime: userStats.totalTimeSpent,
    presenceDays: userStats.visits.dates,
  }));

  const [drinks, giftedRounds, numberOfDays, totalTime] = [
    'drinks' as const,
    'giftedRounds' as const,
    'numberOfDays' as const,
    'totalTime' as const,
  ].map(stat => sortAndRank(statsPerUser, stat));

  const attendanceRecords = statsPerUser.reduce<GlobalStats['attendanceRecords']>((records, {userId, presenceDays}) => {
    for (const date of Object.keys(presenceDays)) {
      if (!records[date]) {
        records[date] = {
          [userId]: true,
        };
      } else {
        records[date][userId] = true;
      }
    }
    return records;
  }, {});

  return {
    leaderboards: {
      drinks,
      giftedRounds,
      attendance: {
        numberOfDays,
        totalTime,
      },
    },
    attendanceRecords,
  };
};

const getRelations = (
  userStats: UserStats,
  globalStats: GlobalStats,
  clients: Client[]
): EnrichedUserStats['relations'] => {
  let uniquePeople = 0;
  const encounters = Object.keys(userStats.visits.dates).reduce<EnrichedUserStats['relations']['bestFriends']>(
    (encounters, date) => {
      const userIds = Object.keys(globalStats.attendanceRecords[date]);
      for (const userId of userIds) {
        if (userId === userStats.client.id) {
          continue;
        }
        if (encounters[userId] === undefined) {
          const client = clients.find(({id}) => userId === id);
          if (client === undefined) {
            continue;
          }
          encounters[userId] = {
            occurrences: 1,
            name: `${client.profile.first_name} ${client.profile.last_name}`,
            picture: client.profile.image_192,
          };
          uniquePeople++;
        } else {
          encounters[userId].occurrences++;
        }
      }
      return encounters;
    },
    {}
  );

  return {
    bestFriends: encounters,
    uniquePeople,
  };
};

const generateEnrichedUserStats = (
  allUserStats: Record<string, UserStats>,
  globalStats: GlobalStats,
  clients: Client[]
): Record<string, EnrichedUserStats> => {
  return Object.entries(allUserStats).reduce(
    (allEnrichedUserStats, [userId, userStats]) => ({
      ...allEnrichedUserStats,
      [userId]: {
        ...userStats,
        relations: getRelations(userStats, globalStats, clients),
      },
    }),
    {}
  );
};

export {generateAllStats};

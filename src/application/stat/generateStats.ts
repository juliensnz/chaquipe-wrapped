import {Purchase} from '@/domain/model/Purchase';
import {Either, Result} from '@/domain/model/Result';
import {RuntimeError} from '@/domain/model/RuntimeError';
import {UserStats} from '@/domain/model/UserStats';
import {paymentRepository} from '@/infrastructure/firestore/PaymentRepository';
import {purchaseRepository} from '@/infrastructure/firestore/PurchaseRepository';

const TWELVE_HOURS = 12 * 60 * 60 * 1000;
const THIRTY_MINUTES = 30 * 60 * 1000;

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

const getNumberOfRounds = (purchases: Purchase[]): {rounds: number; drinks: number; biggestRound: number} => {
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
  return {rounds: offeredRounds.length, drinks: offeredDrinks, biggestRound};
};

const generateStats = async (clientId: string): Promise<Either<UserStats, RuntimeError>> => {
  const paymentsResult = await paymentRepository.findAllByClient(clientId as string);
  const purchasesResult = await purchaseRepository.findAllByClient(clientId as string);

  if (paymentsResult.isError()) {
    return Result.Error(paymentsResult.getError());
  }
  if (purchasesResult.isError()) {
    return Result.Error(purchasesResult.getError());
  }

  const purchases = purchasesResult.get();
  const payments = paymentsResult.get();

  if (purchases.length === 0) {
    return Result.Error({
      type: 'stats.no_purchase',
      message: 'No purchase found',
      payload: {clientId},
    });
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

  const timeSpentPerDay = Object.keys(purchasesGroupedByDay).map(day => {
    const purchasesOfTheDay = purchasesGroupedByDay[day];
    const timeSpent =
      getLastPurchase(purchasesOfTheDay).time - getFirstPurchase(purchasesOfTheDay).time + THIRTY_MINUTES;

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

  const totalVolume = Math.floor((purchases.reduce((total, purchase) => total + purchase.item.volume, 0) / 330) * 250);
  const totalPaid = payments.reduce((total, payment) => total + payment.amount, 0);
  const totalRounds = getNumberOfRounds(purchases);

  return Result.Ok({
    totalPaid,
    totalVolume,
    longestNight,
    mostExpensiveNight,
    latestNight,
    totalTimeSpent,
    totalRounds,
  });
};

export {generateStats};

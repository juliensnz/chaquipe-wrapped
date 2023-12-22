import {Client} from './Client';

type UserStats = {
  client: Client;
  totalPaid: number;
  totalVolume: number;
  longestNight: {timeSpent: number; date: string};
  mostExpensiveNight: {expenses: number; quantity: number; date: string};
  latestNight: {leftAt: number; timeElapsedSinceNoon: number; date: string};
  totalTimeSpent: number;
  rounds: {drinksForSelf: number; offeredRounds: number; drinks: number; biggestRound: number};
  visits: {days: {[day: string]: number}; favouriteDay: {day: number; numberOfVisits: number}; totalVisits: number};
  personnalConsumption: {
    numberOfDrinks: number;
    drinksPerHour: number;
    numberOfRequiredAnts: number;
  };
};

export type {UserStats};

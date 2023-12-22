type UserStats = {
  totalPaid: number;
  totalVolume: number;
  longestNight: {timeSpent: number; date: string};
  mostExpensiveNight: {expenses: number; quantity: number; date: string};
  latestNight: {leftAt: number; timeElapsedSinceNoon: number; date: string};
  totalTimeSpent: number;
  totalRounds: {rounds: number; drinks: number; biggestRound: number};
  visitsPerDay: {days: {[day: string]: number}; favouriteDay: {day: number; numberOfVisits: number}};
};

export type {UserStats};

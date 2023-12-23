type LeaderBoard = {[userId: string]: {name: string; picture: string; amount: number; rank: number}};

type GlobalStats = {
  leaderboards: {
    drinks: LeaderBoard;
    giftedRounds: LeaderBoard;
    attendance: {
      numberOfDays: LeaderBoard;
      totalTime: LeaderBoard;
    };
  };
  // attendanceRecords: {[day: string]: {[userId: string]: boolean}};
};

export type {LeaderBoard, GlobalStats};

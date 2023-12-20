type Payment = {
  canceled: boolean;
  amount: number;
  client: {
    avatar: string;
    id: string;
    identifier: string;
    name: string;
    payments: number;
    purchases: number;
  };
  id: string;
  time: number;
};

export type {Payment};

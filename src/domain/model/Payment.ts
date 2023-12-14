type Payment = {
  canceled: boolean;
  client: {
    avatar: string;
    id: string;
    identifier: string;
    name: string;
    payments: number;
    purchases: number;
  };
  id: string;
  item: {
    enabled: boolean;
    name: string;
    order: number;
    picture: string;
    price: number;
    volume: number;
  };
  time: number;
};

export type {Payment};

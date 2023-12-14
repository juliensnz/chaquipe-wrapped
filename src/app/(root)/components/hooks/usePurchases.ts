import {Purchase} from '@/domain/model/Purchase';
import {purchaseRepository} from '@/infrastructure/firestore/PurchaseRepository';
import {useFirestoreQuery} from '@/lib/useFirestoreQuery/useFirestoreQuery';

const usePurchases = (client: string): Purchase[] => {
  const ref = purchaseRepository.findAllByClient(client);

  if (ref.isError()) throw ref.getError();

  const {data: purchases} = useFirestoreQuery(['purchases', client], ref.get(), {subscribe: true});

  if (undefined === purchases) {
    return [];
  }

  return purchases.docs.map(purchase => purchase.data()) as Purchase[];
};

export {usePurchases};

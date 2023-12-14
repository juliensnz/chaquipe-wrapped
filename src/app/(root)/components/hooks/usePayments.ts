import {Payment} from '@/domain/model/Payment';
import {paymentRepository} from '@/infrastructure/firestore/PaymentRepository';
import {useFirestoreQuery} from '@/lib/useFirestoreQuery/useFirestoreQuery';

const usePayments = (client: string): Payment[] => {
  const ref = paymentRepository.findAllByClient(client);

  if (ref.isError()) throw ref.getError();

  const {data: payments} = useFirestoreQuery(['payments', client], ref.get(), {subscribe: true});

  if (undefined === payments) {
    return [];
  }

  return payments.docs.map(payment => payment.data()) as Payment[];
};

export {usePayments};

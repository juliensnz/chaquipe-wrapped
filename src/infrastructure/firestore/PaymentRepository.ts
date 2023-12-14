import {Result} from '@/domain/model/Result';
import {firebaseApp} from '@/lib/firebase';
import {getFirestore, Firestore, query, collection, where} from 'firebase/firestore';

const db = getFirestore(firebaseApp);

const paymentRepositoryCreator = ({db}: {db: Firestore}) => ({
  findAllByClient: (client: string) => {
    try {
      const q = query(collection(db, 'payments'), where('client.id', '==', client));

      return Result.Ok(q);
    } catch (error) {
      return Result.Error({
        type: 'payment_repository.get_query',
        message: 'Error query payments',
        payload: {error},
      });
    }
  },
});

const paymentRepository = paymentRepositoryCreator({db});

export {paymentRepository};

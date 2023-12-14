import {Payment} from '@/domain/model/Payment';
import {Either, Result} from '@/domain/model/Result';
import {RuntimeError} from '@/domain/model/RuntimeError';
import {firebaseApp} from '@/lib/firebase';
import {getFirestore, Firestore, query, collection, where, getDocs} from 'firebase/firestore';

const db = getFirestore(firebaseApp);

const paymentRepositoryCreator = ({db}: {db: Firestore}) => ({
  findAllByClient: async (client: string): Promise<Either<Payment[], RuntimeError>> => {
    try {
      const q = query(collection(db, 'payments'), where('client.id', '==', client));
      const snapshot = await getDocs(q);

      return Result.Ok(snapshot.docs.map(doc => doc.data() as Payment));
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

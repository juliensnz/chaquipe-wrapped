import {Purchase} from '@/domain/model/Purchase';
import {Either, Result} from '@/domain/model/Result';
import {RuntimeError} from '@/domain/model/RuntimeError';
import {firebaseApp} from '@/lib/firebase';
import {getFirestore, Firestore, query, collection, where, getDocs} from 'firebase/firestore';

const db = getFirestore(firebaseApp);

const purchaseRepositoryCreator = ({db}: {db: Firestore}) => ({
  findAllByClient: async (client: string): Promise<Either<Purchase[], RuntimeError>> => {
    try {
      const q = query(collection(db, 'purchases'), where('client.id', '==', client));
      const snapshot = await getDocs(q);

      return Result.Ok(snapshot.docs.map(doc => doc.data() as Purchase));
    } catch (error) {
      return Result.Error({
        type: 'purchase_repository.get_query',
        message: 'Error query purchases',
        payload: {error},
      });
    }
  },
});

const purchaseRepository = purchaseRepositoryCreator({db});

export {purchaseRepository};

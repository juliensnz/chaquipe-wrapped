import {Result} from '@/domain/model/Result';
import {firebaseApp} from '@/lib/firebase';
import {getFirestore, Firestore, query, collection, where} from 'firebase/firestore';

const db = getFirestore(firebaseApp);

const purchaseRepositoryCreator = ({db}: {db: Firestore}) => ({
  findAllByClient: (client: string) => {
    try {
      const q = query(collection(db, 'purchases'), where('client.id', '==', client));

      return Result.Ok(q);
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

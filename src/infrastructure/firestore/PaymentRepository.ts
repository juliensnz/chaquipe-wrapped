import {Payment} from '@/domain/model/Payment';
import {Either, Result} from '@/domain/model/Result';
import {RuntimeError} from '@/domain/model/RuntimeError';
import {firebaseApp} from '@/lib/firebase';
import {getFirestore, Firestore} from 'firebase/firestore';
import {promises as fs} from 'fs';

const db = getFirestore(firebaseApp);
const file = await fs.readFile(process.cwd() + '/src/infrastructure/firestore/data.json', 'utf8');

const paymentRepositoryCreator = ({db}: {db: Firestore}) => ({
  findAllByClient: async (client: string): Promise<Either<Payment[], RuntimeError>> => {
    return Result.Ok(
      (Object.values(JSON.parse(file).payments) as Payment[])
        .filter((payment: Payment) => payment.client.id === client && payment.time > 1672527600000)
        .sort((a, b) => a.time - b.time)
    );
  },
  findAll: async (): Promise<Either<Payment[], RuntimeError>> => {
    return Result.Ok(
      (Object.values(JSON.parse(file).payments) as Payment[])
        .filter((payment: Payment) => payment.time > 1672527600000)
        .sort((a, b) => a.time - b.time)
    );
  },
});

const paymentRepository = paymentRepositoryCreator({db});

export {paymentRepository};

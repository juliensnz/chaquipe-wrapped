import {Client} from '@/domain/model/Client';
import {Either, Result} from '@/domain/model/Result';
import {RuntimeError} from '@/domain/model/RuntimeError';
import {promises as fs} from 'fs';

const clientRepositoryCreator = () => ({
  findAll: async (): Promise<Either<Client[], RuntimeError>> => {
    const file = await fs.readFile(process.cwd() + '/src/infrastructure/firestore/data.json', 'utf8');
    return Result.Ok(Object.values(JSON.parse(file).users) as Client[]);
  },
});

const clientRepository = clientRepositoryCreator();

export {clientRepository};

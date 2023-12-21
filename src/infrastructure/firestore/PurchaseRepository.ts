import {Purchase} from '@/domain/model/Purchase';
import {Either, Result} from '@/domain/model/Result';
import {RuntimeError} from '@/domain/model/RuntimeError';
import {firebaseApp} from '@/lib/firebase';
import {getFirestore, Firestore} from 'firebase/firestore';
import {promises as fs} from 'fs';

const db = getFirestore(firebaseApp);
const file = await fs.readFile(process.cwd() + '/src/infrastructure/firestore/data.json', 'utf8');

const purchaseRepositoryCreator = ({db}: {db: Firestore}) => ({
  findAll: async (): Promise<Either<Purchase[], RuntimeError>> => {
    return Result.Ok(
      (Object.values(JSON.parse(file).purchases) as Purchase[])
        .filter((purchase: Purchase) => purchase.time > 1672527600000)
        .sort((a, b) => a.time - b.time)
    );
  },
  findAllByClient: async (client: string): Promise<Either<Purchase[], RuntimeError>> => {
    // return Result.Ok([
    //   {
    //     client: {
    //       purchases: 9200,
    //       identifier: 'benjamin.letellier',
    //       name: 'Benjamin LETELLIER',
    //       payments: 8950,
    //       avatar: 'https://avatars.slack-edge.com/2022-09-19/4096503905061_fa91dd1f273525a2bb65_192.jpg',
    //       id: 'TEST_CLIENT_1',
    //     },
    //     item: {
    //       enabled: true,
    //       order: 3,
    //       picture: 'bottle_beer_gold.png',
    //       name: 'Bottle 2.5€',
    //       price: 250,
    //       volume: 330,
    //     },
    //     canceled: false,
    //     id: '10081518-56b6-1acb-b035-185dffb1b5bf',
    //     time: 1649100000_000, // 21h20
    //   },
    //   {
    //     client: {
    //       purchases: 9200,
    //       identifier: 'benjamin.letellier',
    //       name: 'Benjamin LETELLIER',
    //       payments: 8950,
    //       avatar: 'https://avatars.slack-edge.com/2022-09-19/4096503905061_fa91dd1f273525a2bb65_192.jpg',
    //       id: 'TEST_CLIENT_1',
    //     },
    //     item: {
    //       enabled: true,
    //       order: 3,
    //       picture: 'bottle_beer_gold.png',
    //       name: 'Bottle 2.5€',
    //       price: 250,
    //       volume: 330,
    //     },
    //     canceled: false,
    //     id: '10081518-56b6-1acb-b035-185dffb1b5bf',
    //     time: 1649103600_000,
    //   },
    //   {
    //     client: {
    //       purchases: 9200,
    //       identifier: 'benjamin.letellier',
    //       name: 'Benjamin LETELLIER',
    //       payments: 8950,
    //       avatar: 'https://avatars.slack-edge.com/2022-09-19/4096503905061_fa91dd1f273525a2bb65_192.jpg',
    //       id: 'TEST_CLIENT_1',
    //     },
    //     item: {
    //       enabled: true,
    //       order: 3,
    //       picture: 'bottle_beer_gold.png',
    //       name: 'Bottle 2.5€',
    //       price: 250,
    //       volume: 330,
    //     },
    //     canceled: false,
    //     id: '10081518-56b6-1acb-b035-185dffb1b5bf',
    //     time: 1649110800_000,
    //   },
    //   {
    //     client: {
    //       purchases: 9200,
    //       identifier: 'benjamin.letellier',
    //       name: 'Benjamin LETELLIER',
    //       payments: 8950,
    //       avatar: 'https://avatars.slack-edge.com/2022-09-19/4096503905061_fa91dd1f273525a2bb65_192.jpg',
    //       id: 'TEST_CLIENT_1',
    //     },
    //     item: {
    //       enabled: true,
    //       order: 3,
    //       picture: 'bottle_beer_gold.png',
    //       name: 'Bottle 2.5€',
    //       price: 250,
    //       volume: 250,
    //     },
    //     canceled: false,
    //     id: '00081518-56b6-1acb-b035-185dffb1b5bf',
    //     time: 1689090000_000, //17h40
    //   },
    //   {
    //     client: {
    //       purchases: 9200,
    //       identifier: 'benjamin.letellier',
    //       name: 'Benjamin LETELLIER',
    //       payments: 8950,
    //       avatar: 'https://avatars.slack-edge.com/2022-09-19/4096503905061_fa91dd1f273525a2bb65_192.jpg',
    //       id: 'TEST_CLIENT_1',
    //     },
    //     item: {
    //       enabled: true,
    //       order: 3,
    //       picture: 'bottle_beer_gold.png',
    //       name: 'Bottle 2.5€',
    //       price: 250,
    //       volume: 330,
    //     },
    //     canceled: false,
    //     id: '10081518-56b6-1acb-b035-185dffb1b5bf',
    //     // time: 1689093600_000, //18h40
    //     time: 1689090000_000, //17h40
    //   },
    //   {
    //     client: {
    //       purchases: 9200,
    //       identifier: 'benjamin.letellier',
    //       name: 'Benjamin LETELLIER',
    //       payments: 8950,
    //       avatar: 'https://avatars.slack-edge.com/2022-09-19/4096503905061_fa91dd1f273525a2bb65_192.jpg',
    //       id: 'TEST_CLIENT_1',
    //     },
    //     item: {
    //       enabled: true,
    //       order: 3,
    //       picture: 'bottle_beer_gold.png',
    //       name: 'Bottle 2.5€',
    //       price: 250,
    //       volume: 330,
    //     },
    //     canceled: false,
    //     id: '10081518-56b6-1acb-b035-185dffb1b5bf',
    //     // time: 1689093600_000, //18h40
    //     time: 1689090000_000, //17h40
    //   },
    // ]);

    return Result.Ok(
      (Object.values(JSON.parse(file).purchases) as Purchase[])
        .filter((purchase: Purchase) => purchase.client.id === client && purchase.time > 1672527600000)
        .sort((a, b) => a.time - b.time)
    );
  },
});

const purchaseRepository = purchaseRepositoryCreator({db});

export {purchaseRepository};

import {Story} from '@/components/common/Story';
import {generateAllStats} from '@/application/stat/generateStats';
import {UserStats} from '@/domain/model/UserStats';
import {clientRepository} from '@/infrastructure/firestore/ClientRepository';
import {GetStaticPaths, GetStaticPropsContext} from 'next';

type PageProps = {stats: UserStats | undefined};

const Page = ({stats}: PageProps) => {
  if (!stats) {
    return <div>No stats found</div>;
  }

  return <Story stats={stats} />;
};

export default Page;

let allStats: Record<string, UserStats> | undefined = undefined;

export async function getStaticProps(context: GetStaticPropsContext) {
  if (allStats === undefined) {
    const allStatsResult = await generateAllStats();

    if (allStatsResult.isError()) {
      return {
        props: {}
      }
    }

    allStats = allStatsResult.get();
  }

  const userStats = allStats[context.params?.userId as string ?? ''];

  if (userStats === undefined) {
    return {
      props: {}
    }
  }

  return {
    props: {stats: userStats}
  }
}


export const getStaticPaths = (async () => {
  const usersResult = await clientRepository.findAll();

  if (usersResult.isError()) {
    throw usersResult.getError()
  }

  const users = usersResult.get()//.slice(0, 10);

  return {
    paths: users.map(user => ({
      params: {
        userId: user.id
      }
    })),
    fallback: true
  }
}) satisfies GetStaticPaths

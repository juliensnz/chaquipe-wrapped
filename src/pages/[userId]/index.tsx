import {Story} from '@/components/common/Story';
import {generateAllStats} from '@/application/stat/generateStats';
import {EnrichedUserStats} from '@/domain/model/UserStats';
import {clientRepository} from '@/infrastructure/firestore/ClientRepository';
import {GetStaticPaths, GetStaticPropsContext} from 'next';
import {GlobalStats} from '@/domain/model/GlobalStats';

type PageProps = {stats: EnrichedUserStats | undefined, global: GlobalStats | undefined};

const Page = ({stats, global}: PageProps) => {
  if (!stats || !global) {
    return <div>No stats found</div>;
  }

  return <Story stats={stats} global={global} />;
};

export default Page;

let allStats: {allUserStats: Record<string, EnrichedUserStats>; globalStats: GlobalStats} | undefined = undefined;

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

  const userStats = allStats.allUserStats[context.params?.userId as string ?? ''];

  if (userStats === undefined) {
    return {
      props: {}
    }
  }

  const globalStats = allStats.globalStats;

  return {
    props: {stats: userStats, global: globalStats}
  }
}


export const getStaticPaths = (async () => {
  const usersResult = await clientRepository.findAll();

  if (usersResult.isError()) {
    throw usersResult.getError()
  }

  const users = usersResult.get()

  return {
    paths: users.map(user => ({
      params: {
        userId: user.id
      }
    })),
    fallback: true
  }
}) satisfies GetStaticPaths

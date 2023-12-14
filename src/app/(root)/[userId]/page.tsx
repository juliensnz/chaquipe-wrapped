'use client';

import {Story} from '@/app/(root)/components/common/Story';

type PageProps = {params: {userId: string}};

const Page = ({params: {userId}}: PageProps) => {
  return <Story userId={userId} />;
};

export default Page;

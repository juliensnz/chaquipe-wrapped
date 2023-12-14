'use client';

import {usePayments} from '@/app/(root)/components/hooks/usePayments';

export default function Story({params: {user}}: {params: {user: string}}) {
  const payments = usePayments(user);
  return (
    <div>
      {payments.map(payment => (
        <div key={payment.id}>{payment.id}</div>
      ))}
    </div>
  );
}

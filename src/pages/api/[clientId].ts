import {paymentRepository} from '@/infrastructure/firestore/PaymentRepository';
import {NextApiRequest, NextApiResponse} from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const payments = await paymentRepository.findAllByClient(req.query.clientId as string);

  if (payments.isError()) {
    return res.status(500).json(payments.getError());
  }

  return res.status(200).json(payments.get());
};

export default handler;

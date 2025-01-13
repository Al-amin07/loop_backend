import { stripe } from '../../app';
import { IPayment } from './payment.interface';
import { Payment } from './payment.model';

const getClientSecret = async (payload: Partial<IPayment>) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round((payload?.amount as number) * 100), // Stripe expects amounts in cents
    currency: 'usd',
    metadata: {
      title: payload?.title as string,
      // user_id: payload?.user_id,
    },
  });

  // Save payment request to database

  // return result;
  console.log('cl ', paymentIntent.client_secret);
  return paymentIntent.client_secret;
};

const createpayment = async (payload: IPayment) => {
  const result = await Payment.create(payload);
  return result;
};

const getAllPayment = async () => {
  const result = await Payment.find({}).populate('user_id');
  return result;
};
const getUserAllPayment = async (id: string) => {
  const result = await Payment.find({ user_id: id }).populate('user_id');
  return result;
};

const updatePayment = async (id: string, payload: Partial<IPayment>) => {
  const result = await Payment.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const paymentServices = {
  createpayment,
  getAllPayment,
  updatePayment,
  getUserAllPayment,
  getClientSecret,
};

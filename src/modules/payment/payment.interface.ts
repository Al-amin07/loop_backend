import { Types } from 'mongoose';

export interface IPayment {
  title: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  user_id: Types.ObjectId;
}

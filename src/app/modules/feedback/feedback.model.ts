import { model, Schema } from 'mongoose';
import { IFeedback } from './feedback.interface';

const feedbackSchema = new Schema<IFeedback>(
  {
    description: {
      type: String,
      required: true,
    },
    workCompany: {
      type: String,
      required: true,
    },
    logoImage: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Feedback = model<IFeedback>('feedback', feedbackSchema);

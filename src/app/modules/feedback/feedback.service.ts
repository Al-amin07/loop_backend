import { IFeedback } from './feedback.interface';
import { Feedback } from './feedback.model';

const createfeedbackIntoDB = async (payload: IFeedback) => {
  const result = await Feedback.create(payload);
  return result;
};
const getFeedbackFromDB = async () => {
  const result = await Feedback.find({}).sort({ createdAt: -1 });
  return result;
};

export const feedbackServices = {
  createfeedbackIntoDB,
  getFeedbackFromDB,
};

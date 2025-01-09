import { IWork } from './work.interface';
import { WorkModel } from './work.model';

const createWorkIntoDB = async (payload: IWork) => {
  const result = await WorkModel.create(payload);
  return result;
};
const getAllWorkFromDB = async () => {
  const result = await WorkModel.find({}).sort({ createdAt: -1 });
  return result;
};

export const workServices = {
  createWorkIntoDB,
  getAllWorkFromDB,
};

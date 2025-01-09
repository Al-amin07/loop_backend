import { IText } from './text.interface';
import { Text } from './text.model';

const createTextIntoDB = async (payload: IText) => {
  const result = await Text.create(payload);
  return result;
};
const getAllTextFromDB = async () => {
  const result = await Text.find({});
  return result;
};

const updateTextFromDB = async (id: string, payload: IText) => {
  const result = await Text.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const textServices = {
  createTextIntoDB,
  updateTextFromDB,
  getAllTextFromDB,
};

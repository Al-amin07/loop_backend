import { IFile } from './file.interface';
import { File } from './file.model';

const uploadFile = async (payload: IFile) => {
  const result = await File.create(payload);
  return result;
};

const getAllFile = async () => {
  const result = await File.find({}).populate('user_id');
  return result;
};
const getUserAllFile = async (id: string) => {
  const result = await File.find({ user_id: id }).populate('user_id');
  return result;
};
const updateFile = async (id: string, payload: Partial<IFile>) => {
  const result = await File.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate('user_id');
  return result;
};

export const fileServices = {
  uploadFile,
  getAllFile,
  getUserAllFile,
  updateFile,
};

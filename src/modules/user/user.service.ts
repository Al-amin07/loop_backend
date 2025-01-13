import { User } from './user.model';

const getAllUser = async () => {
  const result = await User.find({}).select('-password').lean();
  return result;
};

export const userServices = {
  getAllUser,
};

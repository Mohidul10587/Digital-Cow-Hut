import { IUser } from './user.interface';
import { User } from './user.model';

const getAllUsers = async () => {
  const result = await User.find({});
  return result;
};

const createUser = async (payloads: IUser) => {
  const result = User.create(payloads);
  return result;
};

export const UserService = { createUser, getAllUsers };

import { ICow } from './cow.interface';
import { Cow } from './cow.model';

const createCow = async (payloads: ICow) => {
  const result = Cow.create(payloads);
  return result;
};

export const UserService = { createCow };

import { ICow } from './cow.interface';
import { Cow } from './cow.model';

const createCow = async (payloads: ICow) => {
  const result = await Cow.create(payloads);
  await result.populate('seller');
  return result;
};

const getAllCows = async () => {
  const cows = await Cow.find().populate('seller');
  return cows;
};

const getSingleCow = async (id: string) => {
  const cow = await Cow.findOne({ _id: Object(id) });
  const result = await cow?.populate('seller');
  console.log(result);
  return result;
};
const deleteUser = async () => {
  const cows = await Cow.find().populate('seller');
  return cows;
};

export const CowService = { createCow, getAllCows, deleteUser, getSingleCow };

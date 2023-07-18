import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { cowSearchableFields } from './cow.constant';
import { ICow, ICowFilters } from './cow.interface';
import { Cow } from './cow.model';

const createCow = async (payloads: ICow) => {
  const result = await Cow.create(payloads);
  await result.populate('seller');
  return result;
};

const getAllCows = async (
  filters: ICowFilters,
  paginationOptions: IPaginationOptions
) => {
  const {
    searchTerm,
    maxPrice,
    minPrice,
    maxWeight,
    minWeight,
    ...filtersData
  } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: cowSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // find by price, weight
  if (maxPrice) {
    andConditions.push({
      price: {
        $lte: maxPrice,
      },
    });
  }

  if (minPrice) {
    andConditions.push({
      price: {
        $gte: minPrice,
      },
    });
  }

  if (maxWeight) {
    andConditions.push({
      weight: {
        $lte: maxWeight,
      },
    });
  }

  if (minWeight) {
    andConditions.push({
      weight: {
        $gte: minWeight,
      },
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Cow.find(whereConditions)

    .populate('seller')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Cow.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleCow = async (id: string) => {
  const cow = await Cow.findOne({ _id: Object(id) });
  const result = await cow?.populate('seller');
  console.log(result);
  return result;
};
const deleteCow = async (id: string) => {
  const isExist = await Cow.findOne({ _id: Object(id) });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow not found !');
  }

  const result = await Cow.deleteOne({ _id: Object(id) }).populate('seller');
  return result;
};

const updateCow = async (id: string, payload: Partial<ICow>) => {
  const isExist = await Cow.findOne({ _id: Object(id) });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow not found !');
  }

  const { ...userData } = payload;

  const updatedUserData: Partial<ICow> = { ...userData };

  const result = await Cow.findOneAndUpdate(
    { _id: Object(id) },
    updatedUserData,
    {
      new: true,
    }
  );
  return result;
};

export const CowService = {
  createCow,
  getAllCows,
  deleteCow,
  getSingleCow,
  updateCow,
};

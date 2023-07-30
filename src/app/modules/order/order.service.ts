import httpStatus from 'http-status';
import { startSession } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { Cow } from '../cow/cow.model';
import { User } from '../user/user.model';
import { IOrder } from './order.interface';
import Order from './order.model';

const createOrder = async (payload: IOrder) => {
  const { cow, buyer } = payload;

  // Check the buyer
  const buyerInfo = await User.findOne({ _id: buyer });
  if (!buyerInfo || buyerInfo.role !== 'buyer') {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Buyer not found. Please select a valid buyer id'
    );
  }

  // Check the cow
  const cowInfo = await Cow.findOne({ _id: cow });
  if (!cowInfo || cowInfo.label === 'Sold out') {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Cow not found. Please provide another cow'
    );
  }

  // less than cow price then throw error
  if (buyerInfo.budget < cowInfo.price) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Insufficient budget. Please top up your account to proceed with this order'
    );
  }

  const sellerId = cowInfo.seller;
  let createdOrderId;

  const session = await startSession();

  try {
    session.startTransaction();

    // update cow label
    const cowUpdated = await Cow.updateOne(
      { _id: cow },
      { label: 'Sold out' },
      { session }
    );

    if (!cowUpdated.acknowledged) {
      throw new Error('Something went wrong. Please try again 1');
    }

    // update buyer budget
    const buyerUpdated = await User.updateOne(
      { _id: buyer },
      { $inc: { budget: -cowInfo.price } },
      { session }
    );

    if (!buyerUpdated.acknowledged) {
      throw new Error('Something went wrong. Please try again 2');
    }

    // update seller income to seller income + cow price
    const sellerUpdated = await User.updateOne(
      { _id: sellerId },
      { $inc: { income: cowInfo.price } },
      { session }
    );

    if (!sellerUpdated.acknowledged) {
      throw new Error('Something went wrong. Please try again 3');
    }

    // create order
    const createResult = await Order.create([payload], { session });

    if (!createResult || createResult.length === 0) {
      throw new Error('Something went wrong. Please try again 4');
    }

    createdOrderId = createResult[0]._id;

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    console.log(error);
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Something went wrong. Please try again 5'
    );
  } finally {
    session.endSession();
  }

  // finally order created successfully
  const createdOrder = await Order.findOne({ _id: createdOrderId })
    .populate({
      path: 'cow',
      populate: [
        {
          path: 'seller',
        },
      ],
    })
    .populate('buyer');

  return createdOrder;
};

export const orderService = {
  createOrder,
};

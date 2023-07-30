import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { orderService } from './order.service';

// create
const createOrder = catchAsync(async (req, res) => {
  const requestedData = req.body;

  const order = await orderService.createOrder(requestedData);

  sendResponse(res, {
    data: order,
    message: 'Order created successfully',
    statusCode: httpStatus.OK,
    success: true,
  });
});

export const orderController = {
  createOrder,
};

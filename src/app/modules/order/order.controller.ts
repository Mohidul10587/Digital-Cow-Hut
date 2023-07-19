import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

// create
const createOrder = catchAsync(async (req, res) => {
  const bodyData = req.body;

  const order = await orderService.createOrder(bodyData);

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

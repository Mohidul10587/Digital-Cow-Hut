import { Router } from 'express';

import { orderController } from './order.controller';

const OrderRouter = Router();

// create a order
OrderRouter.post(
  '/',
  // validateRequest(orderZodSchema),
  orderController.createOrder
);

export default OrderRouter;

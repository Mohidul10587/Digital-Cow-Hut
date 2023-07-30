import { Router } from 'express';
import { orderController } from './order.controller';

const OrderRoutes = Router();

// create a order
OrderRoutes.post(
  '/',
  // validateRequest(orderZodSchema),
  orderController.createOrder
);

export default OrderRoutes;

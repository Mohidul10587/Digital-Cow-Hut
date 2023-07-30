import { Schema, model } from 'mongoose';
import { IOrder, IOrderModel } from './order.interface';

const OrderSchema = new Schema<IOrder, IOrderModel>(
  {
    cow: {
      type: Schema.Types.ObjectId,
      ref: 'Cow',
      required: true,
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

const Order = model<IOrder, IOrderModel>('Order', OrderSchema);

export default Order;

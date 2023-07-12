import { z } from 'zod';
import { role } from './user.interface';

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'Password is required',
    }),
    role: z.enum([...role] as [string, ...string[]]),
    name: z.object({
      firstName: z.string({
        required_error: 'FirstName is required',
      }),
      lastName: z.string({
        required_error: 'LastName is required',
      }),
    }),
    phoneNumber: z.string({
      required_error: 'PhoneNumber is required',
    }),
    address: z.string({
      required_error: 'Address  is required',
    }),
    budget: z.number({
      required_error: 'Budget  is required',
    }),
    income: z.number({
      required_error: 'Income  is required',
    }),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};

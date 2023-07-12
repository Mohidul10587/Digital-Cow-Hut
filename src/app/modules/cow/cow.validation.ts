import { z } from 'zod';

const createCowZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'This is required field' }),
    age: z.number({ required_error: 'This is required field' }),
    price: z.number({ required_error: 'This is required field' }),
    location: z.string({ required_error: 'This is required field' }),
    breed: z.string({ required_error: 'This is required field' }),
    weight: z.number({ required_error: 'This is required field' }),
    label: z.string({ required_error: 'This is required field' }),
    category: z.string({ required_error: 'This is required field' }),
    seller: z.string({ required_error: 'This is required field' }),
  }),
});

export const CowValidation = {
  createCowZodSchema,
};

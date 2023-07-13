import { z } from 'zod';
import { breed, category, label, location } from './cow.interface';

const createCowZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'This is required field' }),
    age: z.number({ required_error: 'This is required field' }),
    price: z.number({ required_error: 'This is required field' }),
    location: z.enum([...location] as [string, ...string[]]),
    breed: z.enum([...breed] as [string, ...string[]]),
    weight: z.number({ required_error: 'This is required field' }),
    label: z.enum([...label] as [string, ...string[]]),
    category: z.enum([...category] as [string, ...string[]]),
    seller: z.string({ required_error: 'This is required field' }),
  }),
});

export const CowValidation = {
  createCowZodSchema,
};

import express from 'express';
import validateRequest from '../../middleware/middleware';
import { CowController } from './cow.controller';
import { CowValidation } from './cow.validation';
const router = express.Router();

router.post(
  '/create-cow',
  validateRequest(CowValidation.createCowZodSchema),
  CowController.createCow
);

export const CowRoutes = router;

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
router.get('/', CowController.getAllCows);
router.delete('/delete-cow/:id', CowController.deleteCow);

router.get('/single-cow/:id', CowController.getSingleCow);
router.patch(
  '/update-cow/:id',
  validateRequest(CowValidation.updateCowZodSchema),
  CowController.updateCow
);
export const CowRoutes = router;

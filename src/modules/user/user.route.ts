import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { userZodValidation } from './user.validation';
import { userController } from './user.controller';

const router = express.Router();

router.post(
  '/signup',
  userController.createUser,
);

export const userRouter = router;

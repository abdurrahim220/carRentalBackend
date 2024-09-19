import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { bookingZodValidation } from './booking.validation';
import { bookingController } from './booking.controller';

const router = express.Router();

router.post(
  '/create',
  validateRequest(bookingZodValidation.bookingValidation),
  bookingController.createBookingIntoDB,
);
router.get('/', bookingController.getAllBookingFromDB);
router.get('/:id', bookingController.getSingleBookingFromDB);

export const bookingsRouter = router;

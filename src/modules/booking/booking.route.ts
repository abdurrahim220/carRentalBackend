import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { bookingZodValidation } from './booking.validation';
import { bookingController } from './booking.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.post(
  '/',
  auth(['user']),
  validateRequest(bookingZodValidation.bookingValidation),
  bookingController.createBookingIntoDB,
);
router.get('/',auth(['admin']), bookingController.getAllBookingFromDB);
router.get('/:id', bookingController.getSingleBookingFromDB);

export const bookingsRouter = router;

import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import CarModel from '../car/car.model';
import { IBooking } from './booking.interface';
import BookingModel from './booking.model';

const createBookingIntoDB = async (payload: IBooking, userId: string) => {
  const { car: carId, date, startTime } = payload;

  const car = await CarModel.findById(carId);

  if (!car) {
    throw new AppError('Car not found', httpStatus.NOT_FOUND);
  }

  if (car.status !== 'available') {
    throw new AppError('Car is unavailable', httpStatus.CONFLICT);
  }

  const newBooking = await BookingModel.create({
    user: userId,
    car: carId,
    date,
    startTime,
  });

  car.status = 'unavailable';
  await car.save();

  const populatedBooking = await BookingModel.findById(newBooking._id)
    .populate('user')
    .populate('car');

  return populatedBooking;
};
const getAllBookingFromDB = async () => {
  const result = await BookingModel.find().populate('user').populate('car');
  return result;
};

const getSingleBookingFromDB = async (id: string) => {
  const result = await BookingModel.findById(id)
    .populate('user')
    .populate('car');
  return result;
};

const getUserBookingsFromDB = async (userId: string) => {
  const result = await BookingModel.find({ user: userId })
    .populate('user')
    .populate('car');
  return result;
};

const returnCarFromDB = async (bookingId: string, endTime: string) => {
  const booking = await BookingModel.findById(bookingId).populate('car');

  if (!booking) {
    throw new AppError('Booking not found', httpStatus.NOT_FOUND);
  }

  const car = booking.car as typeof CarModel.prototype;

  const startHour = parseInt(booking.startTime.split(':')[0], 10);
  const endHour = parseInt(endTime.split(':')[0], 10);

  const hoursUsed = endHour - startHour;

  const pricePerHour = car.pricePerHour;

  const totalCost = hoursUsed * pricePerHour;

  booking.endTime = endTime;
  booking.totalCost = totalCost;
  await booking.save();

  await CarModel.findByIdAndUpdate(car._id, { status: 'available' });

  await booking.populate('user');

  return booking;
};

export const bookingServices = {
  createBookingIntoDB,
  getAllBookingFromDB,
  getSingleBookingFromDB,
  getUserBookingsFromDB,
  returnCarFromDB,
};

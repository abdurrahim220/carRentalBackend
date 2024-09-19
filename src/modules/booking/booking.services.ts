import { IBooking } from './booking.interface';
import BookingModel from './booking.model';

const createBookingIntoDB = async (payload: IBooking) => {
  const result = (await BookingModel.create(payload));
  return result;
};
const getAllBookingFromDB = async () => {
  const result = await BookingModel.find().populate('user').populate('car');
  return result;
};

const getSingleBookingFromDB = async (id: string) => {
  const result = await BookingModel.findById(id).populate('user').populate('car');
  return result;
};
// const deleteBookingFromDB = async (id: string) => {};
// const updateBookingIntoDB = async (id: string) => {};

export const bookingServices = {
  createBookingIntoDB,
  getAllBookingFromDB,
  getSingleBookingFromDB,
//   deleteBookingFromDB,
//   updateBookingIntoDB,
};

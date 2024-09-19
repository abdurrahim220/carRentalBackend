import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { bookingServices } from './booking.services';

const createBookingIntoDB = catchAsync(async (req, res) => {
    const result = await bookingServices.createBookingIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking Created Successfully',
    data:result
  });
});
const getAllBookingFromDB= catchAsync(async (req, res) => {
    const result = await bookingServices.getAllBookingFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking retrieved Successfully',
    data:result
  });
});

const getSingleBookingFromDB = catchAsync(async (req, res) => {
    const result = await bookingServices.getSingleBookingFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking retrieved Successfully',
    data:result
  });
});

// const deleteBookingFromDB = catchAsync(async (req, res) => {
//     const result =;
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Booking Created Successfully',
//     data:result
//   });
// });
// const updateBookingIntoDB = catchAsync(async (req, res) => {
//     const result =;
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Booking Created Successfully',
//     data:result
//   });
// });

export const bookingController ={
  createBookingIntoDB,
  getAllBookingFromDB,
  getSingleBookingFromDB,
  // deleteBookingFromDB,
  // updateBookingIntoDB
}

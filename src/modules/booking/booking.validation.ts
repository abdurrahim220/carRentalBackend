import { z } from 'zod';

// Zod validation for time format (24-hour format)
const timeFormat = z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
  message: 'Time must be in 24-hour format (HH:mm)',
});

const bookingValidation = z.object({
  body: z.object({
    date: z.string().date(),
    user: z.string().nonempty('User ID is required'),
    car: z.string().nonempty('Car ID is required'),
    startTime: timeFormat,
    endTime: timeFormat.default('null'),
    totalCost: z.number().min(0).default(0),
  }),
});

export const bookingZodValidation = {
  bookingValidation,
};

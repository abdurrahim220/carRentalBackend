import { model, Schema } from 'mongoose';
import { CUser } from './user.interface';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';

const userSchema = new Schema<CUser>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'user'],
      default: 'user',
    },
    password: { type: String, required: true },
    phone: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const user = this as CUser;
  const existingUser = await UserModel.findOne({
    $or: [{ email: user.email }, { phone: user.phone }],
  });

  if (existingUser) {
    if (existingUser.email == user.email) {
      throw new AppError(
        'User with this email already exists',
        httpStatus.CONFLICT,
      );
    }
    if (existingUser.phone == user.phone) {
      throw new AppError(
        'User with this phone already exists',
        httpStatus.CONFLICT,
      );
    }
  }

  next();
});
export const UserModel = model<CUser>('User', userSchema);

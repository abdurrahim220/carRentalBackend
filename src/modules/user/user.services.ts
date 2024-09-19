import { CUser } from './user.interface';
import { UserModel } from './user.model';

const createUserIntoDB = async (payload: CUser) => {
  const result = await UserModel.create(payload);
  return result;
};

export const userServices = {
  createUserIntoDB,
};

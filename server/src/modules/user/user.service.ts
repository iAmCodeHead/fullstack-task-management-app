import User from './user.model';
import { IUser } from './user.interface';

export const createUser = async (userBody: IUser): Promise<IUser> => {
  return User.create(userBody);
};

export const getUserByUsername = async (username: string): Promise<IUser | null> => {
  return User.findOne({ username });
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  return User.findById(id);
};

import httpStatus from 'http-status';
import { ApiError } from '../../utils/error-utils';
import { isPasswordValid } from '../../helpers/jwt.helper';
import { IUser } from '../user/user.interface';
import { getUserByUsername } from '../user/user.service';
import IUserLogin from './auth.interface';

export const userLogin = async (credentials: IUserLogin): Promise<IUser> => {
  const { username, password } = credentials;

  const user = await getUserByUsername(username);
  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid username or password');

  const validPassword = isPasswordValid(password, user.password);
  if (!validPassword) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid username or password');

  return user;
};

export const logout = async (): Promise<void> => {};

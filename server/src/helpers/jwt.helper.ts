import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import { ApiError } from '../utils/error-utils';
import config from '../config';

// Decoding the JWT Token
export const decode = (token: string): any => {
  return jwt.decode(token);
};

// Generate JWT Token
export const generateToken = (auth: any): string => {
  // TODO: change "any"
  return jwt.sign({ username: auth.username, id: auth.id }, config.jwtSecret);
};

// Validate User's password
export const isPasswordValid = (password: string, userPassword: string): boolean => {
  return bcrypt.compareSync(password, userPassword);
};

// Encode User's password
export const encodePassword = (password: string): string => {
  const salt: string = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

// Validate JWT Token, throw forbidden error if JWT Token is invalid
export const verify = (token: string): any => {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid token');
  }
};

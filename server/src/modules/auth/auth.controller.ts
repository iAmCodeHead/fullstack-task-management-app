import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { generateToken } from '../../helpers/jwt.helper';
import { userService } from '../user';
import { authService } from '.';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.createUser(req.body);
    const token = generateToken(user);
    res.status(httpStatus.CREATED).json({ user, token });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await authService.userLogin(req.body);
    const token = generateToken(user);
    res.status(httpStatus.OK).json({ user, token });
  } catch (error) {
    next(error);
  }
};

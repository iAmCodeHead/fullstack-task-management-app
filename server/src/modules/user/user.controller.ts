import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';
import * as userService from './user.service';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(httpStatus.CREATED).send(user);
  } catch (error) {
    next(error);
  }
};

export default createUser;

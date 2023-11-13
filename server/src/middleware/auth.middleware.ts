/* eslint-disable @typescript-eslint/dot-notation */
import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/error-utils';
import { verify } from '../helpers/jwt.helper';
import { getUserById } from '../modules/user/user.service';

const authenticate = async (req: Request | any, _res: Response, next: NextFunction): Promise<void> => {
  try {
    const { headers } = req;
    const token = headers?.authorization?.split(' ')[1];

    if (token) {
      const decoded = verify(token);
      if (decoded) {
        const { id } = decoded;
        /**
         * We can go on to fetch user details here to see if the
         * user still exists in the system and append it to the request
         *  */
        const user = await getUserById(id);
        if (!user) next(new ApiError(httpStatus.UNAUTHORIZED, 'Authentication Failed!'));
        req.body['userId'] = id;
      } else {
        return next(new ApiError(httpStatus.UNAUTHORIZED, 'Authentication Failed!'));
      }
      next();
    } else {
      return next(new ApiError(httpStatus.BAD_REQUEST, 'Unauthenticated!'));
    }
  } catch (error) {
    next(error);
  }
};

export default authenticate;

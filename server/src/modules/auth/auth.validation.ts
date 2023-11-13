/* eslint-disable prettier/prettier */
import Joi from 'joi';
import IUserLogin from './auth.interface';

const userLogin: Record<keyof IUserLogin, any> = {
  username: Joi.string().required(),
  password: Joi.string()
    // .regex(/[0-9a-zA-Z]*\d[0-9a-zA-Z]*/) // at least one digit in any position
    // .regex(/[0-9a-zA-Z]*\[a-zA-Z][0-9a-zA-Z]*/) // at least one letter in any position
    // .min(8)
    .required(),
};

const validateUserLogin = {
  body: Joi.object().keys(userLogin),
};

export default validateUserLogin;
import { Segments, Joi, SchemaOptions } from 'celebrate';
import { IUser } from './user.interface';

const createUserBody: Record<keyof IUser, any> = {
  name: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string()
    // .regex(/[0-9a-zA-Z]*\d[0-9a-zA-Z]*/) // at least one digit in any position
    // .regex(/[0-9a-zA-Z]*\[a-zA-Z][0-9a-zA-Z]*/) // at least one letter in any position
    // .min(6)
    .required(),
};

export const createUser: SchemaOptions = {
  [Segments.BODY]: Joi.object().keys(createUserBody),
};

export const getUsers: SchemaOptions = {
  [Segments.QUERY]: Joi.object().keys({
    sortBy: Joi.string(),
  }),
};

import request from 'supertest';
import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import app from '../../../app';
import setupTestDB from '../../utils/test-utils/setup-test-db';
import { IUser } from '../user/user.interface';
import User from '../user/user.model';
import IUserLogin from './auth.interface';

setupTestDB();

const userOne: IUser = {
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  username: faker.internet.userName(),
  password: faker.internet.password(),
};

describe('Auth routes', () => {
  describe('POST /v1/auth/register', () => {
    test('should return 201 and successfully register new user if data is ok', async () => {
      const res = await request(app).post('/v1/auth/register').send(userOne).expect(httpStatus.CREATED);
      const { user, token } = res.body;
      expect(user.name).toEqual(userOne.name);
      expect(user.username).toEqual(userOne.username);
      expect(token).toBeDefined();

      const dbUser = await User.findById(user.id);
      expect(dbUser).toBeDefined();
      if (!dbUser) return;
      expect(dbUser.name).toEqual(userOne.name);
      expect(dbUser.username).toEqual(userOne.username);
    });
  });

  describe('POST /v1/auth/login', () => {
    let newUser: IUserLogin;

    beforeEach(() => {
      newUser = {
        username: faker.internet.userName(),
        password: faker.internet.password(),
      };
    });

    test('should return 400 for trying to register with bad data', async () => {
      await request(app).post('/v1/auth/register').send(newUser).expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if credentials is invalid', async () => {
      await request(app).post('/v1/auth/login').send(newUser).expect(httpStatus.BAD_REQUEST);
    });
  });
});

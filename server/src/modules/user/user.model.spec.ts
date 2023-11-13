import { faker } from '@faker-js/faker';
import { IUser } from './user.interface';
import User from './user.model';

describe('User model', () => {
  describe('User validation', () => {
    let newUser: IUser;
    beforeEach(() => {
      newUser = {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        username: faker.internet.userName(),
        password: faker.internet.password(),
      };
    });

    test('should correctly validate a valid user', async () => {
      await expect(new User(newUser).validate()).resolves.toBeUndefined();
    });
  });
});

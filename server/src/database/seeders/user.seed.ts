import { faker } from '@faker-js/faker';
import { IUser } from '@/modules/user/user.interface';

const usersDataSeed: IUser[] = [
  {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    password: faker.internet.password(),
    username: faker.internet.userName(),
  },
  {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    password: faker.internet.password(),
    username: faker.internet.userName(),
  },
];

export default usersDataSeed;

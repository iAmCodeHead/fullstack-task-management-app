# Fullstack Task Mgt web application (MERN) stack


## Frontend
The frontend is built with reack and TypeScript. Notable libraries used include but not limited to:

- [Vite](https://vitejs.dev/)
- [MaterialUI](https://mui.com/)
- [TailwindCss](https://tailwindcss.com/)

![image](https://github.com/iAmCodeHead/fullstack-task-management-app/assets/35177481/c44b8c04-5c09-4fdf-86a6-0aa76565b934)

## Features
- **User Authtentication**
- **User Authourization**
- **Creating of task**
- **Fetching all tasks**
- **Fetching single task**
- **Editing a task**
- **Deleting tasks**
- **Statistics of completed tasks**
- **State Management**

## Improvements
If given more time, a few things ccould have ben improved, namely:
- A better error handling mechanism
- A more intuitive empty state and data validation mechanism
- Improved state management
- Writing of unit tests
- Pagination is tasks
- More atomic components
- Secure User logout
- Improved UI ( such as, handling active route)


Run the application
```bash
docker compose up -d
```
You application should now be up and running on `http://localhost:3000/v1`\
Check out [API Documentation](#api-documentation) for available endpoints.

### NOTE: I ran into an issue with docker. As such, you might see docker spinned up correctly but the is inaccessible, kindly use the manual installation below. I'll get on with it afterwards

## Manual Installation (Frintend)

Clone the repo:

```bash
git clone --depth 1 https://github.com/iAmCodeHead/fullstack-task-management-app.git project-name
cd project-name/client
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.local .env

# open .env and modify the environment variables (if needed)
```

## Commands

Running locally:

```bash
npm run dev
```

## Inspiration

- [Tirso Lecointere - codepen](https://codepen.io/tirsolecointere/pen/oNwpRdd)

## Backend

 This work sample comes with many built-in features, such as request validation, unit and integration tests, docker support, API documentation, pagination, etc. For more details, check the ```features``` section below.

This project opted for yarn over npm as a package manager because Yarn is known for being faster than npm in terms of package installation and overall performance. This is because Yarn uses a caching mechanism to store packages on the local disk, which speeds up the installation process. [see more](https://www.copycat.dev/blog/yarn-vs-npm/). (Disclaimer: This is only a matter of personal preference).

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Commands](#commands)
- [Making Changes](#making-changes)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Error Handling](#error-handling)
- [Validation](#validation)
- [Logging](#logging)
- [Custom Mongoose Plugins](#custom-mongoose-plugins)
  - [To JSON Plugin](#tojson)
  - [Paginate Plugin](#paginate)
- [Linting](#linting)
- [Contributing](#contributing)
- [Inspirations](#inspirations)

## Features

- **Static Typing**: [TypeScript](https://www.typescriptlang.org/) static typing using typescript
- **Hot Reloading**: [Concurrently](https://github.com/open-cli-tools/concurrently) Hot realoding with concurrently
- **NoSQL database**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com)
- **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
- **Logging**: using [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan)
- **Testing**: unit and integration tests using [Jest](https://jestjs.io)
- **Error handling**: centralized error handling mechanism
- **API documentation**: with [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) and [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)
- **Dependency management**: with [Yarn](https://yarnpkg.com)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env#readme)
- **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io)
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **Docker support**
- **API versioning**
- **Code quality**: with [Codacy](https://www.codacy.com)
- **Git hooks**: with [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged)
- **Linting**: with [ESLint](https://eslint.org) and [Prettier](https://prettier.io)
- **Editor config**: consistent editor configuration using [EditorConfig](https://editorconfig.org)
- **Structured Commit Messages**: with [Commitizen](https://github.com/commitizen/cz-cli)
- **Commit Linting**: with [CommitLint](https://github.com/conventional-changelog/commitlint)

## Project Structure
Here is a high level overview of the project structure
```
.
├── src                             # Source files
│   ├── config                        # Environment variables and other configurations
│   ├── modules                       # Modules such as models, controllers, services 
        ├── user                        # User module contains the user controller, service, interface, test, etc
    ├── utils                       # Contains utility functions
│   └── routes                        # Routes
├── app.ts                          # Express App
├── index.ts                        # App entry file
├── package.json
└── README.md
```

## Quick run

To run the project quickly on your local (please ensure you have docker installed), simply run:

Clone the repo:

```bash
git clone --depth 1 https://github.com/iAmCodeHead/fullstack-task-management-app.git project-name
cd project-name
```
Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

Run the application
```bash
docker compose up -d
```
You application should now be up and running on `http://localhost:3000/v1`\
Check out [API Documentation](#api-documentation) for available endpoints.

### NOTE: I ran into an issue with docker. As such, you might see docker spinned up correctly but the is inaccessible, kindly use the manual installation below. I'll get on with it afterwards

## Manual Installation (Backend)

Clone the repo:

```bash
git clone --depth 1 https://github.com/iAmCodeHead/fullstack-task-management-app.git project-name
cd project-name/server
```

Install the dependencies:

```bash
yarn install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

## Commands

Running locally:

```bash
yarn dev
```

Compiling to JS from TS

```bash
yarn compile
```

Compiling to JS from TS in watch mode

```bash
yarn compile:watch
```

Testing:

```bash
# run all tests
yarn test

# run TypeScript tests
yarn test:ts

# run JS tests
yarn test:js

# run all tests in watch mode
yarn test:watch

# run test coverage
yarn coverage
```

Linting:

```bash
# run ESLint
yarn lint

# fix ESLint errors
yarn lint:fix

# run prettier
yarn prettier

# fix prettier errors
yarn prettier:fix
```

## Making Changes

Run `yarn dev` so you can compile Typescript(.ts) files in watch mode

```bash
yarn dev
```

Add your changes to TypeScript(.ts) files which are in the src folder. The files will be automatically compiled to JS if you are in watch mode.

Add tests for the new feature

Run `yarn test:ts` to make sure all Typescript tests pass.

```bash
yarn test:ts
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=3000

# URL of the Mongo DB
MONGODB_URL=mongodb://127.0.0.1:27017/your_database_name
```

## API Documentation

You can view the list of available APIs and their specifications here: 
https://documenter.getpostman.com/view/27455894/2s9YXk4gvD

### API Endpoints

List of available routes:

**Task routes**:\
`POST /v1/task` - create a task (Authorization required)\
`GET /v1/task/:taskId` - get a task (Authorization required)\
`GET /v1/task?limit=10` - To fetch all existing tasks (Authorization required)\
`PATCH /v1/task/:taskId` - To update an existing task (Authorization required)\
`DELETE /v1/task/:taskId` - To delete an existing task (Authorization required)
`GET /v1/task/overview` - get tasks overview for logged in user (Authorization required)\
...more endpoints in the link above.

## Error Handling

The app has a centralized error handling mechanism.

Controllers should try to catch the errors and forward them to the error handling middleware (by calling `next(error)`).

```typescript
  try {
    const task = await taskService.createTask(req.body);
    res.status(httpStatus.CREATED).json(task);
  } catch (error) {
    next(error);
  }
```

The error handling middleware sends an error response, which has the following format:

```json
{
  "code": 404,
  "message": "Not found"
}
```

When running in development mode, the error response also contains the error stack.

The app has a utility ApiError class to which you can attach a response code and a message, and then throw it.

For example, if you are trying to get a user from the DB who is not found, and you want to send a 404 error, the code should look something like:

```typescript
import { ITask } from './tasks.interface';
import Task from './tasks.model';

export const fetchTask = async (taskId: string | undefined, userId: string | undefined): Promise<ITask | null> => {
  return Task.findOne({ _id: taskId, userId });
};
```

## Validation

Request data is validated using [Joi](https://joi.dev/). Check the [documentation](https://joi.dev/api/) for more details on how to write Joi validation schemas.

The validation schemas are defined in each `module` directory and are used in the routes by providing them as parameters to the `validate` middleware.

```typescript
import authenticate from '../../middleware/auth.middleware';
import { taskController, taskValidation } from '../../modules/tasks';
import validate from '../../middleware/validate.middleware';

const router = express.Router();

router
  .post('/', authenticate, validate(taskValidation.createTask), taskController.createTask)
  .get('/', authenticate, taskController.getTasks)
  .get('/overview', authenticate, taskController.getTasksOverview)
```

## Logging

Import the logger from `src/modules/logger/logger`. It is using the [Winston](https://github.com/winstonjs/winston) logging library.

Logging should be done according to the following severity levels (ascending order from most important to least important):

```typescript
import logger from './src/modules/logger/logger';

logger.error('message'); // level 0
logger.warn('message'); // level 1
logger.info('message'); // level 2
logger.http('message'); // level 3
logger.verbose('message'); // level 4
logger.debug('message'); // level 5
```

In development mode, log messages of all severity levels will be printed to the console.

In production mode, only `info`, `warn`, and `error` logs will be printed to the console.\
It is up to the server (or process manager) to actually read them from the console and store them in log files.\

Note: API request information (request url, response code, timestamp, etc.) are also automatically logged (using [morgan](https://github.com/expressjs/morgan)).

## Custom Mongoose Plugins

The app also contains 2 custom mongoose plugins that you can attach to any mongoose model schema. You can find the plugins in `src/models/plugins`.

```typescript
import mongoose from 'mongoose';
import toJSON from '../toJSON/toJSON';
import paginate from '../paginate/paginate';

const userSchema = mongoose.Schema(
  {
    /* schema definition here */
  },
  { timestamps: true }
);

userSchema.plugin(toJSON);
userSchema.plugin(paginate);

const User = mongoose.model('User', userSchema);
```

### toJSON

The toJSON plugin applies the following changes in the toJSON transform call:

- removes \_\_v, createdAt, updatedAt, and any schema path that has private: true
- replaces \_id with id

### paginate

The paginate plugin adds the `paginate` static method to the mongoose schema.

Adding this plugin to the `User` model schema will allow you to do the following:

```typescript
export const fetchTasks = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const tasks = await Task.paginate(filter, options);
  return tasks;
};
```

The `filter` param is a regular mongo filter.

The `options` param can have the following (optional) fields:

```typescript
const options = {
  sortBy: 'name:desc', // sort order
  limit: 5, // maximum results per page
  page: 2, // page number
};
```
The `paginate` method returns a Promise, which fulfills with an object having the following properties:

```json
{
  "results": [],
  "page": 2,
  "limit": 5,
  "totalPages": 10,
  "totalResults": 48
}
```

## Improvements
If given more time, a few things ccould have ben improved, namely:
- A Caching mechanism on the GET routes for more efficient reads
- A strict password validation
- Token expiry mechanism upon logout request

## Linting

Linting is done using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io).

In this work sample, ESLint is configured to follow the [Airbnb JavaScript style guide](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base) with some modifications. It also extends [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) to turn off all rules that are unnecessary or might conflict with Prettier.

To modify the ESLint configuration, update the `.eslintrc.json` file. To modify the Prettier configuration, update the `.prettierrc.json` file.

To prevent a certain file or directory from being linted, add it to `.eslintignore` and `.prettierignore`.

To maintain a consistent coding style across different IDEs, the project contains `.editorconfig`

## Inspiration

- [node-express-boilerplate](https://github.com/iAmCodeHead/backend-worksample)

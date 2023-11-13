import Joi from 'joi';
import 'dotenv/config';
import Envs from './config.enum';

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid(...Object.values(Envs))
      .required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    JWT_SECRET: Joi.string().required().description('JWT secret'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwtSecret: envVars.JWT_SECRET,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === Envs.TEST ? `-${Envs.TEST}` : ''),
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
export default config;

import express, { Router } from 'express';
import validate from '../../middleware/validate.middleware';
import { authValidation } from '../../modules/auth';
import { userValidation } from '../../modules/user';
import { login, register } from '../../modules/auth/auth.controller';

const router: Router = express.Router();

router.post('/register', validate(userValidation.createUser), register).post('/login', validate(authValidation), login);

export default router;

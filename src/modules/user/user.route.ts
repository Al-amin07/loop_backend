import { Router } from 'express';
import { userControllers } from './user.controller';
import auth from '../../middlewares/auth';

const route = Router();

route.get('/', userControllers.getAllUser);

export const userRoute = route;

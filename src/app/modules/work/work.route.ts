import { Router } from 'express';
import { workControllers } from './work.controller';

const route = Router();

route.post('/', workControllers.createWork);
route.get('/', workControllers.getAllWork);

export const workRoute = route;

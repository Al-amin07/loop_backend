import { Router } from 'express';
import { paymentControllers } from './payment.controller';
import auth from '../../middlewares/auth';

const route = Router();
route.post('/', paymentControllers.createPayment);
route.post('/client-secret', paymentControllers.getClientSecret);
route.get('/', paymentControllers.getAllPayment);
route.get('/:id', paymentControllers.getUserAllPayment);
route.put('/:id', paymentControllers.updatePayment);
export const paymentRoute = route;

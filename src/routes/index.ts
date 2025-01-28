import { Router } from 'express';
import { authRoute } from '../modules/auth/auth.route';
import { userRoute } from '../modules/user/user.route';
import { paymentRoute } from '../modules/payment/payment.route';
import { fileRoute } from '../modules/file/file.route';
import { paypalRoute } from '../modules/paypal/paypal.route';

const route = Router();

const modules = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/payments',
    route: paymentRoute,
  },
  {
    path: '/files',
    route: fileRoute,
  },
  {
    path: '/config',
    route: paypalRoute,
  },
];

modules.map((el) => route.use(el.path, el.route));

export default route;

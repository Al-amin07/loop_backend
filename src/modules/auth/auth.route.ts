import { Router } from 'express';
import { authControllers } from './auth.controller';
import authMiddleware from '../../middlewares/authMiddleware';
// import refreshToken from '../../middlewares/generateRefreshToken';

const route = Router();

route.post('/register', authControllers.registerUser);
route.post('/login', authControllers.loginUser);
route.post('/logout', authControllers.logoutUser);
route.get('/me', authMiddleware, authControllers.getCurrentUser);

export const authRoute = route;

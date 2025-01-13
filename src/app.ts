import express from 'express';
import cors from 'cors';
import route from './routes';
import globalErrorHander from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';
import cookieParser from 'cookie-parser';
import Stripe from 'stripe';
import config from './config';
import multer from 'multer';
export const upload = multer({ storage: multer.memoryStorage() });
export const stripe = new Stripe(config.stript_secret as string);
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://lo-op.netlify.app'],
    credentials: true,
  }),
);

app.use(cookieParser());
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Hello World',
  });
});
app.use('/api', route);
app.use(globalErrorHander);
app.use(notFound);

export default app;

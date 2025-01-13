import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  db_url: process.env.DB_URL,
  port: process.env.PORT,
  access_secret: process.env.ACCESS_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  stript_secret: process.env.STRIPE_SECRET,
};

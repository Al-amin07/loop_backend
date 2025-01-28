import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  db_url: process.env.DB_URL,
  port: process.env.PORT,
  access_secret: process.env.ACCESS_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  stript_secret: process.env.STRIPE_SECRET,
  paypal_secret: process.env.PAYPAL_SECERT_KEY,
  paypal_client_id: process.env.PAYPAL_CLIENT_ID,
  send_box_url: process.env.SEND_BOX_URL,
};

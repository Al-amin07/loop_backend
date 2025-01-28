/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import config from '../config';

export const generatePaypalToken = async () => {
  console.log(`${config.send_box_url}/v1/oauth2/token`);
  const { data: tokenData } = await axios({
    url: `${config.send_box_url}/v1/oauth2/token`,
    method: 'POST',
    data: 'grant_type=client_credentials',
    auth: {
      username: config.paypal_client_id as string,
      password: config.paypal_secret as string,
    },
  });
  console.log(tokenData);
};

export async function getAccessToken() {
  try {
    // console.log(`${config.send_box_url}/v1/oauth2/token`);
    const { data } = await axios.post(
      `${config.send_box_url}/v1/oauth2/token`,
      new URLSearchParams({ grant_type: 'client_credentials' }),

      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: config.paypal_client_id as string,
          password: config.paypal_secret as string,
        },
      },
    );
    return data?.access_token;
  } catch (error: any) {
    console.error('Error fetching access token:', error?.response.data);
    throw new Error('Could not fetch access token');
  }
}

export const createOrder = async () => {
  try {
    const token = await getAccessToken();
    const response = await axios.post(
      'https://api-m.sandbox.paypal.com/v2/checkout/orders',
      {
        intent: 'CAPTURE',
        payment_source: {
          paypal: {
            experience_context: {
              payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
              payment_method_selected: 'PAYPAL',
              //   landing_page: 'LOGIN',
              brand_name: 'Adaptify Loop',
              shipping_preference: 'NO_SHIPPING',
              user_action: 'PAY_NOW',
              return_url: 'http://localhost:5173/complete-order',
              cancel_url: 'http://localhost:5173/cancle-order',
            },
          },
        },
        purchase_units: [
          {
            invoice_id: 'pen123',
            amount: {
              currency_code: 'USD',
              value: '20.00',
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: '20.00',
                },
              },
            },
            items: [
              {
                name: 'Pen',
                description: 'A high-quality ballpoint pen',
                unit_amount: {
                  currency_code: 'USD',
                  value: '20.00',
                },
                quantity: '1',
              },
            ],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          //   'PayPal-Request-Id': 'unique-request-id-12345',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const orderId = response?.data?.id;
    console.log('Order Created:', { orderId }, response.data);
  } catch (error: any) {
    console.error(
      'Error Creating Order:',
      error.response ? error.response.data : error.message,
    );
  }
};

// createOrder();

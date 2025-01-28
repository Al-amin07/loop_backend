/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import config from '../../config';

import paypal from 'paypal-rest-sdk';

import { paypalController } from './paypal.controller';

paypal.configure({
  mode: 'sandbox',
  client_id: config.paypal_client_id as string,
  client_secret: config.paypal_secret as string,
});

const route = Router();

route.post('/paypal', paypalController.createOrder);
route.get('/capture-payment/:paymentId', paypalController.capturePayment2);
route.get('/invoice/:invoiceId', paypalController.getSingleInvoice);
route.get('/invoice', paypalController.getAllInvoices);
route.get('/token', paypalController.getToken);

route.post('/pay', async (req, res) => {
  let data;
  try {
    const create_payment_json = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: 'http://localhost:8000/success',
        cancel_url: 'http://localhost:8000/failed',
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: 'item',
                sku: 'item',
                price: '1.00',
                currency: 'USD',
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: 'USD',
            total: '1.00',
          },
          description: 'This is the payment description.',
        },
      ],
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        throw error;
      } else {
        console.log('Create Payment Response');
        // console.log(payment);
        data = payment;
        res.json(data);
      }
    });
  } catch (error) {
    console.log({ error });
  }
});

export const paypalRoute = route;

// route.get('/paypal', async (req, res) => {
//   try {
//     const token = await getAccessToken();
//     const response = await axios.post(
//       'https://api-m.sandbox.paypal.com/v2/checkout/orders',
//       {
//         intent: 'CAPTURE',
//         payment_source: {
//           paypal: {
//             experience_context: {
//               payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
//               payment_method_selected: 'PAYPAL',
//               //   landing_page: 'LOGIN',
//               brand_name: 'Adaptify Loop',
//               shipping_preference: 'NO_SHIPPING',
//               user_action: 'PAY_NOW',
//               return_url: 'http://localhost:5173/completed',
//               cancel_url: 'http://localhost:5173/reject',
//             },
//           },
//         },
//         purchase_units: [
//           {
//             invoice_id: 'pen123',
//             amount: {
//               currency_code: 'USD',
//               value: '20.00',
//               breakdown: {
//                 item_total: {
//                   currency_code: 'USD',
//                   value: '20.00',
//                 },
//               },
//             },
//             items: [
//               {
//                 name: 'Pen',
//                 description: 'A high-quality ballpoint pen',
//                 unit_amount: {
//                   currency_code: 'USD',
//                   value: '20.00',
//                 },
//                 quantity: '1',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           //   'PayPal-Request-Id': 'unique-request-id-12345',
//           Authorization: `Bearer ${token}`,
//         },
//       },
//     );
//     const orderId = response?.data?.id;
//     console.log('Order Created:', { orderId }, response.data);
//     res.json({
//       orderId,
//     });
//   } catch (error: any) {
//     console.error(
//       'Error Creating Order:',
//       error.response ? error.response.data : error.message,
//     );
//     next(error);
//   }
// });

/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import catchAsync from '../../utils/catchAsync';
import { getAccessToken } from '../../utils/generatePaypalToken';
import config from '../../config';
import { NextFunction, Request, Response } from 'express';
import { createinvoice, getInvoicePDF } from '../../utils/getInvoice';
import sendResponse from '../../utils/sendResponse';
const getToken = catchAsync(async (req, res) => {
  const result = await getAccessToken();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Token generated',
    data: result,
  });
});

const createOrder = catchAsync(async (req, res) => {
  const { title, amount } = req.body;
  const token = await getAccessToken();
  const invoiceId = `INV-${Date.now()}`;
  const response = await axios.post(
    `${config.send_box_url}/v2/checkout/orders`,
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
            return_url: 'https://lo-op.netlify.app/complete-order',
            cancel_url: 'https://lo-op.netlify.app/cancle-order',
          },
        },
      },
      purchase_units: [
        {
          invoice_id: invoiceId,
          amount: {
            currency_code: 'USD',
            value: amount,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: amount,
              },
            },
          },
          items: [
            {
              name: title,
              description: 'A high-quality ballpoint pen',
              unit_amount: {
                currency_code: 'USD',
                value: amount,
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
  res.json({ orderId, invoiceId });
});

const capturePayment = catchAsync(async (req, res) => {
  const token = await getAccessToken();
  const { paymentId } = req.params;
  console.log({ token, paymentId });
  const response = await axios.post(
    `${config.send_box_url}/v2/checkout/orders/${paymentId}`,
    // `${config.send_box_url}/v2/checkout/orders/${paymentId}/capture`,
    {}, // Empty body
    {
      headers: {
        'Content-Type': 'application/json',
        // 'PayPal-Request-Id': paymentId,
        Authorization: `Bearer ${token}`,
      },
    },
  );
  console.log('Order Captured:', response.data);
  res.json({ token, paymentId, data: response?.data });
});

const capturePayment2 = async (req: Request, res: Response): Promise<any> => {
  try {
    const token = await getAccessToken();
    const { paymentId } = req.params;

    // Get order details to check the invoice ID
    // const orderDetails = await axios.get(
    //   `${config.send_box_url}/v2/checkout/orders/${paymentId}`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   },
    // );

    // const invoiceId = orderDetails.data?.purchase_units[0]?.invoice_id;
    // console.log('Invoice ID:', invoiceId);

    // if (!invoiceId) {
    //   return res.status(400).json({
    //     error: 'Invoice ID not found for the order.',
    //   });
    // }

    // Capture the payment

    const response = await axios.post(
      `${config.send_box_url}/v2/checkout/orders/${paymentId}/capture`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log('Order Captured:', response.data);
    const result = await createinvoice(token, paymentId, response?.data);
    res.json({ token, paymentId, data: response?.data, result });
  } catch (error: any) {
    const err = error.response?.data || error.message;
    console.error('Error:', err);

    if (err.details?.[0]?.issue === 'DUPLICATE_INVOICE_ID') {
      return res.status(422).json({
        error: 'Duplicate Invoice ID detected. Please use a unique invoice ID.',
      });
    }

    res.status(error.response?.status || 500).json({
      error: err,
    });
  }
};

const getInvoice = catchAsync(async (req, res) => {
  const { invoiceId } = req.params;
  const result = await getInvoicePDF(invoiceId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'f',
    data: result,
  });
});

const getSingleInvoice = catchAsync(async (req, res) => {
  const { invoiceId } = req.params;
  const accessToken = await getAccessToken();
  console.log({ invoiceId, accessToken });
  const response = await axios.get(
    `${config.send_box_url}/v2/invoicing/invoices/${invoiceId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    },
  );

  console.log('oo', response.data);
  sendResponse(res, {
    success: true,
    message: 'Single invoice fetched',
    statusCode: 200,
    data: response.data,
  });
});

const getAllInvoices = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios.get(
      `${config.send_box_url}/v2/invoicing/invoices?total_required=true`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    // console.log(response.data);
    sendResponse(res, {
      success: true,
      message: 'All invoices fetched',
      statusCode: 200,
      data: response.data,
    }); // Logs the invoice data
  } catch (error: any) {
    console.error(
      'Error fetching invoices:',
      error.response?.data || error.message,
    );
    next(error);
  }
};
// const getSingleInvoice = async (req, res, next) => {
//   try {
//     const { invoiceId } = req.params;
//     const accessToken = await getAccessToken();
//     const response = await axios.get(
//       `${config.send_box_url}/v2/invoicing/invoices/${invoiceId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           'Content-Type': 'application/json',
//         },
//       },
//     );

//     // console.log(response.data);
//     sendResponse(res, {
//       success: true,
//       message: 'invoice fetched',
//       statusCode: 200,
//       data: response.data,
//     }); // Logs the invoice data
//   } catch (error: any) {
//     console.error(
//       'Error fetching invoices:',
//       error.response?.data || error.message,
//     );
//     next(error);
//   }
// };

export const paypalController = {
  createOrder,
  capturePayment,
  capturePayment2,
  getInvoice,
  getAllInvoices,
  getSingleInvoice,
  getToken,
};

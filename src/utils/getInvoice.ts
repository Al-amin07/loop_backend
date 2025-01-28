/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { getAccessToken } from './generatePaypalToken';
import config from '../config';

export const getInvoicePDF = async (invoiceId: string) => {
  const token = await getAccessToken();
  console.log({ token, invoiceId });
  const { data } = await axios.get(
    `${config.send_box_url}/v2/invoicing/invoices/${invoiceId}/generate-pdf`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'arraybuffer',
    },
  );

  console.log('PDF saved successfully!', data);
  return data;
};

export const createinvoice = async (
  token: string,
  paymentId: string,
  data: any,
) => {
  const invoiceData = {
    detail: {
      invoice_number: `INV-SUJON-${Date.now()}`,
      currency_code: 'USD',
      note: 'Thank you for your payment!',
      terms_and_conditions: 'No refunds after 30 days.',
    },
    invoicer: {
      name: { given_name: 'Adaptify Loop' },
      email_address: 'contact@adaptifyloop.com',
    },
    primary_recipients: [
      {
        billing_info: {
          name: {
            given_name: data?.payer?.name?.given_name,
            surname: data?.payer?.name?.surname,
          },
          email_address: data?.payer?.email_address,
        },
      },
    ],
    items: data?.purchase_units[0]?.items?.map((item: any) => ({
      name: item?.name,
      description: item?.description || 'No description provided',
      quantity: item?.quantity,
      unit_amount: {
        currency_code: 'USD',
        value: item?.unit_amount.value,
      },
    })),
    amount: {
      currency_code: 'USD',
      value: data?.purchase_units[0]?.amount?.value,
    },
  };

  // Create the invoice
  const response = await axios.post(
    `${config.send_box_url}/v2/invoicing/invoices`,
    invoiceData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );

  const invoiceId = data?.purchase_units[0]?.payments?.captures[0]?.invoice_id;
  console.log({ invoiceId });

  // // Send the invoice
  // const { data: sendData } = await axios.post(
  //   `https://api-m.sandbox.paypal.com/v2/invoicing/invoices/${invoiceId}/send`,
  //   {},
  //   {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       'Content-Type': 'application/json',
  //     },
  //   },
  // );
  // console.log({ sendData });
  return response.data;
};

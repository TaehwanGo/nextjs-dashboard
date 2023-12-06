'use server';

import { z } from 'zod';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  // console.log('formData.entries()', formData.entries());
  // const rawFormData1 = Object.fromEntries(formData.entries());
  // console.log('rawFormData1', rawFormData1);
  // const rawFormData = {
  //   customerId: formData.get('customerId'),
  //   amount: formData.get('amount'),
  //   status: formData.get('status'),
  // };
  // // Test it out:
  // console.log(rawFormData);
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  // Let's convert the amount into cents:
  const amountInCents = amount * 100;
  // Let's create a new date with the format "YYYY-MM-DD" for the invoice's creation date
  const date = new Date().toISOString().split('T')[0];
  // const date = new Date().toISOString();
  // console.log('date', date);
}

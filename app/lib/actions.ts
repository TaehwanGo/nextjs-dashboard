'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getUser, signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

const UserSchema = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: 'Please enter a name.',
  }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    // 특수 문자, 숫자, 대문자, 소문자 각각 1개 이상 포함
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\\\|\[\]{};:\'",.<>\/?]).+$/,
      {
        message:
          'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.',
      },
    ),
});

const CreateUser = UserSchema.omit({ id: true })
  .extend({
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match.',
    path: ['passwordConfirmation'],
  });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
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

  // Validate form using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  // Let's convert the amount into cents:
  const amountInCents = amount * 100;
  // Let's create a new date with the format "YYYY-MM-DD" for the invoice's creation date
  const date = new Date().toISOString().split('T')[0];
  // const date = new Date().toISOString();
  // console.log('date', date);

  // Insert data into the database
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Invoice.',
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  // throw new Error('Temp deleteInvoice error');
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
  } catch (error) {
    return {
      message: 'Database Error: Failed to Delete Invoice.',
    };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

// type User = {
//   id: string;
//   name: string;
//   email: string;
//   password: string;
// };

// type CreateUserForm = Omit<User, 'id'> & {
//   passwordConfirmation: string;
// };

export type CreateUserState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    passwordConfirmation?: string[];
  };
  message?: string | null;
};

export async function signUp(prevState: CreateUserState, formData: FormData) {
  const validatedUserFields = CreateUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    passwordConfirmation: formData.get('passwordConfirmation'),
  });

  if (!validatedUserFields.success) {
    return {
      errors: validatedUserFields.error.flatten().fieldErrors,
      message: 'Failed to validate signup data.',
    };
  }

  const { name, email, password } = validatedUserFields.data;

  const user = await getUser(email);
  if (user) {
    return {
      message: 'User already exists.',
    };
  }

  const id = uuidv4();

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await sql`
      INSERT INTO users (id, name, email, password)
      VALUES (${id}, ${name}, ${email}, ${hashedPassword})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create User.',
    };
  }

  redirect('/login');
}

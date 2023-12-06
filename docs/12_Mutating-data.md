# 12. Mutating data

- Let's continue working on the Invoices page by adding the ability to create, update, and delete invoices!

## In this chapter

- What React Server Actions are and how to use them to mutate data.
- How to work with forms and Server Components.
- Best practices for working with the native formData object, including type validation.
- How to revalidate the client cache using the revalidatePath API.
  - revalidatePath API를 사용하여 클라이언트 캐시를 재검증하는 방법.
- How to create dynamic route segments with specific IDs.
- How to use the React's useFormStatus hook for optimistic updates.

## What are Server Actions?

- React Server Actions allow you to run asynchronous code directly on the server.
- They eliminate the need to create API endpoints to mutate your data.
- 대신, `서버에서 실행`되고 `클라이언트 또는 서버 컴포넌트에서 호출`될 수 있는 비동기 함수를 작성합니다.
- Security is a top priority for web applications, as they can be vulnerable to various threats.
  - 웹 애플리케이션은 다양한 위협에 취약할 수 있으므로 보안이 최우선입니다.
- This is where Server Actions come in.
- They offer an effective security solution, protecting against different types of attacks, securing your data, and ensuring authorized access.
- Server Actions은 POST 요청, 암호화된 폐쇄, 엄격한 입력 확인, 오류 메시지 해싱, 호스트 제한과 같은 기술을 통해 이를 달성하며 모두 함께 작동하여 앱의 안전성을 크게 향상시킵니다.

## Using forms with Server Actions

- In React, you can use the action attribute in the `<form>` element to invoke actions. The action will automatically receive the native FormData object, containing the captured data.
  - React에서는 `<form>` 요소의 action 속성을 사용하여 액션을 호출할 수 있습니다. 작업은 캡처된 데이터가 포함된 기본 FormData 개체를 자동으로 수신합니다.

```tsx
// Server Component
export default function Page() {
  // Action
  async function create(formData: FormData) {
    'use server';

    // Logic to mutate data...
  }

  // Invoke the action using the "action" attribute
  return <form action={create}>...</form>;
}
```

- An advantage of invoking a Server Action within a Server Component is progressive enhancement - forms work even if JavaScript is disabled on the client.
  - 서버 컴포넌트 내에서 서버 액션을 호출하는 장점은 점진적 향상입니다. - JavaScript가 클라이언트에서 비활성화되어도 양식이 작동합니다.
  - 이를 통해 사용자는 양식에 대한 JavaScript가 아직 로드되지 않았거나 로드에 실패한 경우에도 양식과 상호 작용하고 데이터를 제출할 수 있습니다.

## Next.js with Server Actions

- Server Actions are also deeply integrated with Next.js [caching](https://nextjs.org/docs/app/building-your-application/caching).

- When a form is submitted through a Server Action, not only can you use the action to mutate data, but you can also revalidate the associated cache using APIs like revalidatePath and revalidateTag.
  - 서버 작업을 통해 양식이 제출되면 작업을 사용하여 데이터를 변경할 수 있을 뿐만 아니라 revalidatePath 및 revalidateTag와 같은 API를 사용하여 관련 캐시의 유효성을 다시 검사할 수도 있습니다.

## Creating an invoice

- 1. Create a form to capture the user's input.
- 2. Create a Server Action and invoke it from the form.
- 3. Inside your Server Action, extract the data from the formData object.
- 4. Validate and prepare the data to be inserted into your database.
- 5. Insert the data and handle any errors.
- 6. Revalidate the cache and redirect the user back to invoices page.
  - 캐시를 재검증하고 사용자를 청구서 페이지로 다시 리디렉션합니다.

### 1. Create a form to capture the user's input.

### 2. Create a Server Action

- form이 제출될 때 호출되는 서버 액션을 만듭니다.
- 'use server'을 추가하면 파일 내에서 내보낸 모든 기능을 서버 기능으로 표시합니다.
  - 그런 다음 이러한 서버 기능을 클라이언트 및 서버 구성 요소로 가져올 수 있으므로 매우 다양하게 사용할 수 있습니다.
- You can also write Server Actions directly inside Server Components by adding "use server" inside the action. But for this course, we'll keep them all organized in a separate file.

#### Good to know

In HTML, you'd pass a URL to the action attribute. This URL would be the destination where your form data should be submitted (usually an API endpoint).

However, in React, the action attribute is considered a special prop - meaning React builds on top of it to allow actions to be invoked.

Behind the scenes, Server Actions create a POST API endpoint. This is why you don't need to create API endpoints manually when using Server Actions.

### 3. Extract the data from formData

```js
const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42],
]);

const obj = Object.fromEntries(entries);

console.log(obj);
// Expected output: Object { foo: "bar", baz: 42 }
```

```ts
const rawFormData = Object.fromEntries(formData.entries());
```

### 4. Validate and prepare the data

- 유형 검증 및 강제

#### Type validation and coercion

- To handle type validation, you have a few options. While you can manually validate types, using a type validation library can save you time and effort.
- For your example, we'll use [Zod](https://zod.dev/), a TypeScript-first validation library that can simplify this task for you.

```ts
// ...
export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
}
```

#### Storing values in cents

- 일반적으로 JavaScript 부동 소수점 오류를 제거하고 정확성을 높이기 위해 데이터베이스에 금전적 가치를 센트 단위로 저장하는 것이 좋습니다.

#### Creating new dates

- Finally, let's create a new date with the format "YYYY-MM-DD" for the invoice's creation date

### 5. Inserting the data into your database

- Now that you have all the values you need for your database, you can create an SQL query to insert the new invoice into your database and pass in the variables

### 6. Revalidate and redirect

- Next.js has a [Client-side Router Cache](https://nextjs.org/docs/app/building-your-application/caching#router-cache) that stores the route segments in the user's browser for a time. Along with prefetching, this cache ensures that users can quickly navigate between routes while reducing the number of requests made to the server.
- Since you're updating the data displayed in the invoices route, you want to clear this cache and trigger a new request to the server.
- You can do this

```ts
'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

// ...

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

  revalidatePath('/dashboard/invoices');
}
```

- Once the database has been updated, the /dashboard/invoices path will be revalidated, and fresh data will be fetched from the server.

- At this point, you also want to redirect the user back to the /dashboard/invoices page. You can do this with the redirect function from Next.js:

```ts
'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// ...

export async function createInvoice(formData: FormData) {
  // ...

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
```

## Updating an invoice

- 생성과 유사하지만 업데이트할 id를 넘겨야 합니다

- These are the steps you'll take to update an invoice
  - 1. Create a new dynamic route segment with the invoice id.
  - 2. Read the invoice id from the page params.
  - 3. Fetch the specific invoice from your database.
  - 4. Pre-populate the form with the invoice data.
  - 5. Update the invoice data in your database.

### 1. Create a Dynamic Route Segment with the invoice id

- You can create dynamic route segments by wrapping a folder's name in square brackets.
  - e.g. [id], [post] or [slug].

### 2. Read the invoice id from page params

- This form should be pre-populated with a defaultValue for the customer's name, invoice amount, and status.
  - 이 양식은 고객 이름, 송장 금액 및 상태에 대한 defaultValue로 미리 채워져 있어야 합니다.

### 3. Fetch the specific invoice

#### UUIDs vs. Auto-incrementing Keys

We use UUIDs instead of incrementing keys (e.g., 1, 2, 3, etc.). This makes the URL longer; however, UUIDs eliminate the risk of ID collision, are globally unique, and reduce the risk of enumeration attacks - making them ideal for large databases.

However, if you prefer cleaner URLs, you might prefer to use auto-incrementing keys.

### 4. Pass the id to the Server Action

```ts
// /app/lib/actions.ts

// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

// ...

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;

  await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
```

Similarly to the createInvoice action, here you are:

- 1. Extracting the data from formData.
- 2. Validating the types with Zod.
- 3. Converting the amount to cents.
- 4. Passing the variables to your SQL query.
- 5. Calling revalidatePath to clear the client cache and make a new server request.
- 6. Calling redirect to redirect the user to the invoice's page.

#### Note

Using a hidden input field in your form also works (e.g. `<input type="hidden" name="id" value={invoice.id} />`). However, the values will appear as full text in the HTML source, which is not ideal for sensitive data like IDs.

## Deleting an invoice

```ts
// /app/lib/actions.ts

export async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/dashboard/invoices');
}
```

- 이 작업은 /dashboard/invoices 경로에서 호출되므로 리디렉션을 호출할 필요가 없습니다.
- revalidatePath를 호출하면 새 서버 요청이 트리거되고 테이블이 다시 렌더링됩니다.

## Further reading

- 이 장에서는 서버 작업(Server Actions)을 사용하여 데이터를 변경하는 방법을 배웠습니다. 또한 revalidatePath API를 사용하여 Next.js 캐시의 유효성을 다시 검사하고 사용자를 새 페이지로 리디렉션하도록 리디렉션하는 방법도 배웠습니다.

- You can also read more about [security with Server Actions](https://nextjs.org/blog/security-nextjs-server-components-actions) for additional learning.

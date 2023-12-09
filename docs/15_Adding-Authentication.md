# 15. Adding Authentication

- https://nextjs.org/learn/dashboard-app/adding-authentication

## In this chapter

- What is authentication
- How to add authentication to your app using NextAuth.js
- How to use Middleware to redirect users and protect your routes
- How to use React's `useFormStatus` and `useFormState` to handle pending states and form errors

## What is authentication?

- Authentication is a key part of many web applications today. It's how a system checks if the user is who they say they are.
- A secure website often uses multiple ways to check a user's identity. For instance, after entering your username and password, the site may send a verification code to your device or use an external app like Google Authenticator. This 2-factor authentication (2FA) helps increase security. Even if someone learns your password, they can't access your account without your unique token.

### Authentication vs. Authorization

- In web development, authentication and authorization serve different roles:
  - Authentication is about making sure the user is who they say they are. You're proving your identity with something you have like a username and password.
  - Authorization is the next step. Once a user's identity is confirmed, authorization decides what parts of the application they are allowed to use.

## Creating the login route

- You'll notice the page imports `<LoginForm />`, which you'll update later in the chapter.

## NextAuth.js

- https://authjs.dev/reference/nextjs
- NextAuth.js abstracts away much of the complexity involved in managing sessions, sign-in and sign-out, and other aspects of authentication.
  - NextAuth.js는 세션 관리, 로그인 및 로그아웃, 기타 인증 측면과 관련된 많은 복잡성을 추상화합니다.
- 이러한 기능을 수동으로 구현할 수도 있지만 이 프로세스는 시간이 많이 걸리고 오류가 발생하기 쉽습니다.
- NextAuth.js는 Next.js 애플리케이션의 인증을 위한 통합 솔루션을 제공하여 프로세스를 단순화합니다.

## Setting up NextAuth.js

```bash
npm install next-auth
```

다음으로 애플리케이션에 대한 비밀 키를 생성합니다. 이 키는 쿠키를 암호화하여 사용자 세션의 보안을 보장하는 데 사용됩니다. 터미널에서 다음 명령을 실행하면 됩니다.

```bash
openssl rand -base64 32
```

- gQLUMT3nPow++15h8aXczc2/8frU4JlV4PvexUMrzVk=

Then, in your .env file, add your generated key to the `AUTH_SECRET` variable

- For auth to work in production, you'll need to update your environment variables in your Vercel project too. Check out this guide on how to add environment variables on Vercel.

## Adding the pages option

Create an auth.config.ts file at the root of our project that exports an authConfig object. This object will contain the configuration options for NextAuth.js.

```ts
import type { NextAuthConfig } from 'next-auth'; // 현 시점 기준 next-auth 베타버전(^5.0.0)에만 존재

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
```

- You can use the pages option to specify the route for custom sign-in, sign-out, and error pages.
  - 이는 필수는 아니지만 페이지 옵션에 signIn: '/login'을 추가하면 사용자는 NextAuth.js 기본 페이지가 아닌 사용자 정의 로그인 페이지로 리디렉션됩니다.

## Protecting your routes with Next.js Middleware

```ts
// /auth.config.ts

import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
```

- The authorized callback is used to verify if the request is authorized to access a page via Next.js Middleware.
- It is called before a request is completed, and it receives an object with the auth and request properties.
  - The auth property contains the user's session,
  - and the request property contains the incoming request.
- The providers option is an array where you list different login options.

  - You'll learn more about it in the [Adding the Credentials provider](https://nextjs.org/learn/dashboard-app/adding-authentication#adding-the-credentials-provider) section.

- Next, you will need to import the `authConfig` object into a Middleware file. In the root of your project, create a file called `middleware.ts` and paste the following code:

```ts
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
```

- You're also using the matcher option from Middleware to specify that it should run on specific paths.
- 이 작업에 미들웨어를 사용하면 미들웨어가 인증을 확인할 때까지 보호된 경로가 렌더링을 시작하지 않아 애플리케이션의 보안과 성능이 모두 향상된다는 이점이 있습니다.

## Password hashing

- You will need to create a separate file for the bcrypt package. This is because bcrypt relies on Node.js APIs not available in Next.js Middleware.

## Adding the Credentials provider

```ts
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [Credentials({})],
});
```

- Credentials provider를 사용하면 사용자가 사용자 이름과 비밀번호를 사용하여 로그인할 수 있습니다.

#### Good to know

- Although we're using the Credentials provider, it's generally recommended to use alternative providers such as [OAuth](https://authjs.dev/getting-started/providers/oauth-tutorial) or [email](https://authjs.dev/getting-started/providers/email-tutorial) providers. See the [NextAuth.js docs](https://authjs.dev/getting-started/providers) for a full list of options.

## Adding the sign in functionality

```ts
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      // You can use the authorize function to handle the authentication logic.
      async authorize(credentials) {
        // Similarly to Server Actions, you can use zod to validate the email and password before checking if the user exists in the database
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            return user;
          }
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
```

## Updating the login form

- Now you need to connect the auth logic with your login form.
- NextAuth errors : https://authjs.dev/reference/core/errors/
- Finally, in your login-form.tsx component, you can use React's useFormState to call the server action and handle form errors
  and use useFormStatus to handle the pending state of the form:

## Adding the logout functionality

- To add the logout functionality to `<SideNav />`, call the signOut function from auth.ts in your `<form>` element

## Try it out

- Now, try it out. You should be able to log in and out of your application using the following credentials:

Email: user@nextmail.com
Password: 123456

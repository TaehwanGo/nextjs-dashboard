# 15. Adding Authentication

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

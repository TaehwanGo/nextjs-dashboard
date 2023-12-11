import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import { Metadata } from 'next';
import SignUpForm from '../ui/signup-form';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sign Up',
};

export default function SignUpPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <Link
          href="/"
          className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36"
        >
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </Link>
        <SignUpForm />
      </div>
    </main>
  );
}
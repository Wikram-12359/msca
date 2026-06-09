"use client";
import { LoginForm } from '@/components/login-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';


export default function Page() {


  return (
    <div className='flex min-h-[80vh] md:min-h-auto w-full md:items-center justify-center p-6 md:p-10 mt-12 md:mt-0'>
      <div className='w-full max-w-sm'>
        <Link href='/' className='md:flex hidden  items-center gap-2 self-center font-medium mb-4'>
          <Image src='/images/logo.jpeg' alt='Logo' width={40} height={40} />
          MindSpark Coaching Academy
        </Link>
        <div className='flex flex-col gap-6'>
          <Card>
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

'use client';
import { SignupForm } from '@/components/signup-form';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FieldDescription } from '@/components/ui/field';
import Link from 'next/link';


const Register = () => {

  return (
    <div className='flex min-h-[80vh] md:min-h-auto flex-col md:items-center md:justify-center gap-6  p-6 md:p-10 mt-12 md:mt-0'>
      <div className='flex w-full max-w-sm flex-col gap-6'>
        <Link href='/' className='md:flex hidden items-center gap-2 self-center font-medium'>
          <Image src='/images/logo.jpeg' alt='Logo' width={40} height={40} />
          MindSpark Coaching Academy
        </Link>
        <div className='flex flex-col gap-6'>
          <Card>
            <CardHeader className='text-center'>
              <CardTitle className='text-xl'>Create your account</CardTitle>
              <CardDescription>
                Enter your email below to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignupForm/>
            </CardContent>
          </Card>
          <FieldDescription className='px-6 text-center'>
            By clicking continue, you agree to our{' '}
            <a href='#'>Terms of Service</a> and <a href='#'>Privacy Policy</a>.
          </FieldDescription>
        </div>
      </div>
    </div>
  );
};

export default Register;

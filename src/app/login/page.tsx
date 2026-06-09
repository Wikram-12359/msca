"use client";
import { LoginForm } from '@/components/login-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';


export default function Page() {
  
  const router = useRouter();

  const handleLogin = async (data: { email: string; password: string }) => {
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (!res?.ok) {
      toast.error("Invalid credentials");
      return;
    }

    toast.success("Login successful");
    router.push("/dashboard");
  };


  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <Link href='/' className='flex items-center gap-2 self-center font-medium mb-4'>
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
              <LoginForm onSubmit={handleLogin}   />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

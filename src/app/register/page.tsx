'use client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import api from '@/lib/axios';
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

type IRegister = { name: string; email: string; password: string };

async function registerUser(data: IRegister): Promise<{ message: string }> {
  const response = await api.post('/auth/register', data);

  return response.data;
}

const Register = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: registerUser,

    onSuccess: (data) => {
      toast.success(data.message || 'Account created successfully');
      router.push('/login');
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Registration failed');
    },
  });


  return (
    <div className='flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10'>
      <div className='flex w-full max-w-sm flex-col gap-6'>
        <Link href='/' className='flex items-center gap-2 self-center font-medium'>
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
              <SignupForm
                isLoading={mutation.isPending}
                onSubmit={(data) => mutation.mutate(data)}
              />
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

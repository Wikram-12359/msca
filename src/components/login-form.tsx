"use client"
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

type Props = {
  onSubmit: (data: { email: string; password: string }) => void;
  isLoading?: boolean;
};

export function LoginForm({onSubmit}: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true);
      await onSubmit({ email, password });
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor='email'>Email</FieldLabel>
          <Input autoFocus={true} value={email} onChange={(e) => setEmail(e.target.value)} id='email' type='email' placeholder='m@example.com' required />
        </Field>
        <Field>
          <div className='flex items-center'>
            <FieldLabel htmlFor='password'>Password</FieldLabel>
            <a
              href='#'
              className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
            >
              Forgot your password?
            </a>
          </div>
          <Input autoComplete='off' value={password} onChange={(e) => setPassword(e.target.value)} id='password' type='password' required />
        </Field>
        <Field>
          <Button type='submit' disabled={isLoading}>
            Login
          </Button>
          <FieldDescription className='text-center'>
            Don&apos;t have an account? <Link href='/register'>Sign up</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}

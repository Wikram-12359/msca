import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';

type Props = {
  onSubmit: (data: { name: string; email: string; password: string }) => void;
  isLoading?: boolean;
};

export function SignupForm({ onSubmit, isLoading }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    onSubmit({ name, email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor='name'>Full Name</FieldLabel>
          <Input autoFocus={true} value={name} onChange={(e) => setName(e.target.value)} id='name' type='text' placeholder='John Doe' required />
        </Field>
        <Field>
          <FieldLabel htmlFor='email'>Email</FieldLabel>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} id='email' type='email' placeholder='m@example.com' required />
        </Field>
        <Field>
          <Field className='grid grid-cols-2 gap-4'>
            <Field>
              <FieldLabel htmlFor='password'>Password</FieldLabel>
              <Input
                autoComplete='off'
                value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder='********'
                id='password'
                type='password'
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor='confirm-password'>
                Confirm Password
              </FieldLabel>
              <Input
                autoComplete='off'
                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='********'
                id='confirm-password'
                type='password'
                required
              />
            </Field>
          </Field>
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
        </Field>
        <Field>
          <Button disabled={isLoading} type='submit'>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
          <FieldDescription className='text-center'>
            Already have an account? <Link href='/login'>Sign in</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}

"use client"
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';


export function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setisLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setisLoading(true)
    const { error } = await authClient.signUp.email({
      email,
      password,
      name,
      phone
    }as any);

    setisLoading(false)
    if (error) return toast.error(error.message || "errorrrrrrrr")

    toast.message("Check your inbox for a new verification link.");
    
    return router.replace("/dashboard")
  }

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
          <FieldLabel htmlFor='phone'>Phone Number</FieldLabel>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} id='phone' type='text' placeholder='+92xxxxxxxxx' required maxLength={13} />
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

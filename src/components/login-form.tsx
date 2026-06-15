"use client"
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { ForgotPasswordModal } from "@/components/ForgotPasswordModal";


export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [forgotOpen, setForgotOpen] = useState(false);

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true)
    if (!email || !password) {
      setIsLoading(false)
      toast.error('Please fill in all fields');
      return;
    }
    
    const {data, error} = await authClient.signIn.email({
      email,
      password
    })

    setIsLoading(false)

    if (error?.code === "EMAIL_NOT_VERIFIED") {
      await authClient.sendVerificationEmail({
        email,
        callbackURL: "/verify-email",
      });
      toast.message("Check your inbox for a new verification link.");
    }

    if (error) return toast.error(error.message ?? "Login failed")
    console.log(data);

    if(data?.user?.role =="admin"){
      return router.replace("/admin/dashboard")
    }else if(data?.user?.role == "teacher"){
      return router.replace("/teacher")
    }else{
      return router.replace("/dashboard")
    }

  };



  return (
    <>
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor='email'>Email</FieldLabel>
          <Input autoFocus={true} value={email} onChange={(e) => setEmail(e.target.value)} id='email' type='email' placeholder='m@example.com' required />
        </Field>
        <Field>
          <div className='flex items-center'>
            <FieldLabel htmlFor='password'>Password</FieldLabel>
            <button
              type="button"
              onClick={() => setForgotOpen(true)}
              className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </button>
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
      <ForgotPasswordModal open={forgotOpen} onOpenChange={setForgotOpen} />
    </>
  );
  
}

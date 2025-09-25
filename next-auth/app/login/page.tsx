'use client';

import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    console.log(data);

    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (!result?.error) {
      toast.success('Login Successful');
      router.push('/users');
    } else {
      toast.error('Invalid Credentials');
    }
  };

  return (
    <section className="bg-neutral-900 text-white min-h-screen">
      <div className="max-w-sm m-auto pt-28">
        <h1 className="text-3xl mb-8 text-center">Sign in</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="Email"
              className="placeholder:text-white border border-gray-600 px-4 py-2 rounded-sm"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}

            <input
              type="password"
              placeholder="Password"
              className="placeholder:text-white border border-gray-600 px-4 py-2 rounded-sm"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}

            <Button className="cursor-pointer" disabled={isSubmitting}>
              {isSubmitting ? 'Signing In' : 'Sign In'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;

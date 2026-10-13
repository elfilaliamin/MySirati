import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Mail, User } from 'lucide-react';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';

import type { RegisterFormData } from './auth.schemas';
import { registerSchema } from './auth.schemas';
import { Button, Input } from '../../components/ui';

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
}

export const RegisterForm: FC<RegisterFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Full Name"
        placeholder="Alex Mercer"
        leftIcon={<User className="h-4 w-4" />}
        error={errors.fullName?.message}
        {...register('fullName')}
      />
      <Input
        label="Email address"
        type="email"
        placeholder="you@example.com"
        leftIcon={<Mail className="h-4 w-4" />}
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        label="Password"
        type="password"
        placeholder="At least 8 chars, 1 uppercase, 1 number"
        leftIcon={<Lock className="h-4 w-4" />}
        error={errors.password?.message}
        helperText="At least 8 characters, one uppercase letter, and one number"
        {...register('password')}
      />
      <Button type="submit" className="w-full" isLoading={isSubmitting}>
        Create account
      </Button>
    </form>
  );
};

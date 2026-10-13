import { Sparkles } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from './auth.context';
import type { LoginFormData } from './auth.schemas';
import { LoginForm } from './LoginForm';
import { Card, CardDescription, CardHeader, CardTitle } from '../../components/ui';

const LoginHeader: FC = () => (
  <CardHeader className="text-center">
    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-md">
      <Sparkles className="h-6 w-6" />
    </div>
    <CardTitle>Welcome back to MySirati</CardTitle>
    <CardDescription>Sign in to manage your career profile and AI share links</CardDescription>
  </CardHeader>
);

export const LoginPage: FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (data: LoginFormData) => {
    try {
      setErrorMsg(null);
      await login(data);
      navigate('/dashboard');
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Invalid email or password');
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border border-border">
        <LoginHeader />
        {errorMsg && (
          <div className="mb-4 rounded-xl bg-danger/10 border border-danger/20 p-3 text-xs text-danger">
            {errorMsg}
          </div>
        )}
        <LoginForm onSubmit={handleSubmit} />
        <div className="mt-6 text-center text-xs text-text-muted">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-semibold text-primary hover:underline">
            Create account
          </Link>
        </div>
      </Card>
    </div>
  );
};

import { Sparkles } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from './auth.context';
import type { RegisterFormData } from './auth.schemas';
import { RegisterForm } from './RegisterForm';
import { Card, CardDescription, CardHeader, CardTitle } from '../../components/ui';

export const RegisterPage: FC = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (data: RegisterFormData) => {
    try {
      setErrorMsg(null);
      await registerUser(data);
      navigate('/dashboard');
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Registration failed');
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border border-border">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-md">
            <Sparkles className="h-6 w-6" />
          </div>
          <CardTitle>Create your MySirati account</CardTitle>
          <CardDescription>Start curating your AI-ready professional career data</CardDescription>
        </CardHeader>

        {errorMsg && (
          <div className="mb-4 rounded-xl bg-danger/10 border border-danger/20 p-3 text-xs text-danger">
            {errorMsg}
          </div>
        )}

        <RegisterForm onSubmit={handleSubmit} />

        <div className="mt-6 text-center text-xs text-text-muted">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
};

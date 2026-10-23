import type { FC } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from './auth.context';
import type { RegisterFormData } from './auth.schemas';
import { RegisterForm } from './RegisterForm';
import { Card, CardDescription, CardHeader, CardTitle, MySiratiIcon } from '../../components/ui';

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
    <div className="relative flex min-h-[80vh] items-center justify-center p-4">
      {/* Subtle Ambient Radial Glow */}
      <div
        className="pointer-events-none absolute h-72 w-72 bg-primary/10 blur-3xl rounded-full -z-10"
        aria-hidden="true"
      />

      <Card className="w-full max-w-md p-6 sm:p-8 shadow-modal border border-border/80 card-specular">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex items-center justify-center">
            <MySiratiIcon size={48} className="shadow-lg rounded-xl" />
          </div>
          <CardTitle>Create your MySirati account</CardTitle>
          <CardDescription>Start curating your AI-ready professional career data</CardDescription>
        </CardHeader>

        {errorMsg && (
          <div className="mb-5 rounded-xl bg-danger/10 border border-danger/20 p-3.5 text-xs font-medium text-danger">
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

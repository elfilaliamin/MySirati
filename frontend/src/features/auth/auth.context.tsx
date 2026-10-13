import { useQuery } from '@tanstack/react-query';
import { createContext, useContext } from 'react';
import type { FC, ReactNode } from 'react';

import type { AuthMeResponse, LoginPayload, RegisterPayload, User } from './auth.types';
import { useAuthMutations } from './useAuthMutations';
import { apiClient } from '../../lib/api-client';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { data, isLoading } = useQuery<AuthMeResponse>({
    queryKey: ['auth', 'me'],
    queryFn: () => apiClient<AuthMeResponse>('/api/auth/me'),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const { loginMutation, registerMutation, logoutMutation } = useAuthMutations();

  return (
    <AuthContext.Provider
      value={{
        user: data?.user ?? null,
        isLoading,
        login: async (p) => { await loginMutation.mutateAsync(p); },
        register: async (p) => { await registerMutation.mutateAsync(p); },
        logout: async () => { await logoutMutation.mutateAsync(); },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

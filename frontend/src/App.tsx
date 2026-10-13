import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { FC } from 'react';

import { ToastProvider } from './components/ui';
import { AuthProvider } from './features/auth/auth.context';
import { I18nProvider } from './i18n/i18n.context';
import { AppRoutes } from './routes/AppRoutes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export const App: FC = () => (
  <QueryClientProvider client={queryClient}>
    <I18nProvider>
      <ToastProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ToastProvider>
    </I18nProvider>
  </QueryClientProvider>
);

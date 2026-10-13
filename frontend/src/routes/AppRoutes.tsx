import type { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { renderAuthenticatedRoutes } from './AuthenticatedRoutes';
import { renderPublicRoutes } from './PublicRoutes';
import { AppLayout } from '../layouts/AppLayout';

export const AppRoutes: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<AppLayout />}>
        {renderPublicRoutes()}
        {renderAuthenticatedRoutes()}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

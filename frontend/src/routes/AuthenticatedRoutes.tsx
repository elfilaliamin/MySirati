import { Route } from 'react-router-dom';

import { AdminRoute, ProtectedRoute } from './ProtectedRoute';
import { AdminAuditLogPage } from '../features/admin/AdminAuditLogPage';
import { AdminOverviewPage } from '../features/admin/AdminOverviewPage';
import { AdminUserDetailPage } from '../features/admin/AdminUserDetailPage';
import { AdminUsersPage } from '../features/admin/AdminUsersPage';
import { DashboardPage } from '../features/dashboard/DashboardPage';
import { ProfilePage } from '../features/profile/ProfilePage';
import { EducationPage } from '../features/sections/EducationPage';
import { ExperiencesPage } from '../features/sections/ExperiencesPage';
import { LanguagesPage } from '../features/sections/LanguagesPage';
import { ProjectsPage } from '../features/sections/ProjectsPage';
import { SkillsPage } from '../features/sections/SkillsPage';
import { SettingsPage } from '../features/settings/SettingsPage';
import { ShareLinkBuilderPage } from '../features/share-links/ShareLinkBuilderPage';
import { ShareLinksPage } from '../features/share-links/ShareLinksPage';

const ROUTES = [
  { path: '/dashboard', Component: DashboardPage },
  { path: '/profile', Component: ProfilePage },
  { path: '/education', Component: EducationPage },
  { path: '/experiences', Component: ExperiencesPage },
  { path: '/projects', Component: ProjectsPage },
  { path: '/skills', Component: SkillsPage },
  { path: '/languages', Component: LanguagesPage },
  { path: '/settings', Component: SettingsPage },
  { path: '/share', Component: ShareLinksPage },
  { path: '/share/new', Component: ShareLinkBuilderPage },
  { path: '/share/:id/edit', Component: ShareLinkBuilderPage },
];

const ADMIN_ROUTES = [
  { path: '/admin', Component: AdminOverviewPage },
  { path: '/admin/users', Component: AdminUsersPage },
  { path: '/admin/users/:id', Component: AdminUserDetailPage },
  { path: '/admin/audit-log', Component: AdminAuditLogPage },
];

export const renderAuthenticatedRoutes = () => (
  <>
    {ROUTES.map(({ path, Component }) => (
      <Route
        key={path}
        path={path}
        element={
          <ProtectedRoute>
            <Component />
          </ProtectedRoute>
        }
      />
    ))}
    {ADMIN_ROUTES.map(({ path, Component }) => (
      <Route
        key={path}
        path={path}
        element={
          <AdminRoute>
            <Component />
          </AdminRoute>
        }
      />
    ))}
  </>
);

import { FileText, LayoutDashboard, Shield, Users } from 'lucide-react';
import type { FC } from 'react';
import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/users', label: 'Users', icon: Users, end: false },
  { to: '/admin/audit-log', label: 'Audit Log', icon: FileText, end: false },
];

export const AdminNav: FC = () => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-border">
    <div className="flex items-center gap-3.5">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white shadow-sm shadow-primary/30">
        <Shield className="h-6 w-6" />
      </div>
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-text">Administration Portal</h1>
        <p className="text-xs sm:text-sm text-text-muted mt-0.5">Moderation, audit logs, and account lifecycle management.</p>
      </div>
    </div>
    <nav className="flex items-center gap-1.5 p-1 bg-surface-muted rounded-xl border border-border shadow-subtle">
      {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 ${
              isActive
                ? 'bg-surface-raised text-primary shadow-subtle border border-border/80 card-specular'
                : 'text-text-muted hover:text-text'
            }`
          }
        >
          <Icon className="h-3.5 w-3.5" />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  </div>
);

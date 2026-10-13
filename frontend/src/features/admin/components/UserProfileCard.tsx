import { Briefcase, Code, GraduationCap, Languages, Link2, User } from 'lucide-react';
import type { FC } from 'react';

import { Card, CardHeader, CardTitle } from '../../../components/ui';
import type { AdminUserDetail } from '../admin.types';

interface ProfileCardProps {
  detail: AdminUserDetail;
}

export const UserProfileCard: FC<ProfileCardProps> = ({ detail }) => {
  const { profile, counts } = detail;

  const countItems = [
    { label: 'Education', value: counts.education, icon: GraduationCap },
    { label: 'Experiences', value: counts.experiences, icon: Briefcase },
    { label: 'Projects', value: counts.projects, icon: Code },
    { label: 'Skills', value: counts.skills, icon: User },
    { label: 'Languages', value: counts.languages, icon: Languages },
    { label: 'Share Links', value: counts.shareLinks, icon: Link2 },
  ];

  return (
    <Card className="p-4 space-y-4">
      <CardHeader>
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <User className="h-4 w-4 text-primary" />
          <span>Profile Information & Section Counts</span>
        </CardTitle>
      </CardHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
        <div>
          <span className="text-text-muted">Full Name:</span>
          <p className="font-semibold text-text">{profile?.fullName || 'Not provided'}</p>
        </div>
        <div>
          <span className="text-text-muted">Headline:</span>
          <p className="font-semibold text-text">{profile?.headline || 'Not provided'}</p>
        </div>
        <div>
          <span className="text-text-muted">Location:</span>
          <p className="font-semibold text-text">{profile?.location || 'Not provided'}</p>
        </div>
      </div>

      <div className="pt-2 border-t border-border">
        <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
          Section Item Counts
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {countItems.map(({ label, value, icon: Icon }) => (
            <div key={label} className="p-2.5 rounded-xl border border-border bg-surface-muted/50 text-center">
              <Icon className="h-4 w-4 mx-auto text-primary mb-1" />
              <p className="text-base font-bold text-text">{value}</p>
              <p className="text-[11px] text-text-muted">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

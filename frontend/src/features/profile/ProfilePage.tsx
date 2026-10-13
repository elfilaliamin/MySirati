import { Loader2, User } from 'lucide-react';
import type { FC } from 'react';

import { ProfileForm } from './ProfileForm';
import { useProfile } from './useProfile';
import { Card, CardDescription, CardHeader, CardTitle } from '../../components/ui';

export const ProfilePage: FC = () => {
  const { profile, isLoading, updateProfile, isUpdating } = useProfile();

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white shadow-sm">
          <User className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text">Profile Basics</h1>
          <p className="text-xs sm:text-sm text-text-muted">
            Manage your personal details, contact information, and public links.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            This data forms the canonical &quot;basics&quot; section in your JSON Resume.
          </CardDescription>
        </CardHeader>
        <ProfileForm
          profile={profile}
          onSave={async (d) => { await updateProfile(d); }}
          isSaving={isUpdating}
        />
      </Card>
    </div>
  );
};

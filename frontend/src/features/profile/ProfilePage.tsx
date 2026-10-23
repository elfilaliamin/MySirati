import { User } from 'lucide-react';
import type { FC } from 'react';

import { ProfileForm } from './ProfileForm';
import { useProfile } from './useProfile';
import { Card, CardDescription, CardHeader, CardTitle, Skeleton } from '../../components/ui';

const ProfileSkeleton: FC = () => (
  <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
    <div className="flex items-center gap-3.5">
      <Skeleton className="h-11 w-11 rounded-2xl" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-48 rounded" />
        <Skeleton className="h-3.5 w-80 rounded" />
      </div>
    </div>
    <Card className="p-6 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Skeleton className="h-10 w-full rounded-xl" />
        <Skeleton className="h-10 w-full rounded-xl" />
        <Skeleton className="h-10 w-full rounded-xl" />
        <Skeleton className="h-10 w-full rounded-xl" />
      </div>
      <Skeleton className="h-24 w-full rounded-xl" />
      <div className="flex justify-end pt-2">
        <Skeleton className="h-10 w-32 rounded-xl" />
      </div>
    </Card>
  </div>
);

export const ProfilePage: FC = () => {
  const { profile, isLoading, updateProfile, isUpdating } = useProfile();

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (!profile) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3.5">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white shadow-sm shadow-primary/30">
          <User className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text">Profile Basics</h1>
          <p className="text-xs sm:text-sm text-text-muted mt-0.5">
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

import type { FC } from 'react';
import { useState } from 'react';

import { Button, Input } from '../../components/ui';
import { LinksEditor } from '../sections/components/LinksEditor';
import type { Profile, ResourceLink } from '../sections/sections.types';

interface ProfileFormProps {
  profile: Profile;
  onSave: (data: Partial<Profile>) => Promise<void>;
  isSaving: boolean;
}

export const ProfileForm: FC<ProfileFormProps> = ({ profile, onSave, isSaving }) => {
  const [fullName, setFullName] = useState(profile.fullName || '');
  const [headline, setHeadline] = useState(profile.headline || '');
  const [summary, setSummary] = useState(profile.summary || '');
  const [location, setLocation] = useState(profile.location || '');
  const [phone, setPhone] = useState(profile.phone || '');
  const [websiteUrl, setWebsiteUrl] = useState(profile.websiteUrl || '');
  const [links, setLinks] = useState<ResourceLink[]>(profile.links || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ fullName, headline, summary, location, phone, websiteUrl, links });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Full Name"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Input
          label="Professional Headline"
          placeholder="e.g. Lead Cloud Architect"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5 text-left w-full">
        <label className="text-xs font-semibold text-text">Career Summary / Bio</label>
        <textarea
          rows={4}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Summarize your professional background..."
          className="w-full rounded-xl border border-border bg-surface-raised px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Input label="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        <Input label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <Input label="Website" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} />
      </div>

      <LinksEditor links={links} onChange={setLinks} />

      <div className="flex justify-end pt-4 border-t border-border">
        <Button type="submit" isLoading={isSaving}>Save Changes</Button>
      </div>
    </form>
  );
};

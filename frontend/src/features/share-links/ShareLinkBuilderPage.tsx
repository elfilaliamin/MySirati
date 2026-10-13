import { ArrowLeft } from 'lucide-react';
import type { FC, FormEvent } from 'react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { BuilderForm } from './components/BuilderForm';
import { JsonPreview } from './components/JsonPreview';
import { KeyRevealModal } from './components/KeyRevealModal';
import { useBuilderState } from './useBuilderState';
import { useShareLink, useShareLinks } from './useShareLinks';
import { Button } from '../../components/ui';

export const ShareLinkBuilderPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: linkData } = useShareLink(id);
  const { createLink, updateLink, isCreating, isUpdating } = useShareLinks();
  const state = useBuilderState(linkData?.link);

  const [revealedKey, setRevealedKey] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const expiryDate =
      state.expiry === 'never'
        ? null
        : new Date(Date.now() + Number(state.expiry) * 86400000).toISOString();

    if (id) {
      await updateLink({ id, data: { name: state.name, include: state.include, expiresAt: expiryDate } });
      navigate('/share');
      return;
    }

    const res = await createLink({ name: state.name, include: state.include, expiresAt: expiryDate });
    if (res?.key) setRevealedKey(res.key);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/share">
          <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="h-4 w-4" />}>Back to Links</Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-text">
          {id ? 'Edit Share Link' : 'Create AI Share Link'}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <BuilderForm state={state} onSubmit={handleSubmit} isLoading={isCreating || isUpdating} isEditing={Boolean(id)} />
        <div className="sticky top-20">
          <JsonPreview data={state.previewData} isLoading={state.isPreviewLoading} />
        </div>
      </div>

      {revealedKey && (
        <KeyRevealModal
          isOpen={Boolean(revealedKey)}
          onClose={() => {
            setRevealedKey(null);
            navigate('/share');
          }}
          rawKey={revealedKey}
        />
      )}
    </div>
  );
};

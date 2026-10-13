import { useEffect, useState } from 'react';

import type { ShareLink, ShareLinkIncludeOptions } from './share-links.types';
import { apiClient } from '../../lib/api-client';

const DEFAULT_INCLUDE: ShareLinkIncludeOptions = {
  basics: true,
  email: false,
  phone: false,
  itemLinks: true,
  education: true,
  experiences: true,
  projects: true,
  skills: true,
  languages: true,
};

export const useBuilderState = (initialLink?: ShareLink | null) => {
  const [name, setName] = useState(initialLink?.name || '');
  const [include, setInclude] = useState<ShareLinkIncludeOptions>(
    initialLink?.include || DEFAULT_INCLUDE
  );
  const [expiry, setExpiry] = useState('30');
  const [previewData, setPreviewData] = useState<unknown>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  const updateInclude = (patch: Partial<ShareLinkIncludeOptions>) => {
    setInclude((prev) => ({ ...prev, ...patch }));
  };

  useEffect(() => {
    let active = true;
    const fetchPreview = async () => {
      try {
        setIsPreviewLoading(true);
        const res = await apiClient<unknown>('/api/share-links/preview', {
          method: 'POST',
          data: { include },
        });
        if (active) setPreviewData(res);
      } catch {
        // Fallback silently if preview query fails
      } finally {
        if (active) setIsPreviewLoading(false);
      }
    };

    const timer = setTimeout(fetchPreview, 250);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [include]);

  return {
    name,
    setName,
    include,
    updateInclude,
    expiry,
    setExpiry,
    previewData,
    isPreviewLoading,
  };
};

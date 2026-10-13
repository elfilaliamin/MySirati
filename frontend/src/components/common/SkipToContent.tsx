import type { FC } from 'react';

import { useI18n } from '../../i18n/i18n.context';

export const SkipToContent: FC = () => {
  const { t } = useI18n();

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-xl focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 font-medium text-xs transition-all"
    >
      {t.common.skipToContent}
    </a>
  );
};

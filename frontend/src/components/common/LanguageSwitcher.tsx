import { Globe } from 'lucide-react';
import type { FC } from 'react';

import { useI18n } from '../../i18n/i18n.context';
import type { SupportedLocale } from '../../i18n/i18n.types';

const LANGUAGES: Array<{ code: SupportedLocale; label: string }> = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'ar', label: 'العربية' },
];

export const LanguageSwitcher: FC = () => {
  const { locale, setLocale } = useI18n();

  return (
    <div
      className="flex items-center gap-1 rounded-xl border border-border bg-surface-muted/50 p-1 text-xs"
      role="group"
      aria-label="Language selection"
    >
      <Globe className="h-3.5 w-3.5 text-text-muted mx-1 shrink-0" aria-hidden="true" />
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          aria-pressed={locale === code}
          className={`px-2 py-0.5 rounded-lg font-medium transition-colors ${
            locale === code
              ? 'bg-surface text-primary shadow-xs border border-border'
              : 'text-text-muted hover:text-text'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

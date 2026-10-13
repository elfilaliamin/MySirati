import type { FC, ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import type { SupportedLocale, TranslationDictionary } from './i18n.types';
import { ar } from './locales/ar';
import { en } from './locales/en';
import { fr } from './locales/fr';

const DICTIONARIES: Record<SupportedLocale, TranslationDictionary> = { en, fr, ar };
const LOCALE_STORAGE_KEY = 'mysirati_locale';

interface I18nContextValue {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  t: TranslationDictionary;
  isRtl: boolean;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export const I18nProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<SupportedLocale>(() => {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
    return saved === 'fr' || saved === 'ar' || saved === 'en' ? saved : 'en';
  });

  const setLocale = (newLocale: SupportedLocale) => {
    setLocaleState(newLocale);
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
  };

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  const value: I18nContextValue = {
    locale,
    setLocale,
    t: DICTIONARIES[locale],
    isRtl: locale === 'ar',
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = (): I18nContextValue => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

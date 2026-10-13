import type { FC, ReactNode } from 'react';
import { createContext, useContext, useEffect } from 'react';

import type { SupportedLocale, TranslationDictionary } from './i18n.types';
import { en } from './locales/en';

const LOCALE_STORAGE_KEY = 'mysirati_locale';

interface I18nContextValue {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  t: TranslationDictionary;
  isRtl: boolean;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export const I18nProvider: FC<{ children: ReactNode }> = ({ children }) => {
  useEffect(() => {
    localStorage.removeItem(LOCALE_STORAGE_KEY);
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
  }, []);

  const value: I18nContextValue = {
    locale: 'en',
    setLocale: () => {},
    t: en,
    isRtl: false,
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

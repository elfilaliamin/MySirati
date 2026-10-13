export type SupportedLocale = 'en';

export interface TranslationDictionary {
  readonly nav: {
    readonly dashboard: string;
    readonly profile: string;
    readonly education: string;
    readonly experiences: string;
    readonly projects: string;
    readonly skills: string;
    readonly languages: string;
    readonly shareLinks: string;
    readonly settings: string;
    readonly admin: string;
    readonly privacy: string;
    readonly signOut: string;
    readonly signIn: string;
    readonly getStarted: string;
  };
  readonly common: {
    readonly save: string;
    readonly cancel: string;
    readonly delete: string;
    readonly edit: string;
    readonly create: string;
    readonly back: string;
    readonly search: string;
    readonly actions: string;
    readonly status: string;
    readonly active: string;
    readonly suspended: string;
    readonly loading: string;
    readonly skipToContent: string;
  };
  readonly hero: {
    readonly badge: string;
    readonly titlePre: string;
    readonly titleHighlight: string;
    readonly subtitle: string;
    readonly ctaPrimary: string;
    readonly ctaSecondary: string;
  };
}

// lib/i18n-config.ts
export const i18n = {
  locales: ["de", "en"],
  defaultLocale: "de",
};

export type Locale = (typeof i18n)["locales"][number];

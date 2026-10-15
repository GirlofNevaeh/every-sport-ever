import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export const LOCALES = [
  { id: "en", native: "English" },
  { id: "en-US", native: "American English" },
  { id: "gd", native: "Gàidhlig" },
  { id: "cy", native: "Cymraeg" },
  { id: "ga", native: "Gaeilge" },
  { id: "fr", native: "Français" },
  { id: "it", native: "Italiano" },
  { id: "es", native: "Español" },
  { id: "de", native: "Deutsch" },
  { id: "ru", native: "Русский" },
] as const;

export type LocaleId = (typeof LOCALES)[number]["id"];

const STORAGE_KEY = "ese-lang";

type Pack = Record<string, string>;

const cache: Partial<Record<LocaleId, Pack>> = { en: {} };

const loaders: Record<Exclude<LocaleId, "en">, () => Promise<{ default: Pack }>> = {
  "en-US": () => import("./packs/en-US.json"),
  gd: () => import("./packs/gd.json"),
  cy: () => import("./packs/cy.json"),
  ga: () => import("./packs/ga.json"),
  fr: () => import("./packs/fr.json"),
  it: () => import("./packs/it.json"),
  es: () => import("./packs/es.json"),
  de: () => import("./packs/de.json"),
  ru: () => import("./packs/ru.json"),
};

function isLocale(value: string | null): value is LocaleId {
  return LOCALES.some((item) => item.id === value);
}

export function translate(pack: Pack, locale: LocaleId, text: string) {
  if (!text || locale === "en") return text;
  const next = pack[text];
  return next && next.trim() ? next : text;
}

export function fill(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ""));
}

type I18n = {
  locale: LocaleId;
  setLocale: (locale: LocaleId) => void;
  t: (text: string) => string;
  tf: (template: string, vars: Record<string, string | number>) => string;
};

const LocaleContext = createContext<I18n | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<LocaleId>("en");
  const [booted, setBooted] = useState(false);
  const [pack, setPack] = useState<Pack>({});

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(saved)) setLocale(saved);
    setBooted(true);
  }, []);

  useEffect(() => {
    if (!booted) return;
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
    let cancel = false;
    if (locale === "en") {
      setPack({});
      return;
    }
    const cached = cache[locale];
    if (cached) {
      setPack(cached);
      return;
    }
    void loaders[locale]().then((mod) => {
      if (cancel) return;
      cache[locale] = mod.default;
      setPack(mod.default);
    });
    return () => {
      cancel = true;
    };
  }, [locale, booted]);

  useEffect(() => {
    if (!booted) return;
    document.title = translate(pack, locale, "Every Sport Ever");
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        translate(pack, locale, "Fifty sports, short rules, fun facts, and 100 sports stars."),
      );
    }
  }, [booted, locale, pack]);

  const value = useMemo<I18n>(() => {
    const t = (text: string) => translate(pack, locale, text);
    const tf = (template: string, vars: Record<string, string | number>) => fill(t(template), vars);
    return { locale, setLocale, t, tf };
  }, [locale, pack]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useI18n(): I18n {
  const value = useContext(LocaleContext);
  if (value) return value;
  const t = (text: string) => text;
  return { locale: "en", setLocale: () => {}, t, tf: (template, vars) => fill(t(template), vars) };
}

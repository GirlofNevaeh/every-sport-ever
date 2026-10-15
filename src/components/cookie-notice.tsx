import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/locale";
import { LANG_KEY, readCookieChoice, writeCookieChoice, type CookieChoice } from "@/lib/cookie-choice";

export function CookieNotice({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, locale } = useI18n();
  const [choice, setChoice] = useState<CookieChoice | null>(null);

  useEffect(() => {
    if (open) setChoice(readCookieChoice());
  }, [open]);

  if (!open) return null;

  function saveLanguage() {
    writeCookieChoice("ok");
    window.localStorage.setItem(LANG_KEY, locale);
    onClose();
  }

  function stopSaving() {
    writeCookieChoice("no-lang");
    onClose();
  }

  return (
    <div className="no-print fixed inset-x-0 bottom-0 z-50 p-3">
      <section
        role="region"
        aria-label={t("Cookies")}
        className="mx-auto max-w-3xl rounded-3xl border-4 border-pitch bg-vest p-4 text-ink shadow-lg"
      >
        <h2 className="font-display text-2xl text-pitch">{t("Cookies")}</h2>
        <p className="mt-1 text-base leading-snug">
          {t(
            "This site saves your language on this device so it can open in that language next time. If you type an access key, it saves that too. It does not follow you around the web.",
          )}
        </p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <button type="button" onClick={saveLanguage} className="h-12 rounded-full bg-gold px-5 font-bold text-ink">
            {choice === "no-lang" ? t("Save my language") : t("OK")}
          </button>
          <button
            type="button"
            onClick={stopSaving}
            className="h-12 rounded-full border-2 border-ink bg-vest px-5 font-bold text-ink"
          >
            {t("Do not save my language")}
          </button>
        </div>
      </section>
    </div>
  );
}

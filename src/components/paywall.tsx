import { useState, type FormEvent } from "react";
import { useI18n } from "@/i18n/locale";
import { unlockAccess } from "@/lib/access";

const SHOP = "https://www.everyschoolever.com/pricing?plan=";

export function Paywall({ onUnlocked }: { onUnlocked: (token: string) => void }) {
  const { t } = useI18n();
  const [key, setKey] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    const typed = key.trim();
    if (!typed) {
      setError(true);
      return;
    }
    setBusy(true);
    setError(false);
    try {
      const result = await unlockAccess({ data: { key: typed } });
      if (result.ok) onUnlocked(result.token);
      else setError(true);
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-xl px-3 py-6">
      <section className="rounded-3xl border-4 border-gold bg-gold p-4 text-ink sm:p-6">
        <h1 className="font-display text-3xl">{t("You need a key to open this site.")}</h1>
        <p className="mt-2 text-lg">{t("Buy a key at Every School Ever. Then type it here.")}</p>
        <a
          href={SHOP}
          className="mt-4 inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-5 py-2 text-center font-bold text-vest"
        >
          {t("Get a key")}
        </a>
        <p className="wrap-safe mt-2 text-base font-bold">{SHOP}</p>
      </section>

      <form onSubmit={onSubmit} className="mt-4 rounded-3xl border-4 border-pitch bg-vest p-4 text-ink sm:p-6">
        <label htmlFor="access-key" className="font-display text-2xl text-pitch">
          {t("Access key")}
        </label>
        <input
          id="access-key"
          name="access-key"
          value={key}
          onChange={(event) => {
            setKey(event.target.value);
            if (error) setError(false);
          }}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          suppressHydrationWarning
          aria-invalid={error}
          className="mt-3 h-12 w-full rounded-full border-2 border-ink bg-vest px-4 text-lg text-ink outline-none"
        />
        <button
          type="submit"
          disabled={busy}
          className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-pitch px-5 py-2 font-bold text-vest disabled:opacity-70"
        >
          {busy ? t("Checking...") : t("Open the site")}
        </button>
        {error ? (
          <p role="alert" className="mt-3 font-bold text-track">
            {t("That key does not work. Try again.")}
          </p>
        ) : (
          <p className="mt-3 text-base">{t("The key stays on this device.")}</p>
        )}
      </form>
    </main>
  );
}

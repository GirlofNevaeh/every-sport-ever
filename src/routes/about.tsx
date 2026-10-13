import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { InstallDialog } from "@/components/chrome";
import { useI18n } from "@/i18n/locale";

export const Route = createFileRoute("/about")({ component: AboutPage });

function AboutPage() {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();
  return (
    <main className="mx-auto max-w-3xl px-3 py-4">
      <h1 className="font-display text-5xl text-pitch">{t("About")}</h1>
      <div className="mt-4 space-y-3 text-xl">
        <p className="rounded-3xl bg-pitch p-5 text-vest">{t("A sport has rules.")}</p>
        <p className="rounded-3xl bg-gold p-5 text-ink">{t("A sport has a way to score.")}</p>
        <p className="rounded-3xl bg-track p-5 text-vest">{t("A sport has a way to win.")}</p>
      </div>
      <p className="mt-4 text-lg">
        {t(
          "People play for fun, for a team, and to do their best. The Olympic Games, the Paralympics, and the Special Olympics are not the same event.",
        )}
      </p>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-6 h-12 rounded-full bg-gold px-5 font-bold text-ink"
      >
        {t("Add to iPhone or iPad")}
      </button>
      <InstallDialog open={open} onClose={() => setOpen(false)} />
    </main>
  );
}

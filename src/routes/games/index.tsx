import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/locale";

export const Route = createFileRoute("/games/")({ component: GamesPage });

function GamesPage() {
  const { t } = useI18n();
  return (
    <main className="mx-auto max-w-5xl px-3 py-4">
      <h1 className="font-display text-4xl text-ink">{t("Games")}</h1>
      <p className="mt-2 max-w-2xl text-lg">{t("Three big meetings of sport. They are not the same event.")}</p>
      <div className="mt-4 grid gap-4">
        <Link to="/games/olympic" className="grid min-h-48 overflow-hidden rounded-[2rem] bg-pitch text-vest sm:grid-cols-[1.2fr_1fr]">
          <span className="flex flex-col justify-center p-5">
            <span className="font-display text-4xl">{t("Olympic Games")}</span>
            <span className="mt-2 text-lg">{t("A worldwide meeting of sports, summer and winter, every four years.")}</span>
          </span>
          <span className="flex items-center justify-center bg-gold p-6 text-center font-display text-2xl text-ink">
            {t("Gold is first place")}
          </span>
        </Link>
        <Link to="/games/paralympics" className="grid min-h-48 overflow-hidden rounded-[2rem] bg-track text-vest sm:grid-cols-[1fr_1.2fr]">
          <span className="order-2 flex items-center justify-center bg-vest p-6 text-center font-display text-2xl text-ink sm:order-1">
            {t("Paris 2024 table")}
          </span>
          <span className="order-1 flex flex-col justify-center p-5 sm:order-2">
            <span className="font-display text-4xl">{t("Paralympics")}</span>
            <span className="mt-2 text-lg">{t("The worldwide Games for athletes with disabilities.")}</span>
          </span>
        </Link>
        <Link to="/games/special" className="grid min-h-48 items-center overflow-hidden rounded-[2rem] border-4 border-ink bg-gold text-ink sm:grid-cols-3">
          <span className="p-5 font-display text-4xl sm:col-span-2">{t("Special Olympics")}</span>
          <span className="px-5 pb-5 text-lg sm:pb-0">{t("A medal means you did well in your group.")}</span>
        </Link>
      </div>
    </main>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { getSport } from "@/data/sports";
import { useI18n } from "@/i18n/locale";

export const Route = createFileRoute("/games/special")({ component: SpecialPage });

const SPORTS = ["athletics", "swimming", "football", "basketball", "triathlon"];

function SpecialPage() {
  const { t } = useI18n();
  return (
    <main className="mx-auto max-w-5xl px-3 py-4">
      <h1 className="font-display text-4xl leading-tight wrap-safe text-ink sm:text-5xl">{t("Special Olympics")}</h1>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <p className="rounded-3xl bg-gold px-4 py-5 text-lg text-ink">
          {t("The Special Olympics are sports for people with intellectual disabilities.")}
        </p>
        <p className="rounded-3xl bg-pitch px-4 py-5 text-lg text-vest">
          {t("Athletes are grouped with others of similar skill.")}
        </p>
        <p className="rounded-3xl bg-track px-4 py-5 text-lg text-vest">
          {t("A medal means you did well in your group. It is not a prize for one country being best.")}
        </p>
      </div>
      <section className="mt-6 rounded-[2rem] border-4 border-gold p-5">
        <h2 className="font-display text-3xl text-pitch">{t("Not the Paralympics")}</h2>
        <p className="mt-2 text-lg">
          {t(
            "The Special Olympics and the Paralympics are not the same event. One groups athletes by skill. The other is the worldwide Games for athletes with disabilities.",
          )}
        </p>
        <p className="mt-3">{t("There is no country winner table on this page.")}</p>
      </section>
      <section className="mt-6">
        <h2 className="font-display text-3xl">{t("Sports athletes play")}</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {SPORTS.map((slug) => {
            const sport = getSport(slug);
            if (!sport) return null;
            return (
              <li key={slug}>
                <Link to="/sports/$slug" params={{ slug }} className="inline-flex h-12 items-center rounded-full bg-ink px-4 font-bold text-vest">
                  {t(sport.name)}
                </Link>
              </li>
            );
          })}
        </ul>
        <Link to="/stars/$slug" params={{ slug: "loretta-claiborne" }} className="mt-4 inline-flex h-12 items-center rounded-full bg-gold px-4 font-bold text-ink">
          Loretta Claiborne
        </Link>
        <Link to="/stars/$slug" params={{ slug: "chris-nikic" }} className="mt-4 ml-2 inline-flex h-12 items-center rounded-full bg-pitch px-4 font-bold text-vest">
          Chris Nikic
        </Link>
      </section>
    </main>
  );
}

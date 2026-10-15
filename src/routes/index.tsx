import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { factOfDay } from "@/data/day";
import { facePreload, sceneFor } from "@/data/faces";
import { sports } from "@/data/sports";
import { stars } from "@/data/stars";
import { SearchForm } from "@/components/chrome";
import { StarPortrait } from "@/components/star-portrait";
import { useI18n } from "@/i18n/locale";

export const Route = createFileRoute("/")({
  head: () => ({ links: facePreload(stars.slice(0, 16)) }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const { t, tf } = useI18n();
  const today = factOfDay();
  const hero = sceneFor(today.sport) ?? "/art/scenes/hero.jpg";

  function surprise() {
    if (Math.random() < 0.5) {
      const sport = sports[Math.floor(Math.random() * sports.length)];
      if (!sport) return;
      void navigate({ to: "/sports/$slug", params: { slug: sport.slug } });
      return;
    }
    const person = stars[Math.floor(Math.random() * stars.length)];
    if (!person) return;
    void navigate({ to: "/stars/$slug", params: { slug: person.slug } });
  }

  return (
    <main className="mx-auto max-w-5xl px-3 py-4">
      <section className="overflow-hidden rounded-3xl border-4 border-pitch bg-pitch text-vest">
        <img src={hero} alt="" className="h-48 w-full object-cover sm:h-64" />
        <div className="p-4 sm:p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-gold">{t("Today")}</p>
          <h1 className="mt-1 font-display text-4xl leading-tight wrap-safe sm:text-5xl">{t(today.sport.name)}</h1>
          <p className="mt-2 max-w-xl text-lg">{t(today.sport.fact)}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              to="/sports/$slug"
              params={{ slug: today.sport.slug }}
              className="inline-flex h-12 items-center rounded-full bg-gold px-5 font-bold text-ink"
            >
              {tf("Open {name}", { name: t(today.sport.name) })}
            </Link>
            <button type="button" onClick={surprise} className="h-12 rounded-full bg-track px-5 font-bold text-vest">
              {t("Surprise me")}
            </button>
          </div>
          <SearchForm id="home-search" big />
        </div>
      </section>

      <section className="mt-4 rounded-3xl border-4 border-gold bg-gold p-4 text-ink">
        <h2 className="font-display text-2xl">{t("Fact of the Day")}</h2>
        <p className="mt-2 text-lg">{t(today.fact)}</p>
        <Link to="/facts" className="mt-3 inline-flex h-11 items-center rounded-full bg-ink px-4 font-bold text-vest">
          {t("All facts")}
        </Link>
      </section>

      <section className="mt-6">
        <div className="mb-2 flex items-end justify-between gap-2">
          <h2 className="font-display text-3xl text-pitch">{t("Sports")}</h2>
          <Link to="/sports" className="font-bold text-track">
            {t("All 50")}
          </Link>
        </div>
        <div className="strip-scroll flex gap-3 pb-2">
          {sports.map((sport) => (
            <Link
              key={sport.slug}
              to="/sports/$slug"
              params={{ slug: sport.slug }}
              className="w-36 shrink-0 rounded-2xl border-2 border-pitch bg-vest p-3"
            >
              <span className="block font-display text-lg leading-tight text-pitch">{t(sport.name)}</span>
              <span className="mt-2 block text-sm leading-snug text-ink">{t(sport.quizScore)}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <div className="mb-2 flex items-end justify-between gap-2">
          <h2 className="font-display text-3xl text-track">{t("Stars")}</h2>
          <Link to="/stars" className="font-bold text-pitch">
            {t("All 100")}
          </Link>
        </div>
        <div className="strip-scroll flex gap-3 pb-2">
          {stars.slice(0, 16).map((person) => (
            <Link
              key={person.slug}
              to="/stars/$slug"
              params={{ slug: person.slug }}
              className="w-28 shrink-0 text-center"
            >
              <StarPortrait person={person} className="mx-auto h-28 w-28 rounded-3xl border-4 border-gold" />
              <span className="mt-1 block text-sm font-bold leading-tight">{person.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-3 sm:grid-cols-3">
        <Link to="/games/olympic" className="flex min-h-44 flex-col justify-between rounded-3xl bg-pitch p-4 text-vest">
          <span className="font-display text-3xl leading-tight wrap-safe">{t("Olympic Games")}</span>
          <span>{t("Summer and winter. Every four years.")}</span>
        </Link>
        <Link to="/games/paralympics" className="flex min-h-44 flex-col justify-between rounded-3xl bg-track p-4 text-vest">
          <span className="font-display text-3xl leading-tight wrap-safe">{t("Paralympics")}</span>
          <span>{t("Games for athletes with disabilities.")}</span>
        </Link>
        <Link to="/games/special" className="flex min-h-44 flex-col justify-between rounded-3xl bg-gold p-4 text-ink">
          <span className="font-display text-3xl leading-tight wrap-safe">{t("Special Olympics")}</span>
          <span>{t("Sports for people with intellectual disabilities.")}</span>
        </Link>
      </section>
    </main>
  );
}

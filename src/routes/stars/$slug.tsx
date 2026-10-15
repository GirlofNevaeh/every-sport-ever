import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { facePreload } from "@/data/faces";
import { getSport } from "@/data/sports";
import { getStar } from "@/data/stars";
import { StarPortrait } from "@/components/star-portrait";
import { useI18n } from "@/i18n/locale";

export const Route = createFileRoute("/stars/$slug")({
  loader: ({ params }) => {
    const person = getStar(params.slug);
    if (!person) throw notFound();
    return { person };
  },
  head: ({ loaderData }) => ({
    links: loaderData?.person ? facePreload([loaderData.person]) : [],
  }),
  component: StarPage,
});

function StarPage() {
  const { person } = Route.useLoaderData();
  const { t } = useI18n();
  const sport = getSport(person.sports[0] ?? "");
  const extras = person.sports.slice(1).map((slug) => getSport(slug)).filter((item) => item != null);
  return (
    <main className="mx-auto grid max-w-5xl gap-4 px-3 py-4 md:grid-cols-[220px_1fr]">
      <StarPortrait
        person={person}
        className="aspect-square w-full max-w-sm justify-self-center rounded-[2rem] border-4 border-gold"
      />
      <article className="rounded-[2rem] bg-ink p-5 text-vest">
        <p className="text-sm font-bold text-gold">{t(person.country)}</p>
        <h1 className="font-display text-4xl leading-tight wrap-safe sm:text-5xl">{person.name}</h1>
        <p className="mt-3 text-lg">
          {sport ? (
            <Link to="/sports/$slug" params={{ slug: sport.slug }} className="font-bold text-gold underline">
              {t(sport.name)}
            </Link>
          ) : null}
          {person.para ? ` · ${t("Paralympian")}` : ""}
          {person.specialOlympics ? ` · ${t("Special Olympics")}` : ""}
        </p>
        <ul className="mt-4 space-y-3">
          {person.facts.map((fact) => (
            <li key={fact} className="rounded-2xl bg-vest p-3 text-lg text-ink">
              {t(fact)}
            </li>
          ))}
        </ul>
        {extras.length > 0 ? (
          <p className="mt-4 text-sm">
            {t("Also linked to")}{" "}
            {extras.map((extra, index) => (
              <span key={extra.slug}>
                {index > 0 ? ", " : ""}
                <Link to="/sports/$slug" params={{ slug: extra.slug }} className="font-bold text-gold underline">
                  {t(extra.name)}
                </Link>
              </span>
            ))}
            .
          </p>
        ) : null}
      </article>
    </main>
  );
}

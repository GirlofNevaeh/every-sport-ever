import { createFileRoute, Link } from "@tanstack/react-router";
import { searchAll } from "@/data/find";
import { getStar } from "@/data/stars";
import { SearchForm } from "@/components/chrome";
import { StarPortrait } from "@/components/star-portrait";
import { useI18n } from "@/i18n/locale";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const { t } = useI18n();
  const hits = searchAll(q, t);
  return (
    <main className="mx-auto max-w-3xl px-3 py-4">
      <h1 className="font-display text-4xl text-pitch">{t("Search")}</h1>
      <div className="mt-3">
        <SearchForm id="results-search" />
      </div>
      {q.trim() === "" ? <p className="mt-4">{t("Type a sport or a name.")}</p> : null}
      {q.trim() !== "" && hits.length === 0 ? (
        <p className="mt-4 text-lg">{t("No sport or star has that name. Try football or Bolt.")}</p>
      ) : null}
      <ul className="mt-4 space-y-2">
        {hits.map((hit) => {
          const person = hit.kind === "star" ? getStar(hit.slug) : null;
          return (
            <li key={`${hit.kind}-${hit.slug}`}>
              <Link
                to={hit.kind === "sport" ? "/sports/$slug" : "/stars/$slug"}
                params={{ slug: hit.slug }}
                className="flex items-center gap-3 rounded-2xl border-2 border-ink/10 bg-vest p-3"
              >
                {person ? (
                  <StarPortrait person={person} className="h-16 w-16 rounded-2xl border-4 border-gold" />
                ) : (
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-pitch text-sm font-bold text-vest">
                    {t("Sport")}
                  </span>
                )}
                <span>
                  <span className="block font-display text-xl leading-tight">
                    {hit.kind === "sport" ? t(hit.name) : hit.name}
                  </span>
                  <span className="text-sm text-muted">{t(hit.note)}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

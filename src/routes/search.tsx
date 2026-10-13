import { createFileRoute, Link } from "@tanstack/react-router";
import { searchAll } from "@/data/find";
import { faceSrc } from "@/data/faces";
import { getStar } from "@/data/stars";
import { SearchForm } from "@/components/chrome";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const hits = searchAll(q);
  return (
    <main className="mx-auto max-w-3xl px-3 py-4">
      <h1 className="font-display text-4xl text-pitch">Search</h1>
      <div className="mt-3">
        <SearchForm id="results-search" />
      </div>
      {q.trim() === "" ? <p className="mt-4">Type a sport or a name.</p> : null}
      {q.trim() !== "" && hits.length === 0 ? (
        <p className="mt-4 text-lg">No sport or star has that name. Try football or Bolt.</p>
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
                  <img src={faceSrc(person)} alt="" className="h-14 w-14 rounded-full object-cover" />
                ) : (
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-pitch text-sm font-bold text-vest">
                    Sport
                  </span>
                )}
                <span>
                  <span className="block font-display text-xl leading-tight">{hit.name}</span>
                  <span className="text-sm text-muted">{hit.note}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

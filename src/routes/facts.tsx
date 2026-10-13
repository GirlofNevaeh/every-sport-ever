import { createFileRoute, Link } from "@tanstack/react-router";
import { factOfDay } from "@/data/day";
import { sports } from "@/data/sports";

export const Route = createFileRoute("/facts")({ component: FactsPage });

function FactsPage() {
  const today = factOfDay();
  return (
    <main className="mx-auto max-w-3xl px-3 py-4">
      <section className="rounded-[2rem] bg-gold p-5 text-ink">
        <h1 className="font-display text-4xl">Fact of the Day</h1>
        <p className="mt-2 text-xl">{today.fact}</p>
        <Link to="/sports/$slug" params={{ slug: today.sport.slug }} className="mt-3 inline-flex font-bold underline">
          {today.sport.name}
        </Link>
      </section>
      <ol className="mt-5 space-y-3">
        {sports.map((sport, index) => (
          <li key={sport.slug} className="rounded-2xl border-2 border-pitch/30 bg-vest p-4">
            <p className="font-display text-xl text-pitch">
              {index + 1}. {sport.name}
            </p>
            <p className="mt-1">{sport.fact}</p>
          </li>
        ))}
      </ol>
    </main>
  );
}

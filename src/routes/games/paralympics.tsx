import { createFileRoute, Link } from "@tanstack/react-router";
import { MedalTable } from "@/components/medal-table";
import { paralympicMedals, withPlaces } from "@/data/medals";
import { getSport } from "@/data/sports";

export const Route = createFileRoute("/games/paralympics")({ component: ParalympicPage });

const SPORTS = [
  "athletics",
  "swimming",
  "cycling",
  "archery",
  "rowing",
  "canoeing",
  "table-tennis",
  "triathlon",
  "equestrian",
  "judo",
  "taekwondo",
  "badminton",
  "fencing",
];

function ParalympicPage() {
  const rows = withPlaces(paralympicMedals);
  return (
    <main className="mx-auto max-w-5xl px-3 py-4">
      <div className="rounded-[2rem] bg-track p-5 text-vest">
        <h1 className="font-display text-5xl">Paralympics</h1>
        <p className="mt-3 max-w-2xl text-lg">
          The Paralympics are the worldwide Games for athletes with disabilities.
        </p>
        <p className="mt-2 max-w-2xl">
          They are not the Special Olympics. A gold medal here is first place in that event.
        </p>
      </div>
      <section className="mt-5 rounded-[2rem] border-4 border-pitch p-3 sm:p-5">
        <MedalTable rows={rows} caption="Paris 2024 Paralympics" />
        <p className="mt-2 text-sm">This table is for those Games, not for all of history.</p>
      </section>
      <section className="mt-6">
        <h2 className="font-display text-3xl text-pitch">Sports you can read about</h2>
        <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {SPORTS.map((slug) => {
            const sport = getSport(slug);
            if (!sport) return null;
            return (
              <li key={slug}>
                <Link
                  to="/sports/$slug"
                  params={{ slug }}
                  className="flex h-14 items-center justify-center rounded-2xl bg-gold px-2 text-center text-sm font-bold text-ink"
                >
                  {sport.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

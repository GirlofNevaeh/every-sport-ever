import { createFileRoute, Link } from "@tanstack/react-router";
import { MedalTable } from "@/components/medal-table";
import { olympicMedals, withPlaces } from "@/data/medals";
import { getSport } from "@/data/sports";

export const Route = createFileRoute("/games/olympic")({ component: OlympicPage });

const SUMMER = [
  "football",
  "basketball",
  "tennis",
  "athletics",
  "swimming",
  "gymnastics",
  "volleyball",
  "beach-volleyball",
  "table-tennis",
  "badminton",
  "golf",
  "cycling",
  "boxing",
  "wrestling",
  "judo",
  "taekwondo",
  "fencing",
  "archery",
  "rowing",
  "canoeing",
  "sailing",
  "field-hockey",
  "handball",
  "water-polo",
  "diving",
  "equestrian",
  "triathlon",
  "skateboarding",
  "climbing",
  "surfing",
  "weightlifting",
];

const WINTER = ["ice-hockey", "figure-skating", "skiing", "snowboarding", "curling"];

function OlympicPage() {
  const rows = withPlaces(olympicMedals);
  return (
    <main className="mx-auto max-w-5xl px-3 py-4">
      <p className="text-sm font-bold text-pitch">Summer and winter</p>
      <h1 className="font-display text-5xl text-ink">Olympic Games</h1>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <p className="rounded-3xl bg-pitch p-4 text-vest">The Olympic Games are a worldwide meeting of sports.</p>
        <p className="rounded-3xl bg-gold p-4 text-ink">There are Summer Games and Winter Games.</p>
        <p className="rounded-3xl bg-track p-4 text-vest">They are held every four years. A gold medal is first place.</p>
      </div>
      <section className="mt-6">
        <MedalTable rows={rows} caption="Paris 2024" />
        <p className="mt-2 text-sm">This table is for those Games, not for all of history.</p>
      </section>
      <section className="mt-8">
        <h2 className="font-display text-3xl text-pitch">Summer sports on this list</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {SUMMER.map((slug) => {
            const sport = getSport(slug);
            if (!sport) return null;
            return (
              <li key={slug}>
                <Link to="/sports/$slug" params={{ slug }} className="inline-flex h-10 items-center rounded-full bg-pitch px-3 text-sm font-bold text-vest">
                  {sport.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-base">Rugby at the Olympic Games is rugby sevens, a short form of rugby union.</p>
      </section>
      <section className="mt-6">
        <h2 className="font-display text-3xl text-track">Winter sports on this list</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {WINTER.map((slug) => {
            const sport = getSport(slug);
            if (!sport) return null;
            return (
              <li key={slug}>
                <Link to="/sports/$slug" params={{ slug }} className="inline-flex h-10 items-center rounded-full bg-ink px-3 text-sm font-bold text-vest">
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

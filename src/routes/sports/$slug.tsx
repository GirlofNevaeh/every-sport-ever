import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { sceneFor, facePreload } from "@/data/faces";
import { getSport } from "@/data/sports";
import { starsForSport } from "@/data/stars";
import { StarPortrait } from "@/components/star-portrait";
import type { Sport } from "@/data/types";

export const Route = createFileRoute("/sports/$slug")({
  loader: ({ params }) => {
    const sport = getSport(params.slug);
    if (!sport) throw notFound();
    return { sport };
  },
  head: ({ params }) => ({ links: facePreload(starsForSport(params.slug)) }),
  component: SportPage,
});

function SportPage() {
  const { sport } = Route.useLoaderData();
  const linked = starsForSport(sport.slug);
  const scene = sceneFor(sport);

  if (sport.family === "water") return <WaterSport sport={sport} scene={scene} stars={linked} />;
  if (sport.family === "ice") return <IceSport sport={sport} scene={scene} stars={linked} />;
  if (sport.family === "mat") return <MatSport sport={sport} stars={linked} />;
  if (sport.family === "road") return <RoadSport sport={sport} scene={scene} stars={linked} />;
  if (sport.family === "court") return <CourtSport sport={sport} stars={linked} />;
  return <PitchSport sport={sport} scene={scene} stars={linked} />;
}

function StarsRow({ stars }: { stars: ReturnType<typeof starsForSport> }) {
  if (stars.length === 0) return null;
  return (
    <section className="mt-6">
      <h2 className="font-display text-2xl">Stars</h2>
      <ul className="mt-3 flex flex-wrap gap-3">
        {stars.map((person) => (
          <li key={person.slug}>
            <Link
              to="/stars/$slug"
              params={{ slug: person.slug }}
              className="flex w-28 flex-col items-center rounded-2xl bg-vest p-2 text-center text-ink"
            >
              <StarPortrait person={person} className="h-24 w-24 rounded-2xl border-4 border-gold" />
              <span className="mt-1 text-sm font-bold leading-tight">{person.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function RuleList({ sport, light = false }: { sport: Sport; light?: boolean }) {
  return (
    <ol className={`mt-3 space-y-2 ${light ? "text-vest" : "text-ink"}`}>
      {sport.rules.map((rule) => (
        <li key={rule} className="rounded-2xl bg-ink/10 px-3 py-2">
          {rule}
        </li>
      ))}
    </ol>
  );
}

function PitchSport({
  sport,
  scene,
  stars,
}: {
  sport: Sport;
  scene: string | null;
  stars: ReturnType<typeof starsForSport>;
}) {
  return (
    <main className="mx-auto max-w-5xl px-3 py-4">
      <article className="overflow-hidden rounded-[2rem] border-4 border-pitch bg-pitch text-vest">
        {scene ? <img src={scene} alt="" className="h-52 w-full object-cover" /> : null}
        <div className="p-4 sm:p-6">
          <p className="text-sm font-bold text-gold">On the field</p>
          <h1 className="font-display text-5xl">{sport.name}</h1>
          <p className="mt-2 max-w-2xl text-lg">{sport.where}</p>
          <h2 className="mt-5 font-display text-2xl text-gold">How you play</h2>
          <RuleList sport={sport} light />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <p className="rounded-2xl bg-gold p-4 text-ink">
              <strong className="block font-display text-xl">Score</strong>
              {sport.score}
            </p>
            <p className="rounded-2xl bg-vest p-4 text-ink">
              <strong className="block font-display text-xl">Win</strong>
              {sport.win}
            </p>
          </div>
          <p className="mt-4 text-lg">{sport.fact}</p>
          <StarsRow stars={stars} />
        </div>
      </article>
    </main>
  );
}

function CourtSport({ sport, stars }: { sport: Sport; stars: ReturnType<typeof starsForSport> }) {
  return (
    <main className="mx-auto max-w-5xl px-3 py-4">
      <article className="rounded-[2rem] border-4 border-ink bg-[linear-gradient(90deg,transparent_49%,#121212_49%,#121212_51%,transparent_51%),linear-gradient(#f7f4ef,#f7f4ef)] p-4 text-ink sm:p-6">
        <p className="text-sm font-bold text-track">On the court</p>
        <h1 className="font-display text-5xl text-pitch">{sport.name}</h1>
        <p className="mt-2 max-w-2xl">{sport.where}</p>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <section className="rounded-3xl bg-vest/90 p-4">
            <h2 className="font-display text-2xl">How you play</h2>
            <RuleList sport={sport} />
          </section>
          <section className="flex flex-col gap-3">
            <p className="rounded-3xl bg-gold p-4">
              <strong className="block font-display text-xl">Score</strong>
              {sport.score}
            </p>
            <p className="rounded-3xl bg-track p-4 text-vest">
              <strong className="block font-display text-xl">Win</strong>
              {sport.win}
            </p>
            <p className="rounded-3xl bg-pitch p-4 text-vest">{sport.fact}</p>
          </section>
        </div>
        <StarsRow stars={stars} />
      </article>
    </main>
  );
}

function WaterSport({
  sport,
  scene,
  stars,
}: {
  sport: Sport;
  scene: string | null;
  stars: ReturnType<typeof starsForSport>;
}) {
  return (
    <main className="mx-auto max-w-5xl px-3 py-4">
      <article>
        {scene ? <img src={scene} alt="" className="h-48 w-full rounded-3xl object-cover" /> : null}
        <div className="mt-3 rounded-3xl bg-pitch px-4 py-5 text-vest">
          <p className="text-sm font-bold text-gold">In the water</p>
          <h1 className="font-display text-5xl">{sport.name}</h1>
          <p className="mt-2">{sport.where}</p>
        </div>
        <ol className="mt-3 space-y-2">
          {sport.rules.map((rule, index) => (
            <li key={rule} className="rounded-full bg-gold px-4 py-3 text-ink">
              <span className="mr-2 font-display">{index + 1}</span>
              {rule}
            </li>
          ))}
        </ol>
        <p className="mt-3 rounded-3xl border-4 border-track bg-vest p-4">
          <strong>Score. </strong>
          {sport.score}
        </p>
        <p className="mt-3 rounded-3xl bg-track p-4 text-vest">
          <strong>Win. </strong>
          {sport.win}
        </p>
        <p className="mt-3 text-lg">{sport.fact}</p>
        <StarsRow stars={stars} />
      </article>
    </main>
  );
}

function IceSport({
  sport,
  scene,
  stars,
}: {
  sport: Sport;
  scene: string | null;
  stars: ReturnType<typeof starsForSport>;
}) {
  return (
    <main className="mx-auto max-w-5xl px-3 py-4">
      <article className="rounded-[2rem] border-4 border-ink bg-[repeating-linear-gradient(180deg,#f7f4ef_0_18px,#121212_18px_20px)] p-2">
        <div className="rounded-[1.4rem] bg-vest p-4 sm:p-6">
          {scene ? <img src={scene} alt="" className="mb-3 h-44 w-full rounded-2xl object-cover" /> : null}
          <p className="text-sm font-bold text-track">Ice and snow</p>
          <h1 className="font-display text-5xl text-pitch">{sport.name}</h1>
          <p className="mt-2">{sport.where}</p>
          <h2 className="mt-4 font-display text-2xl">How you play</h2>
          <RuleList sport={sport} />
          <p className="mt-4 text-lg">
            <strong>Score. </strong>
            {sport.score}
          </p>
          <p className="mt-2 text-lg">
            <strong>Win. </strong>
            {sport.win}
          </p>
          <p className="mt-4 rounded-2xl bg-gold p-3">{sport.fact}</p>
          <StarsRow stars={stars} />
        </div>
      </article>
    </main>
  );
}

function MatSport({ sport, stars }: { sport: Sport; stars: ReturnType<typeof starsForSport> }) {
  return (
    <main className="mx-auto max-w-3xl px-3 py-4">
      <article className="rounded-[2rem] border-[10px] border-track bg-vest p-4 text-ink shadow-[inset_0_0_0_6px_#F2C14E] sm:p-6">
        <p className="text-center text-sm font-bold text-track">On the mat</p>
        <h1 className="text-center font-display text-5xl">{sport.name}</h1>
        <p className="mt-2 text-center">{sport.where}</p>
        <ul className="mt-4 space-y-2">
          {sport.rules.map((rule) => (
            <li key={rule} className="rounded-2xl bg-gold px-3 py-2">
              {rule}
            </li>
          ))}
        </ul>
        <p className="mt-4">
          <strong>Score. </strong>
          {sport.score}
        </p>
        <p className="mt-2">
          <strong>Win. </strong>
          {sport.win}
        </p>
        <p className="mt-4">{sport.fact}</p>
        <StarsRow stars={stars} />
      </article>
    </main>
  );
}

function RoadSport({
  sport,
  scene,
  stars,
}: {
  sport: Sport;
  scene: string | null;
  stars: ReturnType<typeof starsForSport>;
}) {
  return (
    <main className="mx-auto max-w-5xl px-3 py-4">
      <article>
        <div className="rounded-3xl bg-gold p-4 text-ink sm:p-6">
          <p className="text-sm font-bold">On the move</p>
          <h1 className="font-display text-5xl text-pitch">{sport.name}</h1>
          <p className="mt-2">{sport.where}</p>
        </div>
        {scene ? <img src={scene} alt="" className="mt-3 h-48 w-full rounded-3xl object-cover" /> : null}
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {sport.rules.map((rule, index) => (
            <p key={rule} className="rounded-2xl bg-pitch p-4 text-vest">
              <span className="font-display text-2xl text-gold">{index + 1}</span> {rule}
            </p>
          ))}
        </div>
        <p className="mt-3 rounded-2xl border-4 border-ink p-4">
          <strong>Score. </strong>
          {sport.score} <strong>Win. </strong>
          {sport.win}
        </p>
        <p className="mt-3 text-lg">{sport.fact}</p>
        <StarsRow stars={stars} />
      </article>
    </main>
  );
}

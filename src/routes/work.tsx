import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { olympicMedals, paralympicMedals, withPlaces } from "@/data/medals";
import { stages } from "@/data/projects";
import { sports } from "@/data/sports";

export const Route = createFileRoute("/work")({ component: WorkPage });

function WorkPage() {
  const [slug, setSlug] = useState(sports[0]?.slug ?? "football");
  const sport = sports.find((item) => item.slug === slug) ?? sports[0];
  const olympicTop = withPlaces(olympicMedals).slice(0, 12);
  const paraTop = withPlaces(paralympicMedals).slice(0, 12);

  return (
    <main className="mx-auto max-w-3xl px-3 py-4">
      <h1 className="font-display text-5xl text-pitch">Work</h1>
      <p className="mt-2 text-lg">Print a page, or pick a project from Primary 1 to Primary 7.</p>

      <section className="print-sheet mt-5 rounded-3xl border-4 border-pitch bg-vest p-4">
        <div className="no-print mb-3">
          <label htmlFor="rules-sport" className="font-bold">
            Rules card
          </label>
          <select
            id="rules-sport"
            value={sport?.slug}
            onChange={(event) => setSlug(event.target.value)}
            className="mt-2 h-12 w-full rounded-full border-2 border-ink bg-vest px-3"
          >
            {sports.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        {sport ? (
          <article>
            <h2 className="font-display text-4xl text-pitch">{sport.name}</h2>
            <ol className="mt-3 list-decimal space-y-1 pl-5">
              {sport.rules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ol>
            <p className="mt-3">
              <strong>Score. </strong>
              {sport.score}
            </p>
            <p className="mt-2">
              <strong>Win. </strong>
              {sport.win}
            </p>
            <p className="mt-2">{sport.fact}</p>
          </article>
        ) : null}
        <button type="button" onClick={() => window.print()} className="no-print mt-4 h-12 rounded-full bg-gold px-5 font-bold text-ink">
          Print rules card
        </button>
      </section>

      <section className="print-sheet mt-5 rounded-3xl border-4 border-track p-4">
        <h2 className="font-display text-3xl">Finish the medal table</h2>
        <p className="mt-1">Paris 2024 Olympic Games. Write the medals. The full table is on the Olympic Games page.</p>
        <BlankTable rows={olympicTop.map((row) => row.country)} />
        <h3 className="mt-5 font-display text-2xl text-track">Paris 2024 Paralympics</h3>
        <p>Write the medals. The full table is on the Paralympics page.</p>
        <BlankTable rows={paraTop.map((row) => row.country)} />
        <h3 className="mt-5 font-display text-2xl">Our class games</h3>
        <BlankTable rows={["", "", "", "", "", ""]} />
        <button type="button" onClick={() => window.print()} className="no-print mt-4 h-12 rounded-full bg-track px-5 font-bold text-vest">
          Print medal table
        </button>
      </section>

      <section className="mt-6 space-y-5">
        {stages.map((stage) => (
          <article key={stage.id} className="print-sheet rounded-[2rem] bg-gold/50 p-4">
            <h2 className="font-display text-3xl text-ink">
              {stage.name}
              <span className="mt-1 block text-base font-sans font-bold text-muted">{stage.years}</span>
            </h2>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <Task title="On your own" card={stage.solo} />
              <Task title="With a team" card={stage.team} />
            </div>
          </article>
        ))}
        <button type="button" onClick={() => window.print()} className="no-print h-12 rounded-full bg-pitch px-5 font-bold text-vest">
          Print projects
        </button>
      </section>
    </main>
  );
}

function Task({ title, card }: { title: string; card: { title: string; time: string; need: string; steps: string[]; done: string } }) {
  return (
    <div className="rounded-3xl bg-vest p-4">
      <p className="text-sm font-bold text-track">{title}</p>
      <h3 className="font-display text-2xl leading-tight">{card.title}</h3>
      <p className="mt-2">
        <strong>Time. </strong>
        {card.time}
      </p>
      <p>
        <strong>What you need. </strong>
        {card.need}
      </p>
      <ol className="mt-2 list-decimal space-y-1 pl-5">
        {card.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <p className="mt-2">
        <strong>Finished when. </strong>
        {card.done}
      </p>
    </div>
  );
}

function BlankTable({ rows }: { rows: string[] }) {
  return (
    <table className="mt-3 w-full table-fixed border-collapse text-sm">
      <thead>
        <tr className="bg-ink text-vest">
          <th className="w-10 px-0.5 py-2 text-xs leading-tight">Place</th>
          <th className="px-1 py-2 text-left text-xs">Country</th>
          <th className="w-10 px-0 py-2 text-xs leading-tight">Gold</th>
          <th className="w-11 px-0 py-2 text-xs leading-tight">Silver</th>
          <th className="w-12 px-0 py-2 text-xs leading-tight">Bronze</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((country, index) => (
          <tr key={`${country}-${index}`} className="border-b border-ink/20">
            <td className="px-1 py-3 text-center">{index + 1}</td>
            <td className="px-2 py-3">{country || " "}</td>
            <td className="border-l border-ink/20" />
            <td className="border-l border-ink/20" />
            <td className="border-l border-ink/20" />
          </tr>
        ))}
      </tbody>
    </table>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { sports } from "@/data/sports";
import type { Tag } from "@/data/types";
import { useI18n } from "@/i18n/locale";

export const Route = createFileRoute("/sports/")({ component: SportsPage });

const FILTERS: { id: Tag; label: string }[] = [
  { id: "ball", label: "Ball" },
  { id: "water", label: "Water" },
  { id: "ice", label: "Ice and snow" },
  { id: "racquet", label: "Racquet" },
  { id: "combat", label: "Combat" },
  { id: "wheels", label: "Wheels" },
];

function SportsPage() {
  const { t, tf } = useI18n();
  const [picked, setPicked] = useState<Tag[]>([]);

  const visible = useMemo(
    () => sports.filter((sport) => picked.every((tag) => sport.tags.includes(tag))),
    [picked],
  );

  function emptyIfAdded(tag: Tag) {
    if (picked.includes(tag)) return false;
    return sports.filter((sport) => [...picked, tag].every((item) => sport.tags.includes(item))).length === 0;
  }

  return (
    <main className="mx-auto max-w-5xl px-3 py-4">
      <h1 className="font-display text-4xl text-pitch">{t("Sports")}</h1>
      <p className="mt-2 max-w-2xl text-lg">{t("Fifty sports. Pick a group, or open any card.")}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setPicked([])}
          className={`h-11 rounded-full px-4 font-bold ${picked.length === 0 ? "bg-pitch text-vest" : "bg-gold text-ink"}`}
        >
          {t("All")}
        </button>
        {FILTERS.map((filter) => {
          const on = picked.includes(filter.id);
          const dead = emptyIfAdded(filter.id);
          return (
            <button
              key={filter.id}
              type="button"
              disabled={dead}
              onClick={() =>
                setPicked((current) =>
                  current.includes(filter.id) ? current.filter((item) => item !== filter.id) : [...current, filter.id],
                )
              }
              className={`min-h-11 rounded-full px-3 py-2 text-center text-sm font-bold leading-tight wrap-safe sm:text-base ${
                dead ? "bg-ink/10 text-ink/35" : on ? "bg-track text-vest" : "bg-gold text-ink"
              }`}
            >
              {t(filter.label)}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-sm font-bold text-muted">
        {visible.length === 1 ? t("1 sport") : tf("{count} sports", { count: visible.length })}
      </p>
      <ul className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
        {visible.map((sport, index) => (
          <li key={sport.slug} className={index % 7 === 0 ? "col-span-2 md:col-span-1" : ""}>
            <Link
              to="/sports/$slug"
              params={{ slug: sport.slug }}
              className={`flex h-full min-h-28 flex-col justify-between rounded-3xl border-2 p-3 ${
                sport.family === "water"
                  ? "border-pitch bg-pitch text-vest"
                  : sport.family === "mat"
                    ? "border-track bg-track text-vest"
                    : sport.family === "ice"
                      ? "border-ink bg-vest text-ink"
                      : sport.family === "road"
                        ? "border-gold bg-gold text-ink"
                        : "border-pitch bg-vest text-ink"
              }`}
            >
              <span className="font-display text-2xl leading-tight wrap-safe">{t(sport.name)}</span>
              <span className="text-sm leading-snug">{t(sport.quizWhere)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

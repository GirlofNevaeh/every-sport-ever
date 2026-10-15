import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { facePreload } from "@/data/faces";
import { getSport } from "@/data/sports";
import { stars } from "@/data/stars";
import { SearchForm } from "@/components/chrome";
import { StarPortrait } from "@/components/star-portrait";
import { useI18n } from "@/i18n/locale";

export const Route = createFileRoute("/stars/")({
  head: () => ({ links: facePreload(stars) }),
  component: StarsPage,
});

type Filter = "all" | "women" | "para" | "special";

function StarsPage() {
  const { t } = useI18n();
  const [filter, setFilter] = useState<Filter>("all");
  const list = useMemo(() => {
    if (filter === "women") return stars.filter((person) => person.gender === "woman");
    if (filter === "para") return stars.filter((person) => person.para);
    if (filter === "special") return stars.filter((person) => person.specialOlympics);
    return stars;
  }, [filter]);

  const chips: { id: Filter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "women", label: "Women" },
    { id: "para", label: "Paralympians" },
    { id: "special", label: "Special Olympics" },
  ];

  return (
    <main className="mx-auto max-w-5xl px-3 py-4">
      <h1 className="font-display text-4xl text-track">{t("Stars")}</h1>
      <p className="mt-2 text-lg">{t("One hundred sportsmen and sportswomen.")}</p>
      <div className="mt-3 max-w-xl">
        <SearchForm id="stars-search" />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {chips.map((chip) => (
          <button
            key={chip.id}
            type="button"
            onClick={() => setFilter(chip.id)}
            className={`h-11 rounded-full px-3 text-sm font-bold sm:text-base ${filter === chip.id ? "bg-pitch text-vest" : "bg-gold text-ink"}`}
          >
            {t(chip.label)}
          </button>
        ))}
      </div>
      <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {list.map((person) => {
          const sport = getSport(person.sports[0] ?? "");
          return (
            <li key={person.slug}>
              <Link
                to="/stars/$slug"
                params={{ slug: person.slug }}
                className="block h-full rounded-3xl border-2 border-ink/10 bg-vest p-3 text-center"
              >
                <StarPortrait person={person} className="mx-auto h-36 w-36 rounded-3xl border-4 border-gold" />
                <span className="mt-2 block font-display text-lg leading-tight wrap-safe">{person.name}</span>
                <span className="mt-1 block text-sm leading-tight text-muted wrap-safe">
                  {sport ? t(sport.name) : ""} · {t(person.country)}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

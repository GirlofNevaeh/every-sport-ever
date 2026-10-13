import { sports } from "./sports";
import { stars } from "./stars";

export type Hit = {
  kind: "sport" | "star";
  slug: string;
  name: string;
  score: number;
  note: string;
};

export function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function scoreName(query: string, name: string, exactBonus: number) {
  const n = normalize(name);
  if (!query || !n) return 0;
  if (n === query) return exactBonus;
  const parts = n.split(" ");
  if (parts[parts.length - 1] === query) return exactBonus - 8;
  if (n.startsWith(query)) return 80;
  const words = query.split(" ").filter(Boolean);
  if (words.length > 1 && words.every((word) => n.includes(word))) return 70;
  if (n.includes(query)) return 58;
  return 0;
}

export function searchAll(raw: string, t: (value: string) => string = (value) => value): Hit[] {
  const query = normalize(raw);
  if (!query) return [];
  const hits: Hit[] = [];
  for (const sport of sports) {
    const names = [...new Set([sport.name, ...sport.aka].flatMap((name) => [name, t(name)]))];
    const score = Math.max(...names.map((name) => scoreName(query, name, 100)));
    if (score > 0) {
      hits.push({ kind: "sport", slug: sport.slug, name: sport.name, score, note: "Sport" });
    }
  }
  for (const person of stars) {
    const score = scoreName(query, person.name, 100);
    if (score > 0) {
      hits.push({
        kind: "star",
        slug: person.slug,
        name: person.name,
        score,
        note: person.country,
      });
    }
  }
  hits.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
  return hits;
}

export function directHit(raw: string, t: (value: string) => string = (value) => value): Hit | null {
  const hits = searchAll(raw, t);
  if (hits.length === 0) return null;
  const top = hits[0];
  const same = hits.filter((hit) => hit.score === top.score);
  if (same.length === 1 && top.score >= 90) return top;
  return null;
}

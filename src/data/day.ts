import { sports } from "./sports";
import type { Sport } from "./types";

export function dayOfYear(date: Date) {
  const year = date.getUTCFullYear();
  const start = Date.UTC(year, 0, 0);
  const today = Date.UTC(year, date.getUTCMonth(), date.getUTCDate());
  return Math.floor((today - start) / 86400000);
}

export function factOfDay(date = new Date()): { sport: Sport; fact: string } {
  const index = (dayOfYear(date) - 1 + sports.length * 400) % sports.length;
  const sport = sports[index] ?? sports[0];
  return { sport, fact: sport.fact };
}

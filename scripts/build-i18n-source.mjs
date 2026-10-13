import { mkdirSync, writeFileSync } from "node:fs";
import { sports } from "../src/data/sports.ts";
import { stars } from "../src/data/stars.ts";
import { stages } from "../src/data/projects.ts";
import { olympicMedals, paralympicMedals } from "../src/data/medals.ts";
import { uiStrings } from "../src/i18n/messages.ts";

const strings = new Set();
function add(value) {
  if (typeof value === "string" && value.trim()) strings.add(value);
}

for (const sport of sports) {
  add(sport.name);
  sport.aka.forEach(add);
  sport.rules.forEach(add);
  add(sport.score);
  add(sport.win);
  add(sport.where);
  add(sport.fact);
  add(sport.quizScore);
  add(sport.quizWhere);
}

for (const person of stars) {
  add(person.country);
  person.facts.forEach(add);
}

for (const stage of stages) {
  add(stage.name);
  add(stage.years);
  for (const project of stage.projects) {
    for (const card of [project.solo, project.team]) {
      add(card.title);
      add(card.time);
      add(card.need);
      card.steps.forEach(add);
      add(card.done);
    }
  }
}

for (const row of [...olympicMedals, ...paralympicMedals]) add(row.country);
for (const line of uiStrings) add(line);

const source = [...strings];
mkdirSync(new URL("../src/i18n/chunks", import.meta.url), { recursive: true });
mkdirSync(new URL("../src/i18n/packs", import.meta.url), { recursive: true });
writeFileSync(new URL("../src/i18n/source.json", import.meta.url), JSON.stringify(source));

const size = Math.ceil(source.length / 4);
for (let part = 0; part < 4; part += 1) {
  const slice = source.slice(part * size, (part + 1) * size);
  writeFileSync(new URL(`../src/i18n/chunks/${part}.json`, import.meta.url), JSON.stringify(slice));
}

console.log(JSON.stringify({ total: source.length, chunk: size }));

import { getSport, sports } from "./sports";
import { stars } from "./stars";

export type Question = {
  id: string;
  prompt: string;
  name: string;
  choices: [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
};

function mix(seed: number) {
  let x = seed >>> 0;
  return () => {
    x = (Math.imul(x, 1664525) + 1013904223) >>> 0;
    return x;
  };
}

function buildChoice(correct: string, pool: string[], seed: number) {
  const next = mix(seed);
  const bag = [...new Set(pool.filter((item) => item && item !== correct))];
  const picked: string[] = [];
  let guard = 0;
  while (picked.length < 3 && bag.length && guard < 30) {
    guard += 1;
    const index = next() % bag.length;
    const item = bag.splice(index, 1)[0];
    if (item && !picked.includes(item)) picked.push(item);
  }
  while (picked.length < 3) picked.push(`Ask a teacher ${picked.length + 1}`);
  const ordered = [...picked];
  const slot = next() % 4;
  ordered.splice(slot, 0, correct);
  return {
    choices: [ordered[0], ordered[1], ordered[2], ordered[3]] as [string, string, string, string],
    answer: slot as 0 | 1 | 2 | 3,
  };
}

function makeQuestions(): Question[] {
  const scorePool = sports.map((sport) => sport.quizScore);
  const wherePool = sports.map((sport) => sport.quizWhere);
  const winPool = sports.map((sport) => sport.win);
  const countryPool = [...new Set(stars.map((person) => person.country))];
  const sportNames = sports.map((sport) => sport.name);
  const questions: Question[] = [];

  sports.forEach((sport, index) => {
    const score = buildChoice(sport.quizScore, scorePool, index * 17 + 3);
    questions.push({
      id: `score-${sport.slug}`,
      prompt: "How do you score in {name}?",
      name: sport.name,
      choices: score.choices,
      answer: score.answer,
    });
    const where = buildChoice(sport.quizWhere, wherePool, index * 29 + 11);
    questions.push({
      id: `where-${sport.slug}`,
      prompt: "Where do people take part in {name}?",
      name: sport.name,
      choices: where.choices,
      answer: where.answer,
    });
    const win = buildChoice(sport.win, winPool, index * 23 + 9);
    questions.push({
      id: `win-${sport.slug}`,
      prompt: "How do you win in {name}?",
      name: sport.name,
      choices: win.choices,
      answer: win.answer,
    });
  });

  stars.forEach((person, index) => {
    if (index < 50) {
      const built = buildChoice(person.country, countryPool, index * 13 + 5);
      questions.push({
        id: `country-${person.slug}`,
        prompt: "Which country is {name} from?",
        name: person.name,
        choices: built.choices,
        answer: built.answer,
      });
    } else {
      const primary = getSport(person.sports[0] ?? "");
      const correct = primary?.name ?? "Football";
      const banned = new Set(
        person.sports.map((slug) => getSport(slug)?.name).filter((name): name is string => Boolean(name)),
      );
      const pool = sportNames.filter((name) => !banned.has(name));
      const built = buildChoice(correct, pool, index * 19 + 7);
      questions.push({
        id: `sport-${person.slug}`,
        prompt: "Which sport is {name} known for?",
        name: person.name,
        choices: built.choices,
        answer: built.answer,
      });
    }
  });

  return questions;
}

export const questions: Question[] = makeQuestions();

export function shuffleQuestions<T>(items: T[]) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    const current = copy[index] as T;
    copy[index] = copy[swap] as T;
    copy[swap] = current;
  }
  return copy;
}

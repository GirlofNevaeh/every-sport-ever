import type { Sport, Star } from "./types";

export function faceSrc(person: Star) {
  return `/art/stars/${person.slug}.jpg?v=skin2`;
}

export function facePreload(people: Star[]) {
  return people.map((person) => ({
    rel: "preload" as const,
    as: "image" as const,
    href: faceSrc(person),
  }));
}

export function sceneFor(sport: Sport) {
  return `/art/scenes/${sport.slug}.jpg`;
}

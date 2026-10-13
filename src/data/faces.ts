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
  if (sport.slug === "athletics" || sport.slug === "formula-1") {
    return sport.slug === "athletics" ? "/art/scenes/track.jpg" : "/art/scenes/road.jpg";
  }
  if (sport.family === "pitch") return "/art/scenes/pitch.jpg";
  if (sport.family === "water") return "/art/scenes/pool.jpg";
  if (sport.family === "ice") return "/art/scenes/ice.jpg";
  if (sport.family === "road") return "/art/scenes/road.jpg";
  return null;
}

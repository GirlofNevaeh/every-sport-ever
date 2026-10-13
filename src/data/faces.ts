import { stars } from "./stars";
import type { Sport, Star } from "./types";

export const womanFaces = [
  "/art/faces/w1.jpg",
  "/art/faces/w2.jpg",
  "/art/faces/w3.jpg",
  "/art/faces/w4.jpg",
  "/art/faces/w5.jpg",
  "/art/faces/w6.jpg",
  "/art/faces/w7.jpg",
  "/art/faces/w8.jpg",
  "/art/faces/w9.jpg",
  "/art/faces/w10.jpg",
];

export const manFaces = [
  "/art/faces/m1.jpg",
  "/art/faces/m2.jpg",
  "/art/faces/m3.jpg",
  "/art/faces/m4.jpg",
  "/art/faces/m5.jpg",
  "/art/faces/m6.jpg",
  "/art/faces/m7.jpg",
  "/art/faces/m8.jpg",
  "/art/faces/m9.jpg",
  "/art/faces/m10.jpg",
];

export function faceSrc(person: Star) {
  const pool = person.gender === "woman" ? womanFaces : manFaces;
  const same = stars.filter((star) => star.gender === person.gender);
  const index = Math.max(0, same.findIndex((star) => star.slug === person.slug));
  return pool[index % pool.length] ?? pool[0];
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

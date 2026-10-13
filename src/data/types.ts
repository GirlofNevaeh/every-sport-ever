export type Tag = "ball" | "water" | "ice" | "racquet" | "combat" | "wheels";

export type Family = "pitch" | "court" | "water" | "ice" | "mat" | "road";

export type Sport = {
  slug: string;
  name: string;
  aka: string[];
  tags: Tag[];
  family: Family;
  rules: string[];
  score: string;
  win: string;
  where: string;
  fact: string;
  quizScore: string;
  quizWhere: string;
};

export type Star = {
  slug: string;
  name: string;
  sports: string[];
  country: string;
  gender: "woman" | "man";
  para: boolean;
  specialOlympics: boolean;
  disabled: boolean;
  facts: [string, string];
};

export type MedalRow = {
  country: string;
  gold: number;
  silver: number;
  bronze: number;
};

import { readFileSync, writeFileSync } from "node:fs";

const lang = process.argv[2];
if (!lang) {
  console.error("Usage: node scripts/merge-locale.mjs <lang>");
  process.exit(1);
}

const source = JSON.parse(readFileSync(new URL("../src/i18n/source.json", import.meta.url), "utf8"));
const merged = {};
for (const part of [0, 1, 2, 3]) {
  const path = new URL(`../src/i18n/packs/${lang}-${part}.json`, import.meta.url);
  const chunk = JSON.parse(readFileSync(path, "utf8"));
  for (const [key, value] of Object.entries(chunk)) {
    if (typeof value !== "string" || !value.trim()) continue;
    merged[key] = value;
  }
}

const missing = source.filter((key) => !merged[key]);
const placeholders = ["{name}", "{count}", "{n}", "{asked}", "{total}", "{score}"];
const broken = source.filter((key) => {
  const value = merged[key];
  if (!value) return false;
  return placeholders.some((token) => key.includes(token) && !value.includes(token));
});

console.log(
  JSON.stringify(
    {
      lang,
      source: source.length,
      translated: Object.keys(merged).length,
      missing: missing.length,
      brokenPlaceholders: broken.length,
    },
    null,
    2,
  ),
);

if (missing.length || broken.length) {
  console.log("MISSING");
  for (const key of missing.slice(0, 30)) console.log(key);
  console.log("BROKEN");
  for (const key of broken.slice(0, 20)) console.log(key, "=>", merged[key]);
  process.exit(1);
}

writeFileSync(new URL(`../src/i18n/packs/${lang}.json`, import.meta.url), JSON.stringify(merged));

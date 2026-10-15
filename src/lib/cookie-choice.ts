export const COOKIE_CHOICE_KEY = "ese-cookie";
export const LANG_KEY = "ese-lang";

export type CookieChoice = "ok" | "no-lang";

export function readCookieChoice(): CookieChoice | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(COOKIE_CHOICE_KEY);
  return value === "ok" || value === "no-lang" ? value : null;
}

export function languageSaveAllowed() {
  return readCookieChoice() !== "no-lang";
}

export function writeCookieChoice(choice: CookieChoice) {
  window.localStorage.setItem(COOKIE_CHOICE_KEY, choice);
  if (choice === "no-lang") window.localStorage.removeItem(LANG_KEY);
}

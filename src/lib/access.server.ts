/** Server-only access keys. Set ACCESS_KEYS on the host (comma or newline separated). */

const MAX_AGE_MS = 400 * 24 * 60 * 60 * 1000;
const PREVIEW_KEY = "sport-preview";

function readConfigured(): string[] {
  const raw = process.env.ACCESS_KEYS ?? process.env.ACCESS_KEY ?? "";
  const seen = new Set<string>();
  for (const part of raw.split(/[\n,]+/)) {
    const key = part.trim();
    if (!key || key.length > 200) continue;
    seen.add(key);
  }
  return [...seen];
}

function isHosted(): boolean {
  return process.env.NODE_ENV === "production" || process.env.VERCEL === "1";
}

export function listKeys(): string[] {
  const configured = readConfigured();
  if (configured.length > 0) return configured;
  if (isHosted()) return [];
  return [PREVIEW_KEY];
}

function signingSecret(): string | null {
  const explicit = process.env.ACCESS_KEY_SECRET?.trim();
  if (explicit) return explicit;
  const keys = listKeys();
  if (!keys.length) return null;
  return keys.join("\n");
}

function safeEqual(a: string, b: string): boolean {
  const left = new TextEncoder().encode(a);
  const right = new TextEncoder().encode(b);
  const length = Math.max(left.length, right.length, 1);
  let diff = left.length ^ right.length;
  for (let index = 0; index < length; index += 1) {
    diff |= (left[index] ?? 0) ^ (right[index] ?? 0);
  }
  return diff === 0;
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/g, "");
}

function base64UrlToString(value: string): string {
  const pad = value.length % 4 === 0 ? "" : "=".repeat(4 - (value.length % 4));
  const binary = atob(value.replaceAll("-", "+").replaceAll("_", "/") + pad);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

async function hmac(secret: string, body: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body));
  return bytesToBase64Url(new Uint8Array(sig));
}

export async function unlockWithKey(key: string): Promise<{ ok: true; token: string } | { ok: false }> {
  const trimmed = key.trim();
  if (!trimmed || trimmed.length > 200) return { ok: false };
  const keys = listKeys();
  if (!keys.length) return { ok: false };
  let match = false;
  for (const item of keys) {
    if (safeEqual(item, trimmed)) match = true;
  }
  if (!match) return { ok: false };
  const secret = signingSecret();
  if (!secret) return { ok: false };
  const body = bytesToBase64Url(new TextEncoder().encode(JSON.stringify({ exp: Date.now() + MAX_AGE_MS })));
  const token = `${body}.${await hmac(secret, body)}`;
  return { ok: true, token };
}

export async function tokenIsValid(token: string): Promise<boolean> {
  if (typeof token !== "string" || token.length < 20 || token.length > 500) return false;
  const secret = signingSecret();
  if (!secret) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [body, mac] = parts;
  if (!body || !mac) return false;
  const expected = await hmac(secret, body);
  if (!safeEqual(expected, mac)) return false;
  try {
    const payload = JSON.parse(base64UrlToString(body)) as { exp?: unknown };
    if (typeof payload.exp !== "number" || !Number.isFinite(payload.exp)) return false;
    if (payload.exp <= Date.now()) return false;
    if (payload.exp > Date.now() + MAX_AGE_MS + 24 * 60 * 60 * 1000) return false;
    return true;
  } catch {
    return false;
  }
}

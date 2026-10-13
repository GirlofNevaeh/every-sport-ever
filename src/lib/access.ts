import { createServerFn } from "@tanstack/react-start";

export type UnlockResult = { ok: true; token: string } | { ok: false };

function readField(input: unknown, field: "key" | "token"): string {
  if (!input || typeof input !== "object" || !(field in input)) return "";
  const value = (input as Record<string, unknown>)[field];
  return typeof value === "string" ? value.slice(0, 500) : "";
}

export const unlockAccess = createServerFn({ method: "POST" })
  .validator((input: unknown) => ({ key: readField(input, "key") }))
  .handler(async ({ data }): Promise<UnlockResult> => {
    const { unlockWithKey } = await import("./access.server.ts");
    return unlockWithKey(data.key);
  });

export const checkAccess = createServerFn({ method: "POST" })
  .validator((input: unknown) => ({ token: readField(input, "token") }))
  .handler(async ({ data }): Promise<{ ok: boolean }> => {
    const { tokenIsValid } = await import("./access.server.ts");
    return { ok: await tokenIsValid(data.token) };
  });

import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const srcDir = fileURLToPath(new URL("../src/", import.meta.url));
const extensions = [".ts", ".tsx", ".mts", ".js", ".mjs", ".json"];

export async function resolve(specifier, context, nextResolve) {
  // Node's native ESM loader does not resolve Next's extensionless CJS entry.
  if (specifier === "next/server") {
    return nextResolve("next/server.js", context);
  }
  if (specifier.startsWith("@/")) {
    const base = join(srcDir, specifier.slice(2));
    const candidates = [base, ...extensions.map((ext) => `${base}${ext}`)];
    const hit = candidates.find((file) => existsSync(file));
    if (!hit) {
      throw new Error(`Cannot resolve ${specifier}`);
    }
    return nextResolve(pathToFileURL(hit).href, context);
  }
  return nextResolve(specifier, context);
}

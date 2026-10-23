import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

// The contact form is the only public way to reach Graham. Nothing in the site
// source may show an email address, a mailto: link, or a phone/tap-to-call link.
const SRC = new URL("../src/", import.meta.url).pathname;
const BANNED = [
  { label: "mailto: link", pattern: /mailto:/i },
  { label: "tel: link", pattern: /\btel:/i },
  { label: "sms: link", pattern: /\bsms:/i },
  { label: "grahamswash.com email address", pattern: /[a-z0-9._%+-]+@grahamswash\.com/i },
];

function sourceFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return /\.(tsx?|mjs|js|json|css)$/.test(name) ? [path] : [];
  });
}

test("site source has no email address, mailto:, tel:, or sms: link", () => {
  const hits = [];
  for (const file of sourceFiles(SRC)) {
    const text = readFileSync(file, "utf8");
    for (const { label, pattern } of BANNED) {
      if (pattern.test(text)) hits.push(`${file.replace(SRC, "src/")}: ${label}`);
    }
  }
  assert.deepEqual(hits, []);
});

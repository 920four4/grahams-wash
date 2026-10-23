import assert from "node:assert/strict";
import { test } from "node:test";

const { default: nextConfig } = await import("../next.config.ts");
const { default: sitemap } = await import("../src/app/sitemap.ts");

const APEX = "https://grahamswash.com";
const redirects = await nextConfig.redirects();
const livePaths = sitemap().map((entry) => new URL(entry.url).pathname);
const isWww = (rule) => rule.has?.some((item) => item.type === "host" && item.value === "www.grahamswash.com");
const wwwCatchAll = redirects.findIndex((rule) => isWww(rule) && rule.source === "/:path*");
const oldPathRules = redirects.filter((rule) => !rule.has);

test("sitemap lists only the 13 live pages", () => {
  assert.equal(livePaths.length, 13);
  for (const rule of redirects) {
    assert.ok(!livePaths.includes(rule.source), `${rule.source} is a live page and must not redirect`);
  }
});

test("every old URL goes straight to a live page in one 308", () => {
  for (const rule of oldPathRules) {
    assert.equal(rule.permanent, true);
    assert.ok(livePaths.includes(rule.destination), `${rule.source} -> ${rule.destination} is not a live page`);
  }
});

test("every old www URL goes straight to its final apex page, before the www catch-all", () => {
  assert.ok(wwwCatchAll >= 0, "www catch-all is missing");
  assert.equal(redirects[wwwCatchAll].destination, `${APEX}/:path*`);
  for (const rule of oldPathRules) {
    const index = redirects.findIndex((r) => isWww(r) && r.source === rule.source);
    assert.ok(index >= 0 && index < wwwCatchAll, `${rule.source} has no www rule ahead of the catch-all`);
    assert.equal(redirects[index].destination, `${APEX}${rule.destination}`);
    assert.equal(redirects[index].permanent, true);
  }
  // Hostless rules would also match www, so they must come after every www rule.
  const firstHostless = redirects.findIndex((rule) => !rule.has);
  assert.ok(firstHostless > wwwCatchAll);
});

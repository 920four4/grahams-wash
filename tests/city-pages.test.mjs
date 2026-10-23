import assert from "node:assert/strict";
import { test } from "node:test";

const { cityPages, cityPageHref, PLACEHOLDER, visibleIntro } = await import("../src/lib/city-pages.ts");
const { services } = await import("../src/lib/site.ts");
const { default: sitemap } = await import("../src/app/sitemap.ts");

const sentences = (text) =>
  text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim().toLowerCase())
    .filter((s) => s.length > 20 && !s.startsWith("[z to confirm"));

test("sitemap has the 13 existing pages plus the 3 city pages", () => {
  const paths = sitemap().map((entry) => new URL(entry.url).pathname);
  assert.equal(paths.length, 16);
  for (const slug of ["roseville", "lincoln", "granite-bay"]) {
    assert.ok(paths.includes(`/service-areas/${slug}`), `${slug} missing from sitemap`);
  }
  assert.equal(new Set(paths).size, paths.length);
});

test("titles and meta descriptions are unique across city and service pages", () => {
  const titles = [...cityPages.map((c) => c.metaTitle), ...services.map((s) => s.metaTitle)];
  const descriptions = [...cityPages.map((c) => c.metaDescription), ...services.map((s) => s.metaDescription)];
  assert.equal(new Set(titles).size, titles.length);
  assert.equal(new Set(descriptions).size, descriptions.length);
  for (const c of cityPages) {
    assert.ok(c.metaTitle.includes(c.name), `${c.slug} title should name the city`);
    assert.ok(c.metaDescription.includes(c.name), `${c.slug} description should name the city`);
  }
});

test("no sentence is copied between city pages", () => {
  const seen = new Map();
  for (const c of cityPages) {
    const text = [...c.intro, ...c.services.map((s) => s.text), ...c.notes.map((n) => n.text)].join(" ");
    for (const sentence of sentences(text)) {
      assert.ok(!seen.has(sentence) || seen.get(sentence) === c.slug, `"${sentence}" is on ${seen.get(sentence)} and ${c.slug}`);
      seen.set(sentence, c.slug);
    }
  }
});

test("each city page offers every service", () => {
  for (const c of cityPages) {
    assert.equal(cityPageHref(c.slug), `/service-areas/${c.slug}`);
    assert.deepEqual(c.services.map((s) => s.slug).sort(), services.map((s) => s.slug).sort());
  }
});

test("[Z TO CONFIRM] placeholders show on previews and never reach production", () => {
  for (const c of cityPages) {
    // Placeholders may only be whole intro paragraphs, so production can drop them cleanly.
    for (const text of [...c.services.map((s) => s.text), ...c.notes.map((n) => n.text), c.metaTitle, c.metaDescription]) {
      assert.ok(!PLACEHOLDER.test(text), `${c.slug}: placeholder outside the intro: ${text}`);
    }
    for (const p of c.intro) {
      assert.ok(!PLACEHOLDER.test(p) || p.replace(PLACEHOLDER, "").trim() === "", `${c.slug}: placeholder mixed into a paragraph`);
    }
    const production = visibleIntro(c, "production");
    assert.ok(production.length > 0);
    assert.ok(production.every((p) => !p.includes("Z TO CONFIRM")), `${c.slug} shows a placeholder in production`);
    assert.deepEqual(visibleIntro(c, "preview"), c.intro);
  }
});

#!/usr/bin/env node
/**
 * One-off: pull every Google review into src/data/google-reviews.json.
 * The site reads that file at build time — it does not call SerpAPI per request.
 *
 *   SERP_API_KEY=... npm run refresh:reviews
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
for (const file of [".env.local", ".env.serp"]) {
  const path = join(root, file);
  if (!existsSync(path)) continue;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const k = trimmed.slice(0, eq).trim();
    const v = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[k]) process.env[k] = v;
  }
}

const DATA_ID = "0x2cee486d6260f635:0xb4ba2d3b5caf5b45";
const OUT = join(dirname(fileURLToPath(import.meta.url)), "../src/data/google-reviews.json");

const apiKey = process.env.SERP_API_KEY || process.env.SERPAPI_API_KEY;
if (!apiKey) {
  console.error("Set SERP_API_KEY and run again.");
  process.exit(1);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function mapReview(r, index) {
  const text = r.extracted_snippet?.original?.trim() || r.snippet?.trim() || "";
  return {
    id: r.review_id || `review-${index}-${r.iso_date || r.date || index}`,
    author: r.user?.name?.trim() || "Google user",
    authorThumbnail: r.user?.thumbnail,
    authorLink: r.user?.link,
    isLocalGuide: Boolean(r.user?.local_guide),
    rating: typeof r.rating === "number" ? r.rating : 5,
    date: r.date || "",
    isoDate: r.iso_date,
    text,
    images: Array.isArray(r.images) ? r.images.filter(Boolean) : [],
    likes: r.likes || 0,
    link: r.link,
    response: r.response?.snippet
      ? {
          date: r.response.date || "",
          text: r.response.extracted_snippet?.original?.trim() || r.response.snippet.trim(),
        }
      : undefined,
  };
}

async function fetchPage(nextPageToken) {
  const url = new URL("https://serpapi.com/search.json");
  url.searchParams.set("engine", "google_maps_reviews");
  url.searchParams.set("data_id", DATA_ID);
  url.searchParams.set("hl", "en");
  url.searchParams.set("sort_by", "newestFirst");
  url.searchParams.set("api_key", apiKey);
  if (nextPageToken) {
    url.searchParams.set("next_page_token", nextPageToken);
    url.searchParams.set("num", "20");
  }
  const res = await fetch(url);
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data;
}

const all = [];
let topics = [];
let rating = 5;
let reviewCount = 48;
let token;
let page = 0;

do {
  if (page > 0) await sleep(1500);
  const data = await fetchPage(token);
  if (page === 0) {
    if (typeof data.place_info?.rating === "number") rating = data.place_info.rating;
    if (typeof data.place_info?.reviews === "number") reviewCount = data.place_info.reviews;
    topics = (data.topics || [])
      .filter((t) => t.keyword && typeof t.mentions === "number")
      .map((t) => ({ keyword: t.keyword, mentions: t.mentions }));
  }
  const batch = data.reviews || [];
  console.log(`page ${page + 1}: ${batch.length} reviews`);
  for (const r of batch) all.push(mapReview(r, all.length));
  token = data.serpapi_pagination?.next_page_token;
  page += 1;
} while (token && page < 12);

const seen = new Set();
const reviews = all.filter((r) => {
  if (seen.has(r.id)) return false;
  seen.add(r.id);
  return true;
});

const payload = {
  rating,
  reviewCount: Math.max(reviewCount, reviews.length),
  topics,
  reviews,
  fetchedAt: new Date().toISOString(),
  source: "snapshot",
};

writeFileSync(OUT, `${JSON.stringify(payload, null, 2)}\n`);
console.log(`Wrote ${reviews.length} reviews (Google count ${payload.reviewCount}) → ${OUT}`);
console.log("Commit src/data/google-reviews.json to update the live site.");

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Filter, Search, Star } from "lucide-react";
import type { GoogleReview, ReviewTopic } from "@/lib/google-reviews";
import { ReviewCard } from "@/components/ReviewCard";
import { StarRating } from "@/components/StarRating";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type FilterKey = "all" | "photos" | "long" | string;

export function ReviewsPageContent({
  reviews,
  topics,
  rating,
  reviewCount,
  mapsUrl,
}: {
  reviews: GoogleReview[];
  topics: ReviewTopic[];
  rating: number;
  reviewCount: number;
  mapsUrl: string;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");

  const topicFilters = topics.slice(0, 8);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return reviews.filter((r) => {
      if (filter === "photos" && r.images.length === 0) return false;
      if (filter === "long" && r.text.length < 120) return false;
      if (filter !== "all" && filter !== "photos" && filter !== "long") {
        if (!r.text.toLowerCase().includes(filter.toLowerCase())) return false;
      }
      if (!q) return true;
      return (
        r.text.toLowerCase().includes(q) ||
        r.author.toLowerCase().includes(q)
      );
    });
  }, [reviews, query, filter]);

  const withText = reviews.filter((r) => r.text.length > 0).length;
  const withPhotos = reviews.filter((r) => r.images.length > 0).length;

  return (
    <div>
      {/* Sticky trust strip on mobile */}
      <div className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-star/15 text-star">
              <Star className="h-7 w-7 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-3xl font-extrabold tracking-tight text-navy">
                  {rating.toFixed(1)}
                </span>
                <StarRating rating={rating} size="md" />
              </div>
              <p className="text-sm text-muted">
                {reviewCount} Google reviews · {withText} with written feedback
                {withPhotos > 0 ? ` · ${withPhotos} with photos` : ""}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button href="/contact" size="sm">
              Request a quote
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href={mapsUrl} external variant="outline" size="sm">
              Open on Google
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        {/* Intro */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">Customer stories</p>
          <h1 className="font-display mt-2 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
            Real Google reviews. Real results.
          </h1>
          <p className="mt-4 text-lg text-muted">
            Every review below is pulled live from Google. Scroll through what neighbors say about pressure washing,
            solar cleaning, bin wash, and permanent lights — then reach out when you&apos;re ready.
          </p>
        </div>

        {/* Topic chips */}
        {topicFilters.length > 0 && (
          <div className="mt-8">
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
              <Filter className="h-3.5 w-3.5" />
              People mention
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={cn(
                  "pressable rounded-full px-3.5 py-1.5 text-sm font-semibold transition",
                  filter === "all"
                    ? "bg-navy text-white"
                    : "bg-white text-navy ring-1 ring-border hover:border-brand",
                )}
              >
                All reviews
              </button>
              <button
                type="button"
                onClick={() => setFilter("photos")}
                className={cn(
                  "pressable rounded-full px-3.5 py-1.5 text-sm font-semibold transition",
                  filter === "photos"
                    ? "bg-navy text-white"
                    : "bg-white text-navy ring-1 ring-border",
                )}
              >
                With photos
              </button>
              {topicFilters.map((t) => (
                <button
                  key={t.keyword}
                  type="button"
                  onClick={() => setFilter(t.keyword)}
                  className={cn(
                    "pressable rounded-full px-3.5 py-1.5 text-sm font-semibold capitalize transition",
                    filter === t.keyword
                      ? "bg-brand text-white"
                      : "bg-white text-navy ring-1 ring-border hover:bg-brand-soft",
                  )}
                >
                  {t.keyword}
                  <span className="ml-1.5 opacity-60">{t.mentions}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search */}
        <div className="relative mt-6 max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search reviews…"
            className="w-full rounded-2xl border border-border bg-white py-3.5 pl-11 pr-4 text-[15px] text-navy placeholder:text-muted/60 shadow-sm focus:border-brand"
          />
        </div>

        <p className="mt-4 text-sm text-muted">
          Showing <span className="font-semibold text-navy">{filtered.length}</span> of {reviews.length} reviews
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-border bg-white px-6 py-16 text-center">
            <p className="font-display text-xl font-bold text-navy">No reviews match that filter</p>
            <p className="mt-2 text-muted">Try clearing search or picking another topic.</p>
            <Button className="mt-5" variant="secondary" onClick={() => { setQuery(""); setFilter("all"); }}>
              Reset filters
            </Button>
          </div>
        ) : (
          <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {filtered.map((review, i) => (
              <div key={review.id} className="mb-4 break-inside-avoid">
                <ReviewCard review={review} featured={i < 2 && filter === "all" && !query} />
              </div>
            ))}
          </div>
        )}

        {/* Mid-page CTA */}
        <div className="mt-14 overflow-hidden rounded-[2rem] bg-navy px-6 py-10 text-white sm:px-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand">Ready for results like these?</p>
              <h2 className="font-display mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Join the neighbors who already booked Graham
              </h2>
              <p className="mt-3 max-w-xl text-white/70">
                Pressure washing, solar panels, bins, or permanent lights — tell Graham what you need and how to reply.
                Clear communication. Quality work.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button href="/contact" size="lg" className="w-full">
                Request a quote
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                href="/services/pressure-washing"
                variant="outline"
                size="lg"
                className="w-full border-white/20 bg-white/5 text-white hover:bg-white/10"
              >
                Browse services
              </Button>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-muted">
          Reviews are sourced from{" "}
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand hover:underline">
            Google
          </a>
          . Want to leave one after your job? Graham will send a link when the work is done.{" "}
          <Link href="/contact" className="font-semibold text-brand hover:underline">
            Contact us
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

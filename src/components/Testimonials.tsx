import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { ReviewCard } from "@/components/ReviewCard";
import { getFeaturedReviews, getGoogleReviews, GOOGLE_PLACE } from "@/lib/google-reviews";

export async function Testimonials({ limit = 6 }: { limit?: number }) {
  const [items, summary] = await Promise.all([
    getFeaturedReviews(limit),
    getGoogleReviews(),
  ]);

  return (
    <section className="bg-navy py-16 text-white sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">Google reviews</p>
            <h2 className="font-display mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              What customers say
            </h2>
            <p className="mt-3 text-white/65">
              Real feedback from Google — homeowners around Rocklin and nearby cities who booked pressure washing,
              solar cleaning, bins, and permanent lights.
            </p>
          </div>
          <a
            href={GOOGLE_PLACE.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pressable inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 backdrop-blur"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-star/15 text-star">
              <Star className="h-6 w-6 fill-current" />
            </div>
            <div>
              <p className="text-2xl font-bold leading-none">{summary.rating.toFixed(1)}</p>
              <p className="text-xs text-white/60">{summary.reviewCount} Google reviews</p>
            </div>
          </a>
        </div>

        <div className="mt-10 flex gap-4 overflow-x-auto pb-2 no-scrollbar snap-x snap-mandatory sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3">
          {items.map((review) => (
            <div key={review.id} className="min-w-[85%] snap-start sm:min-w-0">
              <ReviewCard review={review} variant="dark" />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/reviews"
            className="pressable inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-navy shadow-lg transition hover:bg-white/95"
          >
            Read all {summary.reviewCount} Google reviews
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

import { Star } from "lucide-react";
import { site, testimonials } from "@/lib/site";

export function Testimonials({ limit }: { limit?: number }) {
  const items = limit ? testimonials.slice(0, limit) : testimonials;

  return (
    <section className="bg-navy py-16 text-white sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">Reviews</p>
            <h2 className="font-display mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              What customers say
            </h2>
            <p className="mt-3 text-white/65">
              Homeowners around Rocklin and nearby cities trust Graham for careful work, clear communication, and clean
              results you notice from the street.
            </p>
          </div>
          <a
            href={site.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pressable inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 backdrop-blur"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-star/15 text-star">
              <Star className="h-6 w-6 fill-current" />
            </div>
            <div>
              <p className="text-2xl font-bold leading-none">{site.googleRating.toFixed(1)}</p>
              <p className="text-xs text-white/60">{site.googleReviewCount} Google reviews</p>
            </div>
          </a>
        </div>

        <div className="mt-10 flex gap-4 overflow-x-auto pb-2 no-scrollbar snap-x snap-mandatory sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3">
          {items.map((t) => (
            <article
              key={`${t.name}-${t.city}`}
              className="min-w-[85%] snap-start rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur sm:min-w-0"
            >
              <div className="mb-4 flex gap-0.5 text-star">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-[15px] leading-relaxed text-white/90">&ldquo;{t.text}&rdquo;</p>
              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-xs text-white/50">{t.city}, CA</p>
                </div>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/70">
                  {t.service}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { BadgeCheck, Quote } from "lucide-react";
import type { GoogleReview } from "@/lib/google-reviews";
import { StarRating } from "@/components/StarRating";
import { cn } from "@/lib/utils";

export function ReviewCard({
  review,
  variant = "light",
  featured = false,
}: {
  review: GoogleReview;
  variant?: "light" | "dark";
  featured?: boolean;
}) {
  const dark = variant === "dark";

  return (
    <article
      className={cn(
        "group flex h-full flex-col rounded-[1.75rem] border p-5 sm:p-6 transition",
        dark
          ? "border-white/10 bg-white/[0.06] backdrop-blur"
          : "border-border bg-white shadow-sm hover:border-brand/25 hover:shadow-md hover:shadow-brand/5",
        featured && !dark && "sm:p-7 ring-1 ring-brand/15",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {review.authorThumbnail ? (
            <Image
              src={review.authorThumbnail}
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-white shadow-sm"
              unoptimized
            />
          ) : (
            <span
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                dark ? "bg-white/10 text-white" : "bg-brand-soft text-brand",
              )}
            >
              {review.author.charAt(0).toUpperCase()}
            </span>
          )}
          <div className="min-w-0">
            <p className={cn("truncate font-semibold", dark ? "text-white" : "text-navy")}>
              {review.author}
            </p>
            <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs">
              {review.isLocalGuide && (
                <span
                  className={cn(
                    "inline-flex items-center gap-1 font-medium",
                    dark ? "text-brand" : "text-brand",
                  )}
                >
                  <BadgeCheck className="h-3.5 w-3.5" />
                  Local Guide
                </span>
              )}
              {review.date && (
                <span className={dark ? "text-white/45" : "text-muted"}>{review.date}</span>
              )}
            </div>
          </div>
        </div>
        <Quote
          className={cn("h-5 w-5 shrink-0 opacity-40", dark ? "text-white" : "text-brand")}
          aria-hidden
        />
      </div>

      <div className="mt-4">
        <StarRating rating={review.rating} size="sm" />
      </div>

      {review.text ? (
        <p
          className={cn(
            "mt-3 flex-1 text-[15px] leading-relaxed",
            dark ? "text-white/90" : "text-navy/85",
            featured ? "sm:text-base" : "",
          )}
        >
          &ldquo;{review.text}&rdquo;
        </p>
      ) : (
        <p className={cn("mt-3 flex-1 text-sm italic", dark ? "text-white/50" : "text-muted")}>
          Left a {review.rating}-star rating on Google.
        </p>
      )}

      {review.images.length > 0 && (
        <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar">
          {review.images.slice(0, 4).map((src) => (
            <div
              key={src}
              className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-black/5"
            >
              <Image src={src} alt="" fill sizes="64px" className="object-cover" unoptimized />
            </div>
          ))}
        </div>
      )}

      {review.response?.text && (
        <div
          className={cn(
            "mt-4 rounded-2xl border px-3.5 py-3 text-sm",
            dark ? "border-white/10 bg-white/5 text-white/70" : "border-border bg-background text-muted",
          )}
        >
          <p className={cn("text-xs font-semibold uppercase tracking-wide", dark ? "text-brand" : "text-brand")}>
            Reply from Graham
          </p>
          <p className="mt-1 leading-relaxed">{review.response.text}</p>
        </div>
      )}

      <div className="mt-5 flex items-center justify-between border-t pt-4 border-inherit">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide",
            dark ? "text-white/40" : "text-muted",
          )}
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google review
        </span>
        {review.link && (
          <a
            href={review.link}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "text-xs font-semibold transition hover:underline",
              dark ? "text-white/55 hover:text-white" : "text-brand",
            )}
          >
            View
          </a>
        )}
      </div>
    </article>
  );
}

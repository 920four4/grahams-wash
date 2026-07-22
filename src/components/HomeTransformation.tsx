"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Button } from "@/components/ui/Button";
import type { Transformation } from "@/lib/transformations";

export function HomeTransformation({ item }: { item: Transformation }) {
  return (
    <section className="relative overflow-hidden border-y border-border bg-white py-16 sm:py-20">
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-navy/5 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
        <div className="order-2 lg:order-1">
          <BeforeAfterSlider
            beforeSrc={item.before}
            afterSrc={item.after}
            beforeAlt={`${item.title} — before`}
            afterAlt={`${item.title} — after`}
            aspectClass="aspect-[4/3]"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            autoPlayOnView
            idleAnimate
            showHint
          />
          <p className="mt-3 text-center text-xs text-muted sm:text-left">
            Interactive before & after · Drag the handle
          </p>
        </div>

        <div className="order-1 lg:order-2">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1.5 text-sm font-semibold text-brand">
            <Sparkles className="h-4 w-4" />
            See the difference
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            {item.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{item.subtitle}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Real job photos from Rocklin and nearby cities. Drag the slider to watch dirty turn clean — solar,
            driveways, bins, fences, and more.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/results" size="lg">
              All before & afters
              <ArrowRight className="h-5 w-5" />
            </Button>
            {item.serviceHref && (
              <Button href={item.serviceHref} variant="outline" size="lg">
                About this service
              </Button>
            )}
          </div>
          <Link
            href="/contact"
            className="mt-5 inline-flex text-sm font-semibold text-brand hover:underline"
          >
            Ready for your own transformation? Request a quote →
          </Link>
        </div>
      </div>
    </section>
  );
}

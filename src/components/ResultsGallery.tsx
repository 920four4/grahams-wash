"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Button } from "@/components/ui/Button";
import {
  categoryLabels,
  transformations,
  type TransformationCategory,
} from "@/lib/transformations";
import { cn } from "@/lib/utils";

type Filter = "all" | TransformationCategory;

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All results" },
  { id: "solar", label: categoryLabels.solar },
  { id: "pressure", label: categoryLabels.pressure },
  { id: "bins", label: categoryLabels.bins },
  { id: "exterior", label: categoryLabels.exterior },
];

export function ResultsGallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const [activeId, setActiveId] = useState(transformations[0]?.id);

  const list = useMemo(
    () =>
      filter === "all"
        ? transformations
        : transformations.filter((t) => t.category === filter),
    [filter],
  );

  const active = list.find((t) => t.id === activeId) || list[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      {/* Hero intro */}
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">Proof of work</p>
        <h1 className="font-display mt-2 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
          Before & after
        </h1>
        <p className="mt-4 text-lg text-muted">
          Drag each slider to reveal the clean result. Real jobs — solar panels, driveways, sidewalks, bins, fences,
          and more across Rocklin and the Greater Sacramento area.
        </p>
      </div>

      {/* Filters */}
      <div className="mt-8 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => {
              setFilter(f.id);
              const next = f.id === "all" ? transformations[0] : transformations.find((t) => t.category === f.id);
              if (next) setActiveId(next.id);
            }}
            className={cn(
              "pressable shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition",
              filter === f.id
                ? "bg-navy text-white shadow-md"
                : "bg-white text-navy ring-1 ring-border hover:bg-brand-soft",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Featured interactive stage */}
      {active && (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
          <div>
            <BeforeAfterSlider
              key={active.id}
              beforeSrc={active.before}
              afterSrc={active.after}
              beforeAlt={`${active.title} before`}
              afterAlt={`${active.title} after`}
              aspectClass={
                active.aspect === "portrait" ? "aspect-[3/4] sm:aspect-[4/5] lg:aspect-[4/3]" : "aspect-[4/3]"
              }
              autoPlayOnView
              idleAnimate
              priority
              sizes="(max-width: 1024px) 100vw, 65vw"
              showHint
            />
          </div>
          <div className="lg:sticky lg:top-24">
            <span className="inline-flex rounded-full bg-brand-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand">
              {categoryLabels[active.category]}
            </span>
            <h2 className="font-display mt-3 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              {active.title}
            </h2>
            <p className="mt-3 leading-relaxed text-muted">{active.subtitle}</p>
            <div className="mt-6 flex flex-col gap-3">
              {active.serviceHref && (
                <Button href={active.serviceHref} variant="secondary">
                  About this service
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
              <Button href="/contact">
                Get this result for your place
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted">
              Prefer a different surface?{" "}
              <Link href="/contact" className="font-semibold text-brand hover:underline">
                Tell Graham what needs cleaning
              </Link>
              .
            </p>
          </div>
        </div>
      )}

      {/* Thumbnail picker grid */}
      <div className="mt-12">
        <h3 className="font-display text-lg font-bold text-navy">Browse all transformations</h3>
        <p className="mt-1 text-sm text-muted">Tap any card to load it in the slider above.</p>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {list.map((item) => {
            const selected = active?.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveId(item.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={cn(
                  "pressable group relative overflow-hidden rounded-2xl border text-left transition",
                  selected
                    ? "border-brand ring-2 ring-brand/30 shadow-lg shadow-brand/10"
                    : "border-border bg-white hover:border-brand/40",
                )}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.after}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
                  <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-navy">
                    Before → After
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="text-[11px] text-white/70">{categoryLabels[item.category]}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary full-width showcases */}
      <div className="mt-16 space-y-14">
        <div className="text-center">
          <h3 className="font-display text-2xl font-bold text-navy sm:text-3xl">More side-by-side reveals</h3>
          <p className="mx-auto mt-2 max-w-xl text-muted">
            Each slider animates in as you scroll. Drag any handle for a closer look.
          </p>
        </div>
        {list.slice(0, 6).map((item, i) => (
          <div
            key={`stack-${item.id}`}
            className={cn(
              "grid items-center gap-6 lg:grid-cols-2 lg:gap-10",
              i % 2 === 1 && "lg:[&>*:first-child]:order-2",
            )}
          >
            <BeforeAfterSlider
              beforeSrc={item.before}
              afterSrc={item.after}
              beforeAlt={`${item.title} before`}
              afterAlt={`${item.title} after`}
              aspectClass="aspect-[4/3]"
              autoPlayOnView
              idleAnimate={i === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand">
                {categoryLabels[item.category]}
              </span>
              <h4 className="font-display mt-2 text-2xl font-bold text-navy">{item.title}</h4>
              <p className="mt-2 text-muted">{item.subtitle}</p>
              <Button href="/contact" className="mt-5" variant="outline" size="sm">
                Request a similar job
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

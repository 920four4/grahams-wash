import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Graham's Wash | One-Man Quality in Rocklin CA",
  description:
    "Meet Graham—Rocklin-based exterior cleaning with pro equipment, careful surface methods, and neighbor-level service across Placer & Sacramento County.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "Quality over volume",
    body: "This isn't a crew farm racing through neighborhoods. Graham shows up, does careful work, and stands behind the result.",
  },
  {
    title: "The right tool for the surface",
    body: "Hot water when grease needs it. Soft wash when paint needs care. Pure filtered water and a soft brush on solar glass.",
  },
  {
    title: "Easy to reach",
    body: "Call or text the same number. Photos welcome. Straight answers on timing and price—no runaround.",
  },
  {
    title: "Local, for real",
    body: "Based in Rocklin. Serving neighbors across Greater Sacramento. Often same-day or next-day when the schedule allows.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">About</p>
            <h1 className="font-display mt-2 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
              One man. Serious equipment. Neighbor-level care.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Graham&apos;s Wash is a locally owned exterior cleaning business based in {site.city}, California. The goal
              is simple: leave every driveway, panel array, bin set, and roofline better than he found it—without the
              corporate theater.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Years of hands-on work went into learning which messes need heat, which surfaces hate high pressure, and
              how to deliver results that make people stop and look from the street. The investment is in specialized
              gear and doing the job right the first time.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact" size="lg">
                Work with Graham
              </Button>
              <Button href={`tel:${site.phoneTel}`} variant="outline" size="lg">
                {site.phoneDisplay}
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border shadow-xl sm:aspect-square lg:aspect-[4/5]">
            <Image
              src="/images/pressure/house-clean.webp"
              alt="Professional exterior cleaning results from Graham's Wash"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 to-transparent p-6 text-white">
              <p className="font-display text-xl font-bold">Wash. Refresh. Repeat.</p>
              <p className="mt-1 text-sm text-white/75">Rocklin · Greater Sacramento</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight text-navy">How Graham works</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="rounded-3xl border border-border bg-background p-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-brand" />
                  <h3 className="font-display text-lg font-bold text-navy">{v.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">The promise</p>
        <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
          Show up when promised. Exceed expectations. Leave you satisfied.
        </h2>
        <p className="mt-4 text-muted">
          No gunk left behind. That&apos;s the guarantee—backed by a {site.googleRating.toFixed(1)} Google rating from{" "}
          {site.googleReviewCount} reviews.
        </p>
      </section>

      <CtaBand title="Want Graham on your next job?" subtitle="Pressure wash, solar, bins, or permanent lights—reach out and we'll get it on the calendar." />
    </>
  );
}

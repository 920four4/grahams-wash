import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Graham's Wash | Local Pressure Washing in Rocklin CA",
  description:
    "Meet Graham — Rocklin-based exterior cleaning focused on quality work, careful methods, and clear communication across Placer and Sacramento County.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "Quality over volume",
    body: "This isn’t a crew racing through neighborhoods. Graham shows up, does careful work, and stands behind the result.",
  },
  {
    title: "The right method for the surface",
    body: "Hot water when grease needs it. A gentler wash when paint needs care. Soft brush and pure water on solar glass.",
  },
  {
    title: "Easy to reach",
    body: "Use the contact form, choose how you want to hear back, and get a clear answer on timing and price.",
  },
  {
    title: "Local, for real",
    body: "Based in Rocklin. Serving neighbors across Greater Sacramento. Often same day or next day when the schedule allows.",
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
              One operator. Solid equipment. Careful work.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Graham&apos;s Wash is a locally owned exterior cleaning business based in {site.city}, California. The
              goal is simple: leave every driveway, panel array, bin set, and roofline better than he found it.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Years of hands-on work went into learning which messes need heat, which surfaces dislike high pressure, and
              how to deliver results you notice from the street — without cutting corners.
            </p>
            <div className="mt-8">
              <Button href="/contact" size="lg">
                Request a quote
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border shadow-xl sm:aspect-square lg:aspect-[4/5]">
            <Image
              src="/images/pressure/house-clean.webp"
              alt="Professional exterior cleaning results from Graham's Wash in Rocklin"
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
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">The standard</p>
        <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
          Show up when promised. Do careful work. Leave you satisfied.
        </h2>
        <p className="mt-4 text-muted">
          Backed by a {site.googleRating.toFixed(1)} Google rating from {site.googleReviewCount} reviews.
        </p>
      </section>

      <CtaBand
        title="Want Graham on your next job?"
        subtitle="Pressure wash, solar, bins, or permanent lights — send a request through the contact form."
      />
    </>
  );
}

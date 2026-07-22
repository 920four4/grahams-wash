import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { services, cities, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Service Areas | Rocklin, Roseville, Lincoln & Sacramento Area",
  description:
    "Graham's Wash serves Rocklin and 20+ nearby cities—pressure washing, solar, bins, permanent lights. See if we cover your neighborhood.",
  alternates: { canonical: "/service-areas" },
};

export default function ServiceAreasPage() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">Service areas</p>
          <h1 className="font-display mt-2 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
            Based in Rocklin. Happy to help the neighborhood.
          </h1>
          <p className="mt-4 text-lg text-muted">
            Graham lives in {site.city} and regularly serves homes across Placer County and northern Sacramento County—a
            practical ~20–30 mile radius depending on the job. Outside the list? Reach out anyway.
          </p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <div
              key={city}
              className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-4 shadow-sm"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <MapPin className="h-4 w-4" />
              </span>
              <div>
                <p className="font-semibold text-navy">{city}</p>
                <p className="text-xs text-muted">Pressure · Solar · Bins · Lights</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-[2rem] border border-border bg-white p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold text-navy">Services available across the area</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={s.href}
                  className="flex items-center justify-between rounded-2xl border border-border px-4 py-3 text-sm font-semibold text-navy transition hover:border-brand/30 hover:bg-brand-soft/40"
                >
                  {s.name}
                  <span className="text-brand">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <CtaBand
        title="In the zone?"
        subtitle="Tell Graham your city and what needs cleaning—or lighting—and he'll confirm availability fast."
      />
    </>
  );
}

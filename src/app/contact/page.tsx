import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Graham's Wash | Request a Quote Online",
  description:
    "Request pressure washing, solar cleaning, bin wash, or permanent lights in Rocklin and nearby cities. Send a message online and Graham will get back to you.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const params = await searchParams;
  const defaultService = params.service;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">Contact</p>
        <h1 className="font-display mt-2 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
          Request a quote
        </h1>
        <p className="mt-4 text-lg text-muted">
          Tell Graham what you need — pressure washing, solar cleaning, bin wash, or permanent lights. Leave your
          preferred way to hear back (including text), and you&apos;ll get a clear reply.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.2fr] lg:gap-12">
        <aside className="space-y-4">
          <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
            <h2 className="font-display text-lg font-bold text-navy">How it works</h2>
            <ol className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand">
                  1
                </span>
                <span>Pick a service and share a few details about the job.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand">
                  2
                </span>
                <span>Choose how you want Graham to reply — text, call, or email.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand">
                  3
                </span>
                <span>Get timing and a straightforward quote for {site.city} and nearby cities.</span>
              </li>
            </ol>
          </div>

          <div className="rounded-3xl bg-navy p-6 text-white">
            <p className="font-display text-xl font-bold">Photos help</p>
            <p className="mt-2 text-sm text-white/70">
              If you can, mention the surface, approximate size, or issues you&apos;re seeing (oil stains, dirty panels,
              smelly bins, 1- or 2-story roofline). Graham will follow up with the contact method you choose.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-brand-soft/50 p-6">
            <p className="text-sm font-semibold text-navy">Service area</p>
            <p className="mt-1 text-sm text-muted">
              Rocklin-based, serving Roseville, Lincoln, Loomis, Granite Bay, Folsom, and more across the Greater
              Sacramento area.
            </p>
          </div>
        </aside>

        <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-sm sm:p-8">
          <h2 className="font-display text-2xl font-bold text-navy">Contact form</h2>
          <p className="mt-1 text-sm text-muted">All requests go through this form so nothing gets lost.</p>
          <div className="mt-6">
            <ContactForm defaultService={defaultService} />
          </div>
        </div>
      </div>
    </div>
  );
}

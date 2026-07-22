import type { Metadata } from "next";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Graham's Wash | Call or Text 916-591-4058",
  description:
    "Book pressure washing, solar cleaning, bin wash, or permanent lights. Fast replies by call, text, or email service@grahamswash.com. Rocklin based.",
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
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">Let&apos;s talk</p>
        <h1 className="font-display mt-2 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
          Book your service with Graham
        </h1>
        <p className="mt-4 text-lg text-muted">
          Ready for a spotless shine—or permanent lights that actually wow? Reach out and get a straightforward quote.
          One person. Clear communication. Quality work.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
        <aside className="space-y-4">
          <a
            href={`tel:${site.phoneTel}`}
            className="pressable flex items-center gap-4 rounded-3xl border border-border bg-white p-5 shadow-sm transition hover:border-brand/30"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white">
              <Phone className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-medium text-muted">Call</p>
              <p className="text-lg font-bold text-navy">{site.phoneDisplay}</p>
            </div>
          </a>
          <a
            href={`sms:${site.phoneTel}`}
            className="pressable flex items-center gap-4 rounded-3xl border border-border bg-white p-5 shadow-sm transition hover:border-brand/30"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-brand">
              <MessageCircle className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-medium text-muted">Text (same number)</p>
              <p className="text-lg font-bold text-navy">{site.phoneDisplay}</p>
            </div>
          </a>
          <a
            href={`mailto:${site.email}?subject=Requesting%20Service`}
            className="pressable flex items-center gap-4 rounded-3xl border border-border bg-white p-5 shadow-sm transition hover:border-brand/30"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-white">
              <Mail className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-medium text-muted">Email</p>
              <p className="text-lg font-bold text-navy break-all">{site.email}</p>
            </div>
          </a>

          <div className="rounded-3xl bg-navy p-6 text-white">
            <p className="font-display text-xl font-bold">Prefer the fast lane?</p>
            <p className="mt-2 text-sm text-white/70">
              Most people text a couple photos of the driveway, bins, panels, or roofline. Graham replies with next steps
              and timing—often same or next day.
            </p>
          </div>
        </aside>

        <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-sm sm:p-8">
          <h2 className="font-display text-2xl font-bold text-navy">Request a quote</h2>
          <p className="mt-1 text-sm text-muted">Pick a service so Graham knows how to help.</p>
          <div className="mt-6">
            <ContactForm defaultService={defaultService} />
          </div>
        </div>
      </div>
    </div>
  );
}

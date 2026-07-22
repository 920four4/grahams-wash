import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Thermometer } from "lucide-react";
import { CityPills } from "@/components/CityPills";
import { CtaBand } from "@/components/CtaBand";
import { FaqAccordion } from "@/components/FaqAccordion";
import { HomeTransformation } from "@/components/HomeTransformation";
import { FaqJsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCards } from "@/components/ServiceCards";
import { Testimonials } from "@/components/Testimonials";
import { TrustBar } from "@/components/TrustBar";
import { Button } from "@/components/ui/Button";
import { getGoogleReviews } from "@/lib/google-reviews";
import { faqs } from "@/lib/site";
import { getFeaturedTransformations, getHomeHeroTransformation } from "@/lib/transformations";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";

const homeFaqs = faqs.filter((f) =>
  [
    "What cities do you service?",
    "What can you pressure wash?",
    "How quickly can you schedule a job?",
    "Is pressure washing safe for my home?",
    "How much does it cost?",
    "Do you offer neighbor or group discounts?",
  ].includes(f.question),
);

export default async function HomePage() {
  const google = await getGoogleReviews();
  const heroTransform = getHomeHeroTransformation();
  const featuredTransforms = getFeaturedTransformations(4);

  return (
    <>
      <FaqJsonLd items={homeFaqs} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/neighborhood.webp"
            alt="Professional pressure washing results on a Rocklin CA home exterior"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
          <div className="hero-grain absolute inset-0" />
        </div>

        <div className="relative mx-auto flex min-h-[min(88vh,760px)] max-w-6xl flex-col justify-end px-4 pb-14 pt-24 sm:px-6 sm:pb-20 sm:pt-28">
          <div className="max-w-2xl">
            <a
              href="/reviews"
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90 backdrop-blur transition hover:bg-white/15"
            >
              <span className="flex h-5 items-center gap-1 rounded-full bg-star/20 px-2 text-star">
                ★ {google.rating.toFixed(1)}
              </span>
              {google.reviewCount} Google reviews · Rocklin, CA
            </a>
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Pressure Washing in Rocklin, CA
              <span className="mt-2 block text-brand">Hot wash. Solar. Bins. Lights.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Graham&apos;s Wash is a locally owned exterior cleaning service for Rocklin and the Greater Sacramento
              area. Quality pressure washing, solar panel cleaning, trash bin cleaning, and permanent Christmas lights —
              done carefully by one person who cares about the result.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/contact" size="lg" className="w-full sm:w-auto">
                Request a free quote
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                href="/results"
                variant="outline"
                size="lg"
                className="w-full border-white/25 bg-white/10 text-white backdrop-blur hover:bg-white/20 sm:w-auto"
              >
                See before & after
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/75">
              {["Hot water up to 210°F", "Often same or next day", "Serving Rocklin & nearby cities"].map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Flagship interactive transformation */}
      <HomeTransformation item={heroTransform} />

      {/* Services */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="Services"
          title="What we clean — and install"
          description="Four services from one local operator. Book one job or combine a few while Graham is already at your place."
        />
        <div className="mt-10">
          <ServiceCards />
        </div>
      </section>

      {/* Why hot water */}
      <section className="border-y border-border bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <BeforeAfterSlider
              beforeSrc="/images/compare/sidewalk-before.webp"
              afterSrc="/images/compare/sidewalk-after.webp"
              beforeAlt="Sidewalk before pressure washing"
              afterAlt="Sidewalk after pressure washing"
              aspectClass="aspect-[4/3]"
              autoPlayOnView
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-sm font-semibold text-brand">
              <Thermometer className="h-4 w-4" />
              Hot pressure washing
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Hot water makes a real difference on oil and grease.
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              Driveway oil, garage grease, and stubborn buildup respond better when heat is part of the process. Graham
              uses equipment that can heat water to 210°F when the job needs it — and a gentler approach when surfaces
              like paint or siding need care instead of force.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Driveways, sidewalks, patios, and concrete",
                "Fences, gates, decks, and siding",
                "Softer methods when paint or wood need protection",
                "Residential and small commercial work",
              ].map((line) => (
                <li key={line} className="flex items-start gap-2 text-sm font-medium text-navy">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {line}
                </li>
              ))}
            </ul>
            <Button href="/services/pressure-washing" className="mt-8" variant="secondary">
              Pressure washing details
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* More interactive results teaser */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Results you can drag"
            title="More before & after"
            description="Tap into the full gallery for solar, bins, fences, and concrete — every slider is interactive."
          />
          <Link
            href="/results"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand hover:underline"
          >
            Open full results page <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {featuredTransforms
            .filter((t) => t.id !== heroTransform.id)
            .slice(0, 4)
            .map((t) => (
              <div key={t.id} className="space-y-3">
                <BeforeAfterSlider
                  beforeSrc={t.before}
                  afterSrc={t.after}
                  beforeAlt={`${t.title} before`}
                  afterAlt={`${t.title} after`}
                  aspectClass="aspect-[4/3]"
                  autoPlayOnView
                  showHint={false}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="px-1">
                  <p className="font-semibold text-navy">{t.title}</p>
                  <p className="text-sm text-muted">{t.subtitle}</p>
                </div>
              </div>
            ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/results" size="lg">
            Explore all transformations
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Lights teaser */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/lights-hero.webp"
            alt="Permanent Christmas lights on a home in the Rocklin area"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-navy/75" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">Permanent holiday lights</p>
            <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Permanent Christmas lights that stay up year-round
            </h2>
            <p className="mt-3 text-white/75">
              Low profile during the day. Bright when you want them. Change colors for Christmas, holidays, or everyday
              warm white — without climbing the ladder every December.
            </p>
            <Button href="/services/permanent-christmas-lights" className="mt-7" size="lg">
              Permanent lights details
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <Testimonials limit={6} />

      {/* Service area */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="Service area"
          title="Based in Rocklin. Serving the Greater Sacramento area."
          description="Homes across Placer County and northern Sacramento County. If you’re close and not sure you’re covered, ask through the contact form."
        />
        <div className="mt-8">
          <CityPills limit={12} />
        </div>
        <Link href="/service-areas" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand">
          Full service area list <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeading
            align="center"
            eyebrow="FAQ"
            title="Common questions"
            description="Clear answers about scheduling, safety, pricing, and service areas."
          />
          <div className="mt-10">
            <FaqAccordion items={homeFaqs} />
          </div>
          <p className="mt-6 text-center text-sm text-muted">
            More on the{" "}
            <Link href="/faq" className="font-semibold text-brand">
              full FAQ page
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

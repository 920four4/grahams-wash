import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle, Phone, Thermometer } from "lucide-react";
import { BeforeAfterGrid } from "@/components/BeforeAfterGrid";
import { CityPills } from "@/components/CityPills";
import { CtaBand } from "@/components/CtaBand";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FaqJsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCards } from "@/components/ServiceCards";
import { Testimonials } from "@/components/Testimonials";
import { TrustBar } from "@/components/TrustBar";
import { Button } from "@/components/ui/Button";
import { faqs, site } from "@/lib/site";

const homeFaqs = faqs.filter((f) =>
  [
    "What cities do you service?",
    "What can you power wash?",
    "How fast is the service?",
    "Is it safe for my surfaces?",
    "How much do you charge?",
    "Do you offer neighbor or group discounts?",
  ].includes(f.question),
);

export default function HomePage() {
  return (
    <>
      <FaqJsonLd items={homeFaqs} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/neighborhood.webp"
            alt="Clean residential exterior after professional washing in Rocklin"
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
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90 backdrop-blur">
              <span className="flex h-5 items-center gap-1 rounded-full bg-star/20 px-2 text-star">★ {site.googleRating.toFixed(1)}</span>
              {site.googleReviewCount} Google reviews · Rocklin, CA
            </div>
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Spotless exteriors.
              <span className="block text-brand">Neighbor-level service.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Graham&apos;s Wash is a one-man, quality-first operation serving {site.serviceAreaLabel}. Hot pressure
              washing, pure-water solar cleaning, bin wash, and permanent holiday lights—done carefully, done right.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/contact" size="lg" className="w-full sm:w-auto">
                Get a free quote
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                href={`tel:${site.phoneTel}`}
                variant="outline"
                size="lg"
                className="w-full border-white/25 bg-white/10 text-white backdrop-blur hover:bg-white/20 sm:w-auto"
                icon={<Phone className="h-5 w-5" />}
              >
                Call {site.phoneDisplay}
              </Button>
              <Button
                href={`sms:${site.phoneTel}`}
                variant="outline"
                size="lg"
                className="w-full border-white/25 bg-white/10 text-white backdrop-blur hover:bg-white/20 sm:hidden"
                icon={<MessageCircle className="h-5 w-5" />}
              >
                Text Graham
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/75">
              {["Hot water up to 210°F", "Often same / next day", "Text-friendly booking"].map((item) => (
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

      {/* Services */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="What Graham cleans"
          title="Keep your spaces clean… really clean."
          description="Four services. One trusted local. Pick what you need—or bundle a few while he's already on site."
        />
        <div className="mt-10">
          <ServiceCards />
        </div>
      </section>

      {/* Why hot water */}
      <section className="border-y border-border bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-xl">
            <Image
              src="/images/before-after/driveway-levi.webp"
              alt="Before and after driveway pressure washing"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-sm font-semibold text-brand">
              <Thermometer className="h-4 w-4" />
              Hot pressure washing
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Cold water can&apos;t touch what 210°F handles.
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              Oil on the driveway. Grease by the garage. Years of irrigation stains. Graham invests in specialized
              equipment—including systems that heat water to 210°F—so the job isn&apos;t just &ldquo;wet and hope.&rdquo;
              Delicate surfaces get soft wash or pure-water methods instead of max PSI.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Driveways, sidewalks, patios & concrete",
                "Fences, gates, decks & siding",
                "Soft wash when paint or wood needs care",
                "Commercial exteriors welcome too",
              ].map((line) => (
                <li key={line} className="flex items-start gap-2 text-sm font-medium text-navy">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {line}
                </li>
              ))}
            </ul>
            <Button href="/services/pressure-washing" className="mt-8" variant="secondary">
              Explore pressure washing
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Before / after */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="Proof in the photos"
          title="Before we came. After we left."
          description="Hot pressure systems and careful technique take care of the underlying gunk—so it looks brand new when the job is done."
        />
        <div className="mt-10">
          <BeforeAfterGrid />
        </div>
      </section>

      {/* Lights teaser */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/lights-hero.webp"
            alt="Permanent Christmas lights on a Rocklin home at night"
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
              Lights that make a difference—year round.
            </h2>
            <p className="mt-3 text-white/75">
              Discreet by day. Spectacular at night. Change colors for Christmas, game day, or any holiday without
              another ladder night.
            </p>
            <Button href="/services/permanent-christmas-lights" className="mt-7" size="lg">
              See permanent lights
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <Testimonials limit={6} />

      {/* Service area */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="Where Graham works"
          title="Rocklin home base. Greater Sacramento reach."
          description="Proudly serving neighbors across Placer County and northern Sacramento County. Not sure if you're in the zone? Just ask."
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
            title="Got questions? Straight answers."
            description="No corporate fluff—just how Graham works."
          />
          <div className="mt-10">
            <FaqAccordion items={homeFaqs} />
          </div>
          <p className="mt-6 text-center text-sm text-muted">
            More answers on the{" "}
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

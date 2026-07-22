import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FaqJsonLd, ServiceJsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { Testimonials } from "@/components/Testimonials";
import { Button } from "@/components/ui/Button";
import { faqs, services, site, type ServiceSlug } from "@/lib/site";

const faqByService: Record<ServiceSlug, string[]> = {
  "pressure-washing": [
    "What can you power wash?",
    "Is it safe for my surfaces?",
    "Soft wash vs. pressure washing—which do I need?",
    "Can you remove oil stains from concrete?",
    "How fast is the service?",
    "How much do you charge?",
  ],
  "solar-panel-cleaning": [
    "How often should solar panels be cleaned in the Sacramento area?",
    "Will solar cleaning void my panel warranty?",
    "Is it safe for my surfaces?",
    "Do I need to be home for service?",
    "How much do you charge?",
  ],
  "trash-bin-cleaning": [
    "Do you clean inside and outside the trash bins?",
    "Do I need to be home for service?",
    "How fast is the service?",
    "Do you offer neighbor or group discounts?",
    "How much do you charge?",
  ],
  "permanent-christmas-lights": [
    "What type of lights do you install?",
    "Can permanent lights be used year-round?",
    "How do permanent installs differ from temporary Christmas hanging?",
    "What cities do you service?",
    "How much do you charge?",
  ],
};

export function ServicePage({ slug }: { slug: ServiceSlug }) {
  const service = services.find((s) => s.slug === slug)!;
  const related = services.filter((s) => s.slug !== slug);
  const serviceFaqs = faqs.filter((f) => faqByService[slug].includes(f.question));

  return (
    <>
      <ServiceJsonLd name={service.name} description={service.longDescription} url={service.href} />
      <FaqJsonLd items={serviceFaqs} />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={service.image}
            alt={service.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/45" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">Service</p>
          <h1 className="font-display mt-2 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {service.headline}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">{service.longDescription}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={`/contact?service=${service.slug}`} size="lg">
              Get a quote
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              href={`tel:${site.phoneTel}`}
              variant="outline"
              size="lg"
              className="border-white/25 bg-white/10 text-white hover:bg-white/20"
              icon={<Phone className="h-5 w-5" />}
            >
              {site.phoneDisplay}
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Why it matters"
              title={`Quality-first ${service.shortName.toLowerCase()}`}
              description="One careful operator, pro equipment, and methods matched to the surface—not a race for the lowest bid."
            />
            <ul className="mt-8 space-y-3">
              {service.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4 shadow-sm">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  <span className="font-medium text-navy">{h}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {service.gallery.slice(0, 4).map((src, i) => (
              <div
                key={src}
                className={`relative overflow-hidden rounded-2xl border border-border ${i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"}`}
              >
                <Image
                  src={src}
                  alt={`${service.name} work sample ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {service.gallery.length > 4 && (
        <section className="border-y border-border bg-white py-14 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading eyebrow="Gallery" title="Recent work" />
            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {service.gallery.slice(4).map((src, i) => (
                <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
                  <Image
                    src={src}
                    alt={`${service.name} gallery ${i + 5}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16">
        <SectionHeading align="center" eyebrow="FAQ" title={`Questions about ${service.shortName.toLowerCase()}`} />
        <div className="mt-8">
          <FaqAccordion items={serviceFaqs} />
        </div>
      </section>

      <Testimonials limit={3} />

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <SectionHeading eyebrow="Also available" title="Bundle while Graham is on site" />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {related.map((s) => (
            <Link
              key={s.slug}
              href={s.href}
              className="pressable rounded-3xl border border-border bg-white p-5 shadow-sm transition hover:border-brand/30"
            >
              <p className="font-display text-lg font-bold text-navy">{s.name}</p>
              <p className="mt-1 text-sm text-muted">{s.blurb}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                Learn more <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand
        title={`Ready for ${service.shortName.toLowerCase()}?`}
        subtitle="Text photos if you have them—Graham will get back with timing and a fair quote."
      />
    </>
  );
}

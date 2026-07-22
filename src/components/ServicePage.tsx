import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { CtaBand } from "@/components/CtaBand";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FaqJsonLd, ServiceJsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { Testimonials } from "@/components/Testimonials";
import { Button } from "@/components/ui/Button";
import { faqs, services, type ServiceSlug } from "@/lib/site";
import { transformations } from "@/lib/transformations";

const faqByService: Record<ServiceSlug, string[]> = {
  "pressure-washing": [
    "What can you pressure wash?",
    "Is pressure washing safe for my home?",
    "What’s the difference between soft wash and pressure washing?",
    "Can you remove oil stains from a driveway?",
    "How quickly can you schedule a job?",
    "How much does it cost?",
  ],
  "solar-panel-cleaning": [
    "How often should solar panels be cleaned around Sacramento?",
    "Is solar panel cleaning safe for my warranty?",
    "Is pressure washing safe for my home?",
    "Do I need to be home?",
    "How much does it cost?",
  ],
  "trash-bin-cleaning": [
    "Do you clean inside and outside trash bins?",
    "Do I need to be home?",
    "How quickly can you schedule a job?",
    "Do you offer neighbor or group discounts?",
    "How much does it cost?",
  ],
  "permanent-christmas-lights": [
    "What kind of permanent lights do you install?",
    "Can permanent lights stay up all year?",
    "How is this different from temporary Christmas lights?",
    "What cities do you service?",
    "How much does it cost?",
  ],
};

const categoryBySlug: Partial<Record<ServiceSlug, "solar" | "pressure" | "bins" | "exterior">> = {
  "pressure-washing": "pressure",
  "solar-panel-cleaning": "solar",
  "trash-bin-cleaning": "bins",
};

export function ServicePage({ slug }: { slug: ServiceSlug }) {
  const service = services.find((s) => s.slug === slug)!;
  const related = services.filter((s) => s.slug !== slug);
  const serviceFaqs = faqs.filter((f) => faqByService[slug].includes(f.question));
  const cat = categoryBySlug[slug];
  const transform =
    transformations.find((t) => t.category === cat && t.featured) ||
    transformations.find((t) => t.category === cat);

  return (
    <>
      <ServiceJsonLd name={service.name} description={service.longDescription} url={service.href} />
      <FaqJsonLd items={serviceFaqs} />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src={service.image} alt={service.name} fill priority sizes="100vw" className="object-cover" />
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
              Request a quote
              <ArrowRight className="h-5 w-5" />
            </Button>
            {transform && (
              <Button
                href="/results"
                variant="outline"
                size="lg"
                className="border-white/25 bg-white/10 text-white hover:bg-white/20"
              >
                See before & after
              </Button>
            )}
          </div>
        </div>
      </section>

      {transform && (
        <section className="border-b border-border bg-white py-12 sm:py-16">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2">
            <BeforeAfterSlider
              beforeSrc={transform.before}
              afterSrc={transform.after}
              beforeAlt={`${transform.title} before`}
              afterAlt={`${transform.title} after`}
              aspectClass="aspect-[4/3]"
              autoPlayOnView
              idleAnimate
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand">Before & after</p>
              <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-navy">
                {transform.title}
              </h2>
              <p className="mt-3 text-muted leading-relaxed">{transform.subtitle}</p>
              <p className="mt-3 text-sm text-muted">Drag the handle to reveal the clean result.</p>
              <Button href="/results" variant="secondary" className="mt-6">
                More transformations
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Why it matters"
              title={`${service.shortName} done carefully`}
              description="One operator, the right equipment, and methods matched to the surface — quality over rushing the job."
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
        <SectionHeading eyebrow="Also available" title="Other services from Graham" />
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
        subtitle="Use the contact form — share a few details or photos if you have them, and Graham will reply with next steps."
      />
    </>
  );
}

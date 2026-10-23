import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbJsonLd, CityServiceJsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/Button";
import { cityPageHref, cityPages, getCityPage } from "@/lib/city-pages";
import { services } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return cityPages.map((c) => ({ city: c.slug }));
}

type Props = { params: Promise<{ city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getCityPage((await params).city);
  if (!page) return {};
  const href = cityPageHref(page.slug);
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: href },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: href,
      images: [page.heroImage],
    },
  };
}

export default async function CityPage({ params }: Props) {
  const page = getCityPage((await params).city);
  if (!page) notFound();

  const href = cityPageHref(page.slug);
  const heroAlt =
    services.flatMap((s) => s.gallery).find((g) => g.src === page.heroImage)?.alt || "Graham's Wash job photo";
  const otherCities = cityPages.filter((c) => c.slug !== page.slug);

  return (
    <>
      <CityServiceJsonLd
        city={page.name}
        placeType={page.placeType}
        county={page.county}
        title={page.metaTitle}
        description={page.metaDescription}
        url={href}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Service areas", href: "/service-areas" },
          { name: page.name, href },
        ]}
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src={page.heroImage} alt={heroAlt} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/85 to-navy/55" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28">
          <Link href="/service-areas" className="text-sm font-semibold text-white/70 hover:text-white">
            ← All service areas
          </Link>
          <p className="mt-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand">
            <MapPin className="h-4 w-4" />
            {page.name}, CA
          </p>
          <h1 className="font-display mt-2 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {page.headline}
          </h1>
          <div className="mt-5 max-w-2xl space-y-4 text-lg text-white/85">
            {page.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8">
            <Button href="/contact" size="lg">
              Request a quote in {page.name}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="font-display text-3xl font-bold tracking-tight text-navy">Services in {page.name}</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {page.services.map(({ slug, text }) => {
            const service = services.find((s) => s.slug === slug)!;
            return (
              <li key={slug} className="rounded-[1.5rem] border border-border bg-white p-5 shadow-sm sm:p-6">
                <h3 className="font-display text-lg font-bold text-navy">{service.name}</h3>
                <p className="mt-2 text-muted leading-relaxed">{text}</p>
                <Link
                  href={service.href}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
                >
                  {service.name} details
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-14 rounded-[2rem] border border-border bg-white p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold text-navy">Good to know in {page.name}</h2>
          <ul className="mt-5 grid gap-4 md:grid-cols-3">
            {page.notes.map((note) => (
              <li key={note.title} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <p className="font-semibold text-navy">{note.title}</p>
                  <p className="mt-1 text-sm text-muted leading-relaxed">{note.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14">
          <h2 className="font-display text-2xl font-bold text-navy">Nearby service areas</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {otherCities.map((c) => (
              <li key={c.slug}>
                <Link
                  href={cityPageHref(c.slug)}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-navy transition hover:border-brand/30 hover:bg-brand-soft/40"
                >
                  <MapPin className="h-4 w-4 text-brand" />
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/service-areas"
                className="inline-flex items-center rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-navy transition hover:border-brand/30 hover:bg-brand-soft/40"
              >
                Every city Graham serves
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <CtaBand title={page.ctaTitle} subtitle={page.ctaSubtitle} />
    </>
  );
}

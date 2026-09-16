import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { ServiceCards } from "@/components/ServiceCards";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services | Pressure Washing, Solar, Bins & Lights in Rocklin",
  description:
    "Hot pressure washing, solar panel cleaning, trash bin cleaning, birdproofing, and permanent Christmas lights from Graham's Wash in Rocklin, CA.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services | Graham's Wash",
    description:
      "Pressure washing, solar panel cleaning, bin wash, and permanent holiday lights for Rocklin and nearby cities.",
  },
};

export default function ServicesIndexPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">Services</p>
        <h1 className="font-display mt-2 max-w-3xl text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
          Exterior cleaning and permanent lights in {site.city}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Four services from one local operator. Book one job or combine a few while Graham is already at your place.
        </p>
        <div className="mt-10">
          <ServiceCards />
        </div>
      </div>
      <CtaBand
        title="Not sure which service you need?"
        subtitle="Send a few details through the contact form — Graham will recommend the right approach."
      />
    </>
  );
}

import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";
import { getService } from "@/lib/site";

const service = getService("birdproofing")!;

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  alternates: { canonical: service.href },
  openGraph: {
    title: service.metaTitle,
    description: service.metaDescription,
    images: [{ url: service.image, alt: service.gallery[0]?.alt || service.name }],
  },
};

export default function Page() {
  return <ServicePage slug="birdproofing" />;
}

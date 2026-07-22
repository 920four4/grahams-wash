import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";
import { getService } from "@/lib/site";

const service = getService("trash-bin-cleaning")!;

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  alternates: { canonical: service.href },
  openGraph: {
    title: service.metaTitle,
    description: service.metaDescription,
    images: [service.image],
  },
};

export default function Page() {
  return <ServicePage slug="trash-bin-cleaning" />;
}

import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";
import { getService } from "@/lib/site";

const service = getService("permanent-christmas-lights")!;

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
  return <ServicePage slug="permanent-christmas-lights" />;
}

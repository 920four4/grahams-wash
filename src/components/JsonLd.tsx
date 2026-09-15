import { GOOGLE_PLACE } from "@/lib/google-reviews";
import { cities, services, site } from "@/lib/site";

export function LocalBusinessJsonLd({
  rating = site.googleRating,
  reviewCount = site.googleReviewCount,
}: {
  rating?: number;
  reviewCount?: number;
} = {}) {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
        "@id": `${site.url}/#business`,
        name: site.name,
        url: site.url,
        email: site.email,
        image: `${site.url}/images/logo/gw-transparent-bg-badge-logo.png`,
        priceRange: "$$",
        description: site.description,
        address: {
          "@type": "PostalAddress",
          addressLocality: site.city,
          addressRegion: site.region,
          addressCountry: site.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "38.69724",
          longitude: "-121.26255",
        },
        areaServed: cities.map((name) => ({ "@type": "City", name })),
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: String(rating),
          reviewCount: String(reviewCount),
          bestRating: "5",
          worstRating: "1",
        },
        sameAs: [site.social.instagram, GOOGLE_PLACE.mapsUrl],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Exterior cleaning and lighting",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.name,
              url: `${site.url}${s.href}`,
              description: s.blurb,
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        publisher: { "@id": `${site.url}/#business` },
      },
    ],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function FaqJsonLd({ items }: { items: { question: string; answer: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function ServiceJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${site.url}${url}`,
    provider: { "@id": `${site.url}/#business` },
    areaServed: cities.map((city) => ({ "@type": "City", name: city })),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

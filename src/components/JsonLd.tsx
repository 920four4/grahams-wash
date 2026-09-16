import type { GoogleReview } from "@/lib/google-reviews";
import { GOOGLE_PLACE } from "@/lib/google-reviews";
import { cities, services, site } from "@/lib/site";

const BUSINESS_ID = `${site.url}/#business`;
const WEBSITE_ID = `${site.url}/#website`;
const LOGO = `${site.url}/images/logo/gw-transparent-bg-badge-logo.png`;

function jsonLdScript(data: unknown) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

function reviewNode(review: GoogleReview) {
  return {
    "@type": "Review",
    author: {
      "@type": "Person",
      name: review.author,
    },
    datePublished: review.isoDate || undefined,
    reviewBody: review.text,
    reviewRating: {
      "@type": "Rating",
      ratingValue: Number(review.rating),
      bestRating: 5,
      worstRating: 1,
    },
    itemReviewed: { "@id": BUSINESS_ID },
    url: review.link || `${site.url}/reviews`,
  };
}

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
        "@id": BUSINESS_ID,
        name: site.name,
        legalName: site.legalName,
        slogan: site.tagline,
        url: site.url,
        email: site.email,
        image: [
          LOGO,
          `${site.url}/images/hero/neighborhood.webp`,
          `${site.url}/images/pressure/walkway-after.webp`,
          `${site.url}/images/solar/array-clean.webp`,
          `${site.url}/images/lights/warm-craftsman.webp`,
        ],
        logo: {
          "@type": "ImageObject",
          url: LOGO,
          width: 512,
          height: 512,
        },
        priceRange: "$$",
        description: site.description,
        foundingDate: "2025",
        address: {
          "@type": "PostalAddress",
          addressLocality: site.city,
          addressRegion: site.region,
          postalCode: "95677",
          addressCountry: site.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 38.7907,
          longitude: -121.2358,
        },
        hasMap: GOOGLE_PLACE.mapsUrl,
        areaServed: cities.map((name) => ({
          "@type": "City",
          name: `${name}, CA`,
        })),
        knowsAbout: services.map((s) => s.name),
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: site.email,
          url: `${site.url}/contact`,
          availableLanguage: "English",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: Number(rating.toFixed(1)),
          reviewCount,
          ratingCount: reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
        sameAs: [site.social.instagram, GOOGLE_PLACE.mapsUrl],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Exterior cleaning and lighting",
          itemListElement: services.map((s, i) => ({
            "@type": "Offer",
            position: i + 1,
            url: `${site.url}${s.href}`,
            itemOffered: {
              "@type": "Service",
              "@id": `${site.url}${s.href}#service`,
              name: s.name,
              url: `${site.url}${s.href}`,
              description: s.blurb,
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: site.url,
        name: site.name,
        description: site.description,
        inLanguage: "en-US",
        publisher: { "@id": BUSINESS_ID },
      },
      {
        "@type": "WebPage",
        "@id": `${site.url}/#webpage`,
        url: site.url,
        name: site.name,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": BUSINESS_ID },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${site.url}/images/hero/neighborhood.webp`,
        },
      },
    ],
  };

  return jsonLdScript(data);
}

/** Individual Google reviews — only on pages that actually show them. */
export function ReviewsJsonLd({ reviews }: { reviews: GoogleReview[] }) {
  const visible = reviews.filter((r) => r.text.length > 20).slice(0, 12);
  if (!visible.length) return null;

  return jsonLdScript({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Google reviews for ${site.name}`,
    itemListElement: visible.map((review, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: reviewNode(review),
    })),
  });
}

export function FaqJsonLd({ items }: { items: { question: string; answer: string }[] }) {
  if (!items.length) return null;
  return jsonLdScript({
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
  });
}

export function ServiceJsonLd({
  name,
  description,
  url,
  image,
}: {
  name: string;
  description: string;
  url: string;
  image?: string;
}) {
  const absolute = `${site.url}${url}`;
  return jsonLdScript({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absolute}#service`,
    name,
    serviceType: name,
    description,
    url: absolute,
    image: image ? `${site.url}${image}` : undefined,
    provider: { "@id": BUSINESS_ID },
    areaServed: cities.map((city) => ({ "@type": "City", name: `${city}, CA` })),
    brand: { "@id": BUSINESS_ID },
    offers: {
      "@type": "Offer",
      url: `${site.url}/contact`,
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
    },
  });
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  return jsonLdScript({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.href === "/" ? "" : item.href}`,
    })),
  });
}

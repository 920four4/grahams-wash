import type { Metadata } from "next";
import { ReviewsPageContent } from "@/components/ReviewsPageContent";
import { CtaBand } from "@/components/CtaBand";
import { getGoogleReviews, GOOGLE_PLACE } from "@/lib/google-reviews";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Google Reviews | Graham's Wash Rocklin — 5-Star Customer Feedback",
  description:
    "Read real Google reviews for Graham's Wash in Rocklin, CA. Pressure washing, solar panel cleaning, trash bin cleaning, and permanent Christmas lights — 5.0 stars from local homeowners.",
  alternates: { canonical: "/reviews" },
  openGraph: {
    title: "Google Reviews | Graham's Wash",
    description: `See why homeowners rate Graham's Wash ${site.googleRating.toFixed(1)} stars on Google.`,
  },
};

export const revalidate = 21600; // 6 hours — aligns with review cache

export default async function ReviewsPage() {
  const data = await getGoogleReviews();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    url: `${site.url}/reviews`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(data.rating),
      reviewCount: String(data.reviewCount),
      bestRating: "5",
      worstRating: "1",
    },
    review: data.reviews
      .filter((r) => r.text.length > 20)
      .slice(0, 12)
      .map((r) => ({
        "@type": "Review",
        author: { "@type": "Person", name: r.author },
        datePublished: r.isoDate || undefined,
        reviewBody: r.text,
        reviewRating: {
          "@type": "Rating",
          ratingValue: String(r.rating),
          bestRating: "5",
          worstRating: "1",
        },
      })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReviewsPageContent
        reviews={data.reviews}
        topics={data.topics}
        rating={data.rating}
        reviewCount={data.reviewCount}
        mapsUrl={GOOGLE_PLACE.mapsUrl}
      />
      <CtaBand
        title="Impressed by the reviews?"
        subtitle="Send a short note through the contact form — Graham will get back with timing and a clear quote."
      />
    </>
  );
}

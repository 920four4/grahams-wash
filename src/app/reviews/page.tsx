import type { Metadata } from "next";
import { ReviewsPageContent } from "@/components/ReviewsPageContent";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbJsonLd, ReviewsJsonLd } from "@/components/JsonLd";
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

export default async function ReviewsPage() {
  const data = await getGoogleReviews();

  return (
    <>
      <ReviewsJsonLd reviews={data.reviews} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Google reviews", href: "/reviews" },
        ]}
      />
      <ReviewsPageContent
        reviews={data.reviews}
        topics={data.topics}
        rating={data.rating}
        reviewCount={data.reviewCount}
        mapsUrl={GOOGLE_PLACE.mapsUrl}
        source={data.source}
      />
      <CtaBand
        title="Impressed by the reviews?"
        subtitle="Send a short note through the contact form — Graham will get back with timing and a clear quote."
      />
    </>
  );
}

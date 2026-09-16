import snapshot from "@/data/google-reviews.json";
import { site, testimonials } from "@/lib/site";

/** Google Maps identifiers for Graham's Wash (Rocklin, CA) */
export const GOOGLE_PLACE = {
  placeId: "ChIJNfZgYm1I7iwRRVuvXDsturQ",
  dataId: "0x2cee486d6260f635:0xb4ba2d3b5caf5b45",
  mapsUrl:
    "https://www.google.com/maps/place/?q=place_id:ChIJNfZgYm1I7iwRRVuvXDsturQ",
} as const;

export type GoogleReview = {
  id: string;
  author: string;
  authorThumbnail?: string;
  authorLink?: string;
  isLocalGuide: boolean;
  rating: number;
  date: string;
  isoDate?: string;
  text: string;
  images: string[];
  likes: number;
  link?: string;
  response?: {
    date: string;
    text: string;
  };
};

export type ReviewTopic = {
  keyword: string;
  mentions: number;
};

export type GoogleReviewsPayload = {
  rating: number;
  reviewCount: number;
  topics: ReviewTopic[];
  reviews: GoogleReview[];
  fetchedAt: string;
  source: "snapshot" | "fallback";
};

function fallbackReviews(): GoogleReview[] {
  return testimonials.map((t, i) => ({
    id: `fallback-${i}`,
    author: t.name,
    isLocalGuide: false,
    rating: t.rating,
    date: t.city,
    text: t.text,
    images: [],
    likes: 0,
  }));
}

/** Reviews come from the committed snapshot. Refresh with `npm run refresh:reviews`. */
export async function getGoogleReviews(): Promise<GoogleReviewsPayload> {
  const reviews = (snapshot.reviews || []) as GoogleReview[];
  if (reviews.length) {
    return {
      rating: snapshot.rating || site.googleRating,
      reviewCount: Math.max(snapshot.reviewCount || 0, reviews.length, site.googleReviewCount),
      topics: (snapshot.topics || []) as ReviewTopic[],
      reviews,
      fetchedAt: snapshot.fetchedAt || new Date().toISOString(),
      source: "snapshot",
    };
  }

  return {
    rating: site.googleRating,
    reviewCount: site.googleReviewCount,
    topics: [],
    reviews: fallbackReviews(),
    fetchedAt: new Date().toISOString(),
    source: "fallback",
  };
}

export async function getFeaturedReviews(limit = 6): Promise<GoogleReview[]> {
  const data = await getGoogleReviews();
  const withText = data.reviews.filter((r) => r.text.length > 40);
  return (withText.length ? withText : data.reviews).slice(0, limit);
}

import { unstable_cache } from "next/cache";
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
  source: "serpapi" | "fallback";
};

type SerpReview = {
  review_id?: string;
  rating?: number;
  date?: string;
  iso_date?: string;
  snippet?: string;
  extracted_snippet?: { original?: string };
  images?: string[];
  likes?: number;
  link?: string;
  user?: {
    name?: string;
    thumbnail?: string;
    link?: string;
    local_guide?: boolean;
  };
  response?: {
    date?: string;
    snippet?: string;
    extracted_snippet?: { original?: string };
  };
};

type SerpReviewsResponse = {
  place_info?: {
    title?: string;
    rating?: number;
    reviews?: number;
  };
  topics?: { keyword?: string; mentions?: number }[];
  reviews?: SerpReview[];
  serpapi_pagination?: {
    next?: string;
    next_page_token?: string;
  };
  error?: string;
};

const MAX_PAGES = 12; // safety cap (~8 reviews/page)

function getApiKey() {
  return process.env.SERP_API_KEY || process.env.SERPAPI_API_KEY || "";
}

function mapReview(r: SerpReview, index: number): GoogleReview {
  const text =
    r.extracted_snippet?.original?.trim() ||
    r.snippet?.trim() ||
    "";
  return {
    id: r.review_id || `review-${index}-${r.iso_date || r.date || index}`,
    author: r.user?.name?.trim() || "Google user",
    authorThumbnail: r.user?.thumbnail,
    authorLink: r.user?.link,
    isLocalGuide: Boolean(r.user?.local_guide),
    rating: typeof r.rating === "number" ? r.rating : 5,
    date: r.date || "",
    isoDate: r.iso_date,
    text,
    images: Array.isArray(r.images) ? r.images.filter(Boolean) : [],
    likes: r.likes || 0,
    link: r.link,
    response: r.response?.snippet
      ? {
          date: r.response.date || "",
          text:
            r.response.extracted_snippet?.original?.trim() ||
            r.response.snippet.trim(),
        }
      : undefined,
  };
}

async function fetchReviewsPage(params: {
  nextPageToken?: string;
}): Promise<SerpReviewsResponse> {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("Missing SERP_API_KEY");
  }

  const url = new URL("https://serpapi.com/search.json");
  url.searchParams.set("engine", "google_maps_reviews");
  url.searchParams.set("data_id", GOOGLE_PLACE.dataId);
  url.searchParams.set("hl", "en");
  url.searchParams.set("sort_by", "newestFirst");
  url.searchParams.set("api_key", apiKey);
  if (params.nextPageToken) {
    url.searchParams.set("next_page_token", params.nextPageToken);
  }

  const res = await fetch(url.toString(), {
    // cache at the unstable_cache layer
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`SerpAPI HTTP ${res.status}`);
  }

  return (await res.json()) as SerpReviewsResponse;
}

async function fetchAllGoogleReviewsUncached(): Promise<GoogleReviewsPayload> {
  const apiKey = getApiKey();
  if (!apiKey) {
    return fallbackPayload();
  }

  try {
    const all: GoogleReview[] = [];
    let topics: ReviewTopic[] = [];
    let rating: number = site.googleRating;
    let reviewCount: number = site.googleReviewCount;
    let nextPageToken: string | undefined;
    let page = 0;

    do {
      const data = await fetchReviewsPage({ nextPageToken });
      if (data.error) {
        throw new Error(data.error);
      }

      if (page === 0) {
        if (typeof data.place_info?.rating === "number") {
          rating = data.place_info.rating;
        }
        if (typeof data.place_info?.reviews === "number") {
          reviewCount = data.place_info.reviews;
        }
        topics = (data.topics || [])
          .filter((t) => t.keyword && typeof t.mentions === "number")
          .map((t) => ({
            keyword: t.keyword as string,
            mentions: t.mentions as number,
          }));
      }

      for (const r of data.reviews || []) {
        const mapped = mapReview(r, all.length);
        // Keep empty-text reviews only if they have images (still social proof)
        if (mapped.text || mapped.images.length) {
          all.push(mapped);
        }
      }

      nextPageToken = data.serpapi_pagination?.next_page_token;
      page += 1;
    } while (nextPageToken && page < MAX_PAGES);

    // Dedupe by id
    const seen = new Set<string>();
    const unique = all.filter((r) => {
      if (seen.has(r.id)) return false;
      seen.add(r.id);
      return true;
    });

    // Prefer reviews with text first, then by date (already newest-first from API)
    unique.sort((a, b) => {
      const aHas = a.text ? 1 : 0;
      const bHas = b.text ? 1 : 0;
      if (bHas !== aHas) return bHas - aHas;
      const aTime = a.isoDate ? Date.parse(a.isoDate) : 0;
      const bTime = b.isoDate ? Date.parse(b.isoDate) : 0;
      return bTime - aTime;
    });

    if (!unique.length) {
      return fallbackPayload();
    }

    return {
      rating,
      reviewCount: Math.max(reviewCount, unique.length),
      topics,
      reviews: unique,
      fetchedAt: new Date().toISOString(),
      source: "serpapi",
    };
  } catch (err) {
    console.error("[google-reviews]", err);
    return fallbackPayload();
  }
}

function fallbackPayload(): GoogleReviewsPayload {
  // Static fallback if SerpAPI is unavailable — keeps site working offline
  return {
    rating: site.googleRating,
    reviewCount: site.googleReviewCount,
    topics: [],
    reviews: testimonials.map((t, i) => ({
      id: `fallback-${i}`,
      author: t.name,
      isLocalGuide: false,
      rating: t.rating,
      date: t.city,
      text: t.text,
      images: [],
      likes: 0,
    })),
    fetchedAt: new Date().toISOString(),
    source: "fallback",
  };
}

/** Cached Google reviews — revalidate every 6 hours */
export const getGoogleReviews = unstable_cache(
  fetchAllGoogleReviewsUncached,
  ["grahams-wash-google-reviews-v1"],
  {
    revalidate: 60 * 60 * 6,
    tags: ["google-reviews"],
  },
);

export async function getFeaturedReviews(limit = 6): Promise<GoogleReview[]> {
  const data = await getGoogleReviews();
  return data.reviews.filter((r) => r.text.length > 40).slice(0, limit);
}

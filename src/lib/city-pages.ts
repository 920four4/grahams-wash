import type { cities, ServiceSlug } from "@/lib/site";

/**
 * City landing pages under /service-areas/<slug>.
 * An intro paragraph written as [Z TO CONFIRM: ...] is a placeholder for a
 * local detail Z still has to confirm. Previews show it highlighted; production
 * builds leave it out (see `visibleIntro`).
 */
export type CityPage = {
  slug: string;
  name: (typeof cities)[number];
  /** schema.org type for areaServed: City for incorporated cities, Place otherwise. */
  placeType: "City" | "Place";
  county: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  /** Existing job photo. Its alt text comes from the service gallery, so it never claims a location it wasn't taken in. */
  heroImage: string;
  intro: string[];
  services: { slug: ServiceSlug; text: string }[];
  notes: { title: string; text: string }[];
  ctaTitle: string;
  ctaSubtitle: string;
};

export const cityPages: CityPage[] = [
  {
    slug: "roseville",
    name: "Roseville",
    placeType: "City",
    county: "Placer County",
    metaTitle: "Roseville, CA Pressure Washing, Solar & Bin Cleaning",
    metaDescription:
      "Hot water pressure washing, solar panel cleaning, bin cleaning, birdproofing and permanent lights for Roseville homes, from Rocklin next door. Get a quote online.",
    headline: "Pressure washing and exterior cleaning in Roseville",
    heroImage: "/images/pressure/driveway-after.webp",
    intro: [
      "Roseville is Rocklin’s next-door neighbor, so Graham is often already working nearby. He quotes the job, does the work, and handles the cleanup himself, and you reach him the same way every customer does: through the contact form.",
      "One Roseville property can have a concrete driveway, a stamped or aggregate patio, and stucco walls, and each one needs a different approach. Oil-stained concrete gets hot water up to 210°F. Paint, stucco, and wood get a gentler wash so the finish isn’t damaged.",
      "[Z TO CONFIRM: Roseville neighborhoods Graham works in most often, to name here]",
    ],
    services: [
      {
        slug: "pressure-washing",
        text: "Driveways, walkways, and patios, with hot water for oil drips and tire marks that cold water leaves behind.",
      },
      {
        slug: "solar-panel-cleaning",
        text: "Valley dust and spring pollen settle on rooftop panels. A soft brush and filtered water clean them without high pressure on the glass.",
      },
      {
        slug: "trash-bin-cleaning",
        text: "Garbage and recycle bins washed inside and out. Easy to add on when Graham is already at your house for a pressure wash.",
      },
      {
        slug: "permanent-christmas-lights",
        text: "Roofline lights that stay up all year and change colors from your phone, for Christmas, game days, or plain warm white.",
      },
      {
        slug: "birdproofing",
        text: "Mesh around the solar array plus ridge and eave spikes, so birds stop nesting under the panels and along the tile.",
      },
    ],
    notes: [
      {
        title: "HOA rules",
        text: "If your HOA limits work hours or has rules about exterior lights, mention it in your message so Graham can plan around it.",
      },
      {
        title: "Neighbor rates",
        text: "If a few homes on the same Roseville street book together, Graham can often offer a better rate.",
      },
      {
        title: "No need to be home",
        text: "Usually you don’t have to be there. Graham just needs to reach the work area, plus outdoor water when the job needs it.",
      },
    ],
    ctaTitle: "Need something cleaned in Roseville?",
    ctaSubtitle: "Send Graham your street, what needs work, and how you’d like him to reply.",
  },
  {
    slug: "lincoln",
    name: "Lincoln",
    placeType: "City",
    county: "Placer County",
    metaTitle: "Lincoln, CA Pressure Washing & Permanent Christmas Lights",
    metaDescription:
      "Graham’s Wash serves Lincoln, CA up Highway 65 from Rocklin: permanent roofline lights, solar panel cleaning, pressure washing, bin cleaning and birdproofing.",
    headline: "Permanent lights, solar cleaning, and pressure washing in Lincoln",
    heroImage: "/images/lights/warm-craftsman.webp",
    intro: [
      "Lincoln is a short drive up Highway 65 from Graham’s home base in Rocklin, and it’s part of his regular service area.",
      "Plenty of homeowners would rather not climb a ladder, whether that means hanging Christmas lights every December or scrubbing panels on a two-story roof. Permanent lights stay mounted all year and change from your phone, and solar panels are cleaned with a soft brush and filtered water instead of a pressure washer.",
      "[Z TO CONFIRM: Lincoln neighborhoods to name here, for example Twelve Bridges, Lincoln Crossing, or Sun City Lincoln Hills]",
    ],
    services: [
      {
        slug: "permanent-christmas-lights",
        text: "Low-profile lights along the roofline, installed once. No more yearly ladder work or boxes of tangled strands.",
      },
      {
        slug: "solar-panel-cleaning",
        text: "Panels cleaned by hand with pure water. Check your solar app before and after to see the difference.",
      },
      {
        slug: "pressure-washing",
        text: "Concrete driveways, sidewalks, and back patios brought back to an even color. Hot water handles grease and oil.",
      },
      {
        slug: "birdproofing",
        text: "Critter-guard mesh closes the gap under the array where birds like to nest in the shade.",
      },
      {
        slug: "trash-bin-cleaning",
        text: "A hot wash inside and out cuts the residue and odor that build up in bins over a hot summer.",
      },
    ],
    notes: [
      {
        title: "Community rules",
        text: "If your neighborhood or community has rules on exterior lighting or contractor access, include them in the form.",
      },
      {
        title: "Pickup day",
        text: "Booking bin cleaning? Mention your trash pickup day so it can be scheduled around it.",
      },
      {
        title: "Timing",
        text: "Many jobs are same day or next day, depending on the schedule. You’ll get timing after you send the form.",
      },
    ],
    ctaTitle: "In Lincoln and ready for a quote?",
    ctaSubtitle: "Tell Graham what you need and where. He’ll reply by text, call, or email, whichever you pick.",
  },
  {
    slug: "granite-bay",
    name: "Granite Bay",
    placeType: "Place",
    county: "Placer County",
    metaTitle: "Granite Bay Pressure Washing, Solar Cleaning & Birdproofing",
    metaDescription:
      "Pressure washing for long driveways and pool decks, solar panel cleaning, birdproofing and permanent lights in Granite Bay, CA. Request a quote online.",
    headline: "Exterior cleaning and birdproofing in Granite Bay",
    heroImage: "/images/pressure/pool-deck-after.webp",
    intro: [
      "Granite Bay sits between Roseville, Loomis, and Folsom Lake, a short drive from Graham’s base in Rocklin.",
      "If your property has a long driveway, a pool deck, or a lot of patio, that’s a lot of surface, and not all of it should be cleaned the same way. Graham chooses the method for each one: hot water for oily concrete, a gentler wash for painted or wood surfaces, and a soft brush for solar glass.",
      "If your panels sit under trees, they pick up leaves, pollen, and droppings faster, and birds look for shade under the array. A cleaning plus critter-guard mesh takes care of both.",
      "[Z TO CONFIRM: Granite Bay neighborhoods or local details to mention here]",
    ],
    services: [
      {
        slug: "pressure-washing",
        text: "Long driveways, pool decks, and wide patios. Surface cleaners keep the finish even with no stripes.",
      },
      {
        slug: "birdproofing",
        text: "Mesh, screens, and spikes that keep birds out from under the panels and off the roofline without spoiling the look of the house.",
      },
      {
        slug: "solar-panel-cleaning",
        text: "Leaf litter and pollen cleaned off by hand, with filtered water and no pressure washer on the glass.",
      },
      {
        slug: "permanent-christmas-lights",
        text: "Permanent lights for tall or long rooflines, so nobody is on a ladder every winter.",
      },
      {
        slug: "trash-bin-cleaning",
        text: "Bins washed inside and out with hot water, as a one-time clean or added to another visit.",
      },
    ],
    notes: [
      {
        title: "Gated access",
        text: "Live in a gated community? Add access instructions to your message so Graham can get in on the day.",
      },
      {
        title: "Bigger jobs",
        text: "For large driveways or several surfaces, describe each area and its rough size so the quote is accurate.",
      },
      {
        title: "Pools",
        text: "Mention it if there’s a pool next to the work area so Graham can plan where the rinse water goes.",
      },
    ],
    ctaTitle: "Get a Granite Bay quote",
    ctaSubtitle: "Describe the surfaces, roofline, or panels you want handled, and Graham will follow up.",
  },
];

export const PLACEHOLDER = /\[Z TO CONFIRM:[^\]]*\]/;

/** Intro paragraphs to render. Placeholder paragraphs never reach production. */
export function visibleIntro(page: CityPage, env = process.env.VERCEL_ENV) {
  return env === "production" ? page.intro.filter((p) => !PLACEHOLDER.test(p)) : page.intro;
}

export function getCityPage(slug: string) {
  return cityPages.find((c) => c.slug === slug);
}

export function cityPageHref(slug: string) {
  return `/service-areas/${slug}`;
}

export type TransformationCategory =
  | "solar"
  | "pressure"
  | "bins"
  | "exterior"
  | "birdproofing";

export type Transformation = {
  id: string;
  title: string;
  subtitle: string;
  category: TransformationCategory;
  before: string;
  after: string;
  aspect?: "landscape" | "portrait" | "square";
  featured?: boolean;
  homeHero?: boolean;
  serviceHref?: string;
};

export const categoryLabels: Record<TransformationCategory, string> = {
  solar: "Solar panels",
  pressure: "Pressure washing",
  bins: "Trash bins",
  exterior: "Fences & exteriors",
  birdproofing: "Birdproofing",
};

export const transformations: Transformation[] = [
  {
    id: "solar-z",
    title: "Solar panel refresh",
    subtitle: "Dust, pollen, and haze lifted with pure-water cleaning — glass that actually shines again.",
    category: "solar",
    before: "/images/compare/solar-z-before.webp",
    after: "/images/compare/solar-z-after.webp",
    aspect: "landscape",
    featured: true,
    homeHero: true,
    serviceHref: "/services/solar-panel-cleaning",
  },
  {
    id: "solar-z2",
    title: "Full array clean",
    subtitle: "Same roof, different story. Soft brush + filtered water — no high pressure on the glass.",
    category: "solar",
    before: "/images/compare/solar-z2-before.webp",
    after: "/images/compare/solar-z2-after.webp",
    aspect: "portrait",
    featured: true,
    serviceHref: "/services/solar-panel-cleaning",
  },
  {
    id: "solar-levi",
    title: "Cloudy to crystal",
    subtitle: "Before: dull and spotted. After: deep blue panels that look brand new from the street.",
    category: "solar",
    before: "/images/compare/solar-levi-before.webp",
    after: "/images/compare/solar-levi-after.webp",
    aspect: "portrait",
    featured: true,
    serviceHref: "/services/solar-panel-cleaning",
  },
  {
    id: "solar-keith",
    title: "Large residential array",
    subtitle: "A full roof of panels brought back to a mirror finish.",
    category: "solar",
    before: "/images/compare/driveway-keith-before.webp",
    after: "/images/compare/driveway-keith-after.webp",
    aspect: "portrait",
    serviceHref: "/services/solar-panel-cleaning",
  },
  {
    id: "sidewalk",
    title: "Sidewalk revival",
    subtitle: "Years of buildup gone — cleaner concrete you notice walking up to the door.",
    category: "pressure",
    before: "/images/compare/sidewalk-before.webp",
    after: "/images/compare/sidewalk-after.webp",
    aspect: "portrait",
    featured: true,
    serviceHref: "/services/pressure-washing",
  },
  {
    id: "concrete-10",
    title: "Driveway & concrete",
    subtitle: "Hot pressure washing cutting through dirt, oil, and weather stains.",
    category: "pressure",
    before: "/images/compare/concrete-10-before.webp",
    after: "/images/compare/concrete-10-after.webp",
    aspect: "portrait",
    featured: true,
    serviceHref: "/services/pressure-washing",
  },
  {
    id: "concrete-19",
    title: "Patio & hardscape",
    subtitle: "Outdoor living spaces that look ready for company again.",
    category: "pressure",
    before: "/images/compare/concrete-19-before.webp",
    after: "/images/compare/concrete-19-after.webp",
    aspect: "portrait",
    serviceHref: "/services/pressure-washing",
  },
  {
    id: "concrete-7",
    title: "Concrete clean-up",
    subtitle: "Stubborn grime lifted with the right heat and technique.",
    category: "pressure",
    before: "/images/compare/concrete-7-before.webp",
    after: "/images/compare/concrete-7-after.webp",
    aspect: "portrait",
    serviceHref: "/services/pressure-washing",
  },
  {
    id: "concrete-22",
    title: "Walkway transformation",
    subtitle: "From neglected path to a clean, bright approach.",
    category: "pressure",
    before: "/images/compare/concrete-22-before.webp",
    after: "/images/compare/concrete-22-after.webp",
    aspect: "portrait",
    serviceHref: "/services/pressure-washing",
  },
  {
    id: "bins",
    title: "Trash bin deep clean",
    subtitle: "Inside and out — residue and odor taken seriously.",
    category: "bins",
    before: "/images/compare/bins-before.webp",
    after: "/images/compare/bins-after.webp",
    aspect: "portrait",
    featured: true,
    serviceHref: "/services/trash-bin-cleaning",
  },
  {
    id: "fence",
    title: "Fence brightening",
    subtitle: "Green gunk and dull wood replaced with color that pops again.",
    category: "exterior",
    before: "/images/compare/fence-before.webp",
    after: "/images/compare/fence-after.webp",
    aspect: "landscape",
    featured: true,
    serviceHref: "/services/pressure-washing",
  },
  {
    id: "gate",
    title: "Gate & entry clean",
    subtitle: "First impressions start at the gate — cleaned carefully end to end.",
    category: "exterior",
    before: "/images/compare/gate-before.webp",
    after: "/images/compare/gate-after.webp",
    aspect: "portrait",
    serviceHref: "/services/pressure-washing",
  },
  {
    id: "trailer",
    title: "Trailer exterior",
    subtitle: "Road film and weather stains cleared for a sharp finish.",
    category: "exterior",
    before: "/images/compare/trailer-before.webp",
    after: "/images/compare/trailer-after.webp",
    aspect: "portrait",
    serviceHref: "/services/pressure-washing",
  },
  {
    id: "general",
    title: "Surface reset",
    subtitle: "The kind of before-and-after that makes neighbors ask who did the work.",
    category: "pressure",
    before: "/images/compare/general-before.webp",
    after: "/images/compare/general-after.webp",
    aspect: "portrait",
    serviceHref: "/services/pressure-washing",
  },
  {
    id: "walkway-new",
    title: "Front walkway",
    subtitle: "Exposed-aggregate path from dull gray to a clean, bright approach.",
    category: "pressure",
    before: "/images/compare/walkway-before.webp",
    after: "/images/compare/walkway-after.webp",
    aspect: "portrait",
    featured: true,
    serviceHref: "/services/pressure-washing",
  },
  {
    id: "driveway-new",
    title: "Driveway reset",
    subtitle: "Hot pressure washing cutting through years of driveway film.",
    category: "pressure",
    before: "/images/compare/driveway-new-before.webp",
    after: "/images/compare/driveway-new-after.webp",
    aspect: "landscape",
    serviceHref: "/services/pressure-washing",
  },
  {
    id: "pool-deck",
    title: "Pool deck",
    subtitle: "Exposed-aggregate around the water, cleaned without wrecking the finish.",
    category: "pressure",
    before: "/images/compare/pool-deck-before.webp",
    after: "/images/compare/pool-deck-after.webp",
    aspect: "landscape",
    featured: true,
    serviceHref: "/services/pressure-washing",
  },
  {
    id: "patio-stamp",
    title: "Stamped patio",
    subtitle: "Algae and black stains lifted off wood-stamp concrete.",
    category: "pressure",
    before: "/images/compare/patio-before.webp",
    after: "/images/compare/patio-after.webp",
    aspect: "portrait",
    serviceHref: "/services/pressure-washing",
  },
  {
    id: "roof-moss",
    title: "Tile roof moss",
    subtitle: "Moss packed in the joints, then gone — same roof, different story.",
    category: "pressure",
    before: "/images/compare/roof-moss-before.webp",
    after: "/images/compare/roof-moss-after.webp",
    aspect: "landscape",
    serviceHref: "/services/pressure-washing",
  },
  {
    id: "bin-green",
    title: "Trash bin interior",
    subtitle: "Hot wash inside the can — residue and odor taken seriously.",
    category: "bins",
    before: "/images/compare/bin-green-before.webp",
    after: "/images/compare/bin-green-after.webp",
    aspect: "square",
    featured: true,
    serviceHref: "/services/trash-bin-cleaning",
  },
  {
    id: "bin-gray",
    title: "Recycle bin wash",
    subtitle: "Same treatment for recycle cans — inside, outside, lids.",
    category: "bins",
    before: "/images/compare/bin-gray-before.webp",
    after: "/images/compare/bin-gray-after.webp",
    aspect: "square",
    serviceHref: "/services/trash-bin-cleaning",
  },
];

export function getHomeHeroTransformation() {
  return transformations.find((t) => t.homeHero) || transformations[0];
}

export function getFeaturedTransformations(limit = 4) {
  return transformations.filter((t) => t.featured).slice(0, limit);
}

export function getTransformationsByCategory(category: TransformationCategory | "all") {
  if (category === "all") return transformations;
  return transformations.filter((t) => t.category === category);
}

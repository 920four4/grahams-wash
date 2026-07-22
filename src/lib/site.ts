export const site = {
  name: "Graham's Wash",
  legalName: "Graham's Wash",
  tagline: "Wash. Refresh. Repeat.",
  description:
    "Pressure washing in Rocklin, CA — hot water power washing, solar panel cleaning, trash bin cleaning, and permanent Christmas lights. Locally owned. Quality work.",
  url: "https://www.grahamswash.com",
  email: "service@grahamswash.com",
  owner: "Graham",
  city: "Rocklin",
  region: "CA",
  country: "US",
  serviceAreaLabel: "Rocklin and the Greater Sacramento area",
  googleRating: 5.0,
  googleReviewCount: 46,
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Graham%27s+Wash+Rocklin+CA",
  social: {
    instagram: "https://www.instagram.com/grahamswash/",
  },
} as const;

export const cities = [
  "Rocklin",
  "Roseville",
  "Lincoln",
  "Loomis",
  "Granite Bay",
  "Folsom",
  "El Dorado Hills",
  "Auburn",
  "Penryn",
  "Newcastle",
  "Orangevale",
  "Citrus Heights",
  "Antelope",
  "Fair Oaks",
  "Carmichael",
  "North Highlands",
  "Rancho Cordova",
  "Arden-Arcade",
  "Rio Linda",
  "Sacramento",
] as const;

export type ServiceSlug =
  | "pressure-washing"
  | "solar-panel-cleaning"
  | "trash-bin-cleaning"
  | "permanent-christmas-lights";

export const services: {
  slug: ServiceSlug;
  name: string;
  shortName: string;
  headline: string;
  blurb: string;
  longDescription: string;
  icon: "droplets" | "sun" | "trash" | "sparkles";
  href: string;
  image: string;
  gallery: string[];
  highlights: string[];
  metaTitle: string;
  metaDescription: string;
}[] = [
  {
    slug: "pressure-washing",
    name: "Hot Pressure Washing",
    shortName: "Pressure Wash",
    headline: "Pressure washing in Rocklin with hot water when it matters",
    blurb:
      "Driveways, sidewalks, fences, patios, and siding — cleaned thoroughly, with hot water up to 210°F when grease and oil need it.",
    longDescription:
      "Graham provides professional pressure washing for homes and small businesses across Rocklin and nearby cities. Oil stains, mildew, irrigation marks, and built-up grime are handled carefully. When a surface needs a lighter touch, he uses gentler methods so paint, wood, and stucco stay protected while still looking clean from the street.",
    icon: "droplets",
    href: "/services/pressure-washing",
    image: "/images/pressure/house-clean.webp",
    gallery: [
      "/images/before-after/driveway-levi.webp",
      "/images/before-after/driveway-keith.webp",
      "/images/before-after/sidewalk.webp",
      "/images/before-after/fence.webp",
      "/images/before-after/gate.webp",
      "/images/pressure/driveway-work.webp",
      "/images/pressure/result-1.webp",
      "/images/pressure/sidewalk-clean.webp",
    ],
    highlights: [
      "Hot water up to 210°F for oil and grease",
      "Gentler wash options for siding and paint",
      "Driveways, sidewalks, fences, patios, and decks",
      "Often available same day or next day",
    ],
    metaTitle: "Pressure Washing Rocklin & Roseville | Hot Water Power Washing",
    metaDescription:
      "Professional pressure washing in Rocklin and Roseville. Driveways, fences, patios, and siding. Hot water when needed. Request a quote online.",
  },
  {
    slug: "solar-panel-cleaning",
    name: "Solar Panel Cleaning",
    shortName: "Solar Cleaning",
    headline: "Solar panel cleaning in Rocklin — safe for glass, better performance",
    blurb:
      "Soft brush and filtered pure water. No high pressure on the glass — just cleaner panels and better output.",
    longDescription:
      "Dust, pollen, and bird droppings cut into what your solar system can produce. Graham cleans panels with a soft brush and multi-stage filtered water — not a pressure washer on the glass. Safer for the surface, clearer results, and a method that fits how most panel manufacturers want cleaning done.",
    icon: "sun",
    href: "/services/solar-panel-cleaning",
    image: "/images/solar/z2-after.webp",
    gallery: [
      "/images/solar/z-before.webp",
      "/images/solar/z-after.webp",
      "/images/solar/z2-before.webp",
      "/images/solar/z2-after.webp",
      "/images/solar/panels-vs-neighbors.webp",
      "/images/solar/solatrim-full.webp",
      "/images/solar/solatrim-1.webp",
      "/images/solar/solatrim-2.webp",
    ],
    highlights: [
      "Filtered pure water",
      "Soft brush — no high pressure on glass",
      "Clear before-and-after results",
      "Easy to combine with a full exterior wash",
    ],
    metaTitle: "Solar Panel Cleaning Rocklin CA | Safe Panel Washing",
    metaDescription:
      "Solar panel cleaning in Rocklin and nearby cities. Soft brush and filtered water — no high pressure on glass. Request a quote online.",
  },
  {
    slug: "trash-bin-cleaning",
    name: "Garbage Bin Cleaning",
    shortName: "Bin Cleaning",
    headline: "Trash bin cleaning that takes care of the smell and the mess",
    blurb:
      "Inside-and-out hot wash for garbage and recycle bins. Cleaner lids, less odor, better curb presence.",
    longDescription:
      "Bins get dirty every week. Graham cleans garbage and recycle cans inside and out with hot water so residue and odors don’t hang around. Book a one-time clean or add bins when he’s already out for a pressure wash.",
    icon: "trash",
    href: "/services/trash-bin-cleaning",
    image: "/images/bins/bin-before-after.webp",
    gallery: [
      "/images/bins/bin-before-after.webp",
      "/images/bins/bin-ba-2.webp",
    ],
    highlights: [
      "Hot wash inside and outside",
      "Garbage and recycle bins",
      "One-time or as an add-on",
      "Usually no need to be home",
    ],
    metaTitle: "Trash Can Cleaning Rocklin & Roseville | Bin Wash",
    metaDescription:
      "Trash and recycle bin cleaning in Rocklin and Roseville. Inside and out. One-time or add-on with your wash. Request a quote online.",
  },
  {
    slug: "permanent-christmas-lights",
    name: "Permanent Christmas Lights",
    shortName: "Holiday Lights",
    headline: "Permanent Christmas lights in Rocklin — up year-round, ready when you are",
    blurb:
      "Low-profile permanent lights along the roofline. Change colors for holidays, game days, or everyday warm white.",
    longDescription:
      "Skip the yearly ladder work and storage bins full of strands. Graham installs permanent outdoor lights that stay up all year — hard to notice during the day, bright when you want color. Available for one- and two-story homes in Rocklin, Roseville, Lincoln, and surrounding cities.",
    icon: "sparkles",
    href: "/services/permanent-christmas-lights",
    image: "/images/lights/night-2.webp",
    gallery: [
      "/images/lights/night-1.webp",
      "/images/lights/night-2.webp",
      "/images/lights/night-3.webp",
      "/images/lights/night-4.webp",
      "/images/lights/night-5.webp",
      "/images/lights/night-6.webp",
      "/images/lights/night-8.webp",
      "/images/lights/night-9.webp",
      "/images/lights/night-10.webp",
      "/images/lights/day-discreet.webp",
      "/images/lights/install-day.webp",
      "/images/lights/day-house.webp",
    ],
    highlights: [
      "Low profile by day, bright at night",
      "Colors and scenes for every season",
      "One- and two-story homes",
      "Often cheaper long-term than yearly installs",
    ],
    metaTitle: "Permanent Christmas Lights Rocklin | Year-Round Holiday Lighting",
    metaDescription:
      "Permanent Christmas and holiday lights in Rocklin, Roseville, and Lincoln. Year-round install for one- and two-story homes. Request a quote online.",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export const testimonials = [
  {
    name: "Sarah M.",
    city: "Rocklin",
    rating: 5,
    text: "Graham made our driveway look brand new. Showed up when he said he would, careful around the plants, and the oil stains are actually gone.",
    service: "Pressure Washing",
  },
  {
    name: "Mike R.",
    city: "Roseville",
    rating: 5,
    text: "Requested a quote online and had the bins and driveway done the next day. Easy process, and the house looks so much better from the street.",
    service: "Pressure Wash + Bins",
  },
  {
    name: "Jennifer L.",
    city: "Lincoln",
    rating: 5,
    text: "Our solar panels were filthy compared to the neighbors. After Graham cleaned them, you can see the difference right away. Careful work, fair price.",
    service: "Solar Panel Cleaning",
  },
  {
    name: "David K.",
    city: "Loomis",
    rating: 5,
    text: "Permanent lights install was clean and tidy. You barely notice them during the day, and at night the house looks great. Worth it.",
    service: "Permanent Lights",
  },
  {
    name: "Amanda T.",
    city: "Granite Bay",
    rating: 5,
    text: "One-man operation that feels personal in the best way. Clear communication, careful work, and everything left cleaner than he found it.",
    service: "Full Exterior Wash",
  },
  {
    name: "Chris P.",
    city: "Folsom",
    rating: 5,
    text: "Had the patio, fence, and sidewalks done. Hot water made a big difference on the greasy spots by the garage. Will book him every year.",
    service: "Hot Pressure Washing",
  },
] as const;

export const faqs = [
  {
    question: "What cities do you service?",
    answer:
      "Graham is based in Rocklin and serves Auburn, Penryn, Newcastle, Loomis, Lincoln, Roseville, Rocklin, Granite Bay, Folsom, El Dorado Hills, Orangevale, Citrus Heights, Antelope, Sacramento, Fair Oaks, Carmichael, North Highlands, Rancho Cordova, Arden-Arcade, and Rio Linda. Not sure if you’re covered? Send a note through the contact form and he’ll let you know.",
    category: "general" as const,
  },
  {
    question: "What can you pressure wash?",
    answer:
      "Most outdoor surfaces — driveways, sidewalks, patios, decks, fences, siding, and more. Not everything should get high pressure. Graham picks the right approach for each surface so it comes clean without damage.",
    category: "pressure" as const,
  },
  {
    question: "How quickly can you schedule a job?",
    answer:
      "Many jobs are same day or next day, depending on the schedule. Graham lives in Rocklin and keeps response times short. You’ll get timing details after you reach out through the contact form.",
    category: "general" as const,
  },
  {
    question: "Is pressure washing safe for my home?",
    answer:
      "It depends on the surface. High pressure can hurt some materials, so Graham doesn’t use a one-size-fits-all approach. Siding and paint often get a gentler wash. Solar panels are cleaned with a soft brush and pure water — not high pressure on the glass. Hot water (up to 210°F) is used when grease and oil need extra help.",
    category: "pressure" as const,
  },
  {
    question: "Do you serve my area?",
    answer:
      "If you’re in Rocklin or one of the nearby cities listed on this site, yes. Outside that area? Still send a message — if Graham can’t take the job, he’ll be honest about it.",
    category: "general" as const,
  },
  {
    question: "How much does it cost?",
    answer:
      "Pricing depends on the job size and surface. Quotes are fair and based on the work involved — not the cheapest option in town, and not padded either. Neighbor group rates are available if a few homes on the same street book together. Use the contact form for a quote.",
    category: "general" as const,
  },
  {
    question: "What’s the difference between soft wash and pressure washing?",
    answer:
      "Pressure washing (including hot water) works well on concrete, heavy dirt, and oil. Soft wash uses lower pressure and cleaning solutions that are better for paint, stucco, and wood. Graham looks at the job and recommends what fits.",
    category: "pressure" as const,
  },
  {
    question: "Can you remove oil stains from a driveway?",
    answer:
      "Hot water pressure washing helps a lot with driveway oil. How much comes out depends on how old and deep the stain is. Share a photo through the contact form if you want a realistic expectation first.",
    category: "pressure" as const,
  },
  {
    question: "How often should solar panels be cleaned around Sacramento?",
    answer:
      "Dust and pollen build up quickly in this area. Many homes do well with one or two cleanings a year — more if you’re under trees or near construction. Checking your solar app before and after cleaning is a simple way to see the difference.",
    category: "solar" as const,
  },
  {
    question: "Is solar panel cleaning safe for my warranty?",
    answer:
      "Graham uses filtered water and a soft brush — not high pressure on the glass — which is the careful approach most manufacturers prefer. If you have specific warranty wording, include it when you request a quote.",
    category: "solar" as const,
  },
  {
    question: "Do you clean inside and outside trash bins?",
    answer:
      "Yes — inside, outside, and lids. Hot water helps cut residue and odor.",
    category: "bins" as const,
  },
  {
    question: "Do I need to be home?",
    answer:
      "Usually not. As long as Graham can reach the work area (and outdoor water when needed), you can go about your day. Details are confirmed when you book.",
    category: "general" as const,
  },
  {
    question: "What kind of permanent lights do you install?",
    answer:
      "Permanent outdoor lights meant to stay mounted year-round. They’re low profile when off, and you can change colors for Christmas, other holidays, team colors, or simple warm white.",
    category: "lights" as const,
  },
  {
    question: "Can permanent lights stay up all year?",
    answer:
      "Yes. That’s the idea. Leave them up and change the look from your phone when the season changes — no yearly take-down.",
    category: "lights" as const,
  },
  {
    question: "How is this different from temporary Christmas lights?",
    answer:
      "Temporary lights go up and down every year — clips, storage, burned-out bulbs, and the same work every December. Permanent lights stay mounted, look cleaner day to day, and usually cost less over a few seasons.",
    category: "lights" as const,
  },
  {
    question: "Do you offer neighbor or group discounts?",
    answer:
      "Yes. If a few homes on the same street book together, Graham can often offer a better rate.",
    category: "general" as const,
  },
];

export const navLinks = [
  { href: "/services/pressure-washing", label: "Pressure Wash" },
  { href: "/services/solar-panel-cleaning", label: "Solar" },
  { href: "/services/trash-bin-cleaning", label: "Bins" },
  { href: "/services/permanent-christmas-lights", label: "Lights" },
  { href: "/service-areas", label: "Areas" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

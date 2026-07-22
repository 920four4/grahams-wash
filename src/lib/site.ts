export const site = {
  name: "Graham's Wash",
  legalName: "Graham's Wash",
  tagline: "Wash. Refresh. Repeat.",
  description:
    "Local Rocklin pressure washing with hot water up to 210°F. Driveways, siding, solar panels, trash bins & permanent holiday lights.",
  url: "https://www.grahamswash.com",
  phone: "916-591-4058",
  phoneTel: "+19165914058",
  phoneDisplay: "(916) 591-4058",
  email: "service@grahamswash.com",
  owner: "Graham",
  city: "Rocklin",
  region: "CA",
  country: "US",
  serviceAreaLabel: "Rocklin & Greater Sacramento",
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
    headline: "Hot pressure washing that actually cuts through the gunk",
    blurb:
      "Driveways, sidewalks, fences, patios, and siding—blasted clean with hot water up to 210°F when the job needs it.",
    longDescription:
      "Graham brings pro-grade hot pressure washing to Rocklin and the Greater Sacramento area. Oil stains, mildew, irrigation stains, and years of buildup don't stand a chance. When a surface needs a gentler touch, soft wash methods protect paint, wood, and stucco while still getting results you can see from the street.",
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
      "Hot water up to 210°F for greasy oil messes",
      "Soft wash option for delicate siding & paint",
      "Driveways, sidewalks, fences, patios, decks",
      "Same-day or next-day often available",
    ],
    metaTitle: "Pressure Washing in Rocklin & Roseville | Hot Water Power Washing",
    metaDescription:
      "Hot pressure washing for driveways, fences, patios & siding. Soft wash when surfaces need care. Same/next-day often. Serving Rocklin & Greater Sacramento.",
  },
  {
    slug: "solar-panel-cleaning",
    name: "Solar Panel Washing",
    shortName: "Solar Wash",
    headline: "Pure-water solar cleaning that protects your panels",
    blurb:
      "Soft brush + 4-stage filtered water. No high pressure on glass—just peak performance and a cleaner look.",
    longDescription:
      "Dust, pollen, bird droppings, and Sacramento valley haze steal efficiency from your solar array. Graham cleans panels the right way: a boar's-hair brush and 100% pure 4-stage-filtered water. No harsh pressure on glass, no streaks, no warranty-scaring shortcuts.",
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
      "4-stage filtered pure water",
      "Soft boar's-hair brush—never high PSI on glass",
      "Visible difference vs. dirty neighbor arrays",
      "Pairs perfectly with a full exterior wash",
    ],
    metaTitle: "Solar Panel Cleaning Rocklin CA | Pure Water Panel Washing",
    metaDescription:
      "Safe solar panel washing with filtered pure water and soft brushes—no high pressure on glass. Boost efficiency. Rocklin, Roseville & nearby.",
  },
  {
    slug: "trash-bin-cleaning",
    name: "Garbage Bin Cleaning",
    shortName: "Bin Cleaning",
    headline: "Bins that don't announce themselves when you open the lid",
    blurb:
      "Inside-and-out hot wash for garbage and recycle bins. Say goodbye to sticky messes and funky smells.",
    longDescription:
      "Trash bins take a beating every week. Graham deep-cleans garbage and recycle cans inside and out with hot water sanitation—so your curb doesn't smell like last month's leftovers. One-time refresh or add-on when he's already at your place for a pressure wash.",
    icon: "trash",
    href: "/services/trash-bin-cleaning",
    image: "/images/bins/bin-before-after.webp",
    gallery: [
      "/images/bins/bin-before-after.webp",
      "/images/bins/bin-ba-2.webp",
    ],
    highlights: [
      "Hot wash inside and outside",
      "Garbage + recycle bins",
      "Great one-time or recurring add-on",
      "No need to be home in most cases",
    ],
    metaTitle: "Trash Can Cleaning Rocklin & Roseville | Bin Wash & Deodorize",
    metaDescription:
      "Deep clean smelly garbage and recycle bins—inside and out. Hot-wash sanitation. One-time or add-on with your pressure wash. Text Graham's Wash.",
  },
  {
    slug: "permanent-christmas-lights",
    name: "Permanent Christmas Lights",
    shortName: "Holiday Lights",
    headline: "Year-round lights that disappear by day—and wow at night",
    blurb:
      "Discreet permanent roofline lights (Govee). Flip a switch for Christmas, game day, or any holiday theme.",
    longDescription:
      "No more ladder nights and tangled storage bins. Graham installs permanent outdoor lighting that stays up year-round—nearly invisible during the day, spectacular when you want color. One- and two-story homes across Rocklin, Roseville, Lincoln, and the surrounding cities.",
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
      "Discreet by day, brilliant at night",
      "Color themes for every holiday & season",
      "1- and 2-story home installs",
      "Smarter than renting lights every year",
    ],
    metaTitle: "Permanent Christmas Lights Rocklin | Year-Round Holiday Lighting",
    metaDescription:
      "Discreet permanent outdoor lights (Govee) for every holiday and season. 1- and 2-story installs in Rocklin, Roseville, Lincoln & more. Free quote.",
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
    text: "Graham made our driveway look brand new. Showed up when he said he would, worked carefully around the plants, and the oil stains are actually gone. Highly recommend.",
    service: "Pressure Washing",
  },
  {
    name: "Mike R.",
    city: "Roseville",
    rating: 5,
    text: "Texted for a quote and had the bins and driveway done the next day. Super easy process and the house looks so much better from the street.",
    service: "Pressure Wash + Bins",
  },
  {
    name: "Jennifer L.",
    city: "Lincoln",
    rating: 5,
    text: "Our solar panels were filthy compared to the neighbors. After Graham cleaned them you can see the difference immediately. Careful, professional, fair price.",
    service: "Solar Panel Cleaning",
  },
  {
    name: "David K.",
    city: "Loomis",
    rating: 5,
    text: "Permanent lights install was clean and tidy. You barely notice the channels during the day, and at night the house is a showstopper. Worth every penny.",
    service: "Permanent Lights",
  },
  {
    name: "Amanda T.",
    city: "Granite Bay",
    rating: 5,
    text: "One-man operation that feels personal in the best way. Graham answers texts, does careful work, and leaves everything cleaner than he found it.",
    service: "Full Exterior Wash",
  },
  {
    name: "Chris P.",
    city: "Folsom",
    rating: 5,
    text: "Had the patio, fence, and sidewalks done. Hot water made a huge difference on the greasy spots by the garage. Will book him every year.",
    service: "Hot Pressure Washing",
  },
] as const;

export const faqs = [
  {
    question: "What cities do you service?",
    answer:
      "Graham's Wash is based in Rocklin and serves Auburn, Penryn, Newcastle, Loomis, Lincoln, Roseville, Rocklin, Granite Bay, Folsom, El Dorado Hills (EDH), Orangevale, Citrus Heights, Antelope, Sacramento, Fair Oaks, Carmichael, North Highlands, Rancho Cordova, Arden-Arcade, and Rio Linda. Not sure if you're in range? Text or call—if Graham can't make it out, he'll help point you in the right direction.",
    category: "general" as const,
  },
  {
    question: "What can you power wash?",
    answer:
      "Almost every exterior surface—concrete patios, driveways, sidewalks, solar panels, wood decks, tile roofing, fences, siding, windows, and more. Not everything should get high pressure. Graham matches the method to the surface so you get maximum cleanliness with minimum wear.",
    category: "pressure" as const,
  },
  {
    question: "How fast is the service?",
    answer:
      "Most jobs can be done next day, and often even the same day as your inquiry. Graham lives in Rocklin and is happy to help neighbors. He shows up when promised, exceeds expectations, and leaves you satisfied—guaranteed.",
    category: "general" as const,
  },
  {
    question: "Is it safe for my surfaces?",
    answer:
      "High-pressure water can damage some surfaces—that's why Graham uses the right approach for each job. Solar panels get a soft boar's-hair brush and pure 4-stage-filtered water (no high PSI on glass). Delicate siding often gets a soft wash focused on cleaning agents rather than brute force. Specialized equipment can heat water to 210°F to cut through greasy messes when appropriate.",
    category: "pressure" as const,
  },
  {
    question: "Do you serve my area?",
    answer:
      "If you're in Rocklin or the surrounding Greater Sacramento / Placer County cities listed on this site, yes. Outside the usual zone? Reach out anyway—Graham has good relationships with other local pros and will help get you taken care of one way or another.",
    category: "general" as const,
  },
  {
    question: "How much do you charge?",
    answer:
      "Rates reflect years of hands-on work and investment in specialized equipment—fair, not rock-bottom. Graham is always happy to work within a budget to find something effective and affordable. One easy way to save: rope in a neighbor or two for group rates on the same street.",
    category: "general" as const,
  },
  {
    question: "Soft wash vs. pressure washing—which do I need?",
    answer:
      "Pressure (and hot pressure) is perfect for concrete, heavy oil, and tough grime. Soft wash uses lower pressure plus the right cleaners for paint, stucco, and wood that could etch or scar under high PSI. Graham walks the job and recommends the safer path that still looks amazing.",
    category: "pressure" as const,
  },
  {
    question: "Can you remove oil stains from concrete?",
    answer:
      "Hot water pressure washing is one of the best tools for driveway oil. Results depend on how deep and old the stain is, but most homeowners are surprised how much comes up. Ask for a photo quote if you want a realistic expectation first.",
    category: "pressure" as const,
  },
  {
    question: "How often should solar panels be cleaned in the Sacramento area?",
    answer:
      "Valley dust, pollen, and dry seasons build up faster than coastal areas. Many homeowners benefit from 1–2 cleanings a year; more if you're under trees or near construction. A before/after efficiency check on your inverter app often makes the ROI obvious.",
    category: "solar" as const,
  },
  {
    question: "Will solar cleaning void my panel warranty?",
    answer:
      "Graham avoids high-pressure blasts on glass and uses pure filtered water with a soft brush—the careful method manufacturers expect. If you have specific warranty language, share it and he'll work within it.",
    category: "solar" as const,
  },
  {
    question: "Do you clean inside and outside the trash bins?",
    answer:
      "Yes. Inside, outside, lids—the works. Hot wash helps knock down residue and odor so bin day isn't a nose-wrinkling event.",
    category: "bins" as const,
  },
  {
    question: "Do I need to be home for service?",
    answer:
      "Usually no. As long as Graham can access the area (and outdoor water when needed for certain washes), you can go about your day. Details get confirmed when you book.",
    category: "general" as const,
  },
  {
    question: "What type of lights do you install?",
    answer:
      "Permanent outdoor lighting systems (including Govee-class smart lights) designed to stay mounted year-round. They're discreet when off and full-color when you want a theme—Christmas, holidays, team colors, or everyday warm white.",
    category: "lights" as const,
  },
  {
    question: "Can permanent lights be used year-round?",
    answer:
      "That's the point. Leave them up. Change colors and scenes from your phone for every season without another ladder climb or storage bin full of dead strands.",
    category: "lights" as const,
  },
  {
    question: "How do permanent installs differ from temporary Christmas hanging?",
    answer:
      "Temporary hangs go up and down every year (clips, timers, storage, burned-out bulbs). Permanent channels or tracks stay mounted, look cleaner, and cost less over a few seasons when you stop paying for install/remove every December.",
    category: "lights" as const,
  },
  {
    question: "Do you offer neighbor or group discounts?",
    answer:
      "Yes. If a few homes on the same street book together, Graham can often offer group rates—less drive time, more shine for everyone.",
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

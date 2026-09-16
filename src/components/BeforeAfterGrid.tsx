import Image from "next/image";

const shots = [
  {
    src: "/images/pressure/walkway-after.webp",
    alt: "Pressure washed exposed-aggregate walkway in Rocklin, CA",
    label: "Walkway",
  },
  {
    src: "/images/pressure/pool-deck-after.webp",
    alt: "Clean exposed-aggregate pool deck after pressure washing",
    label: "Pool deck",
  },
  {
    src: "/images/pressure/patio-after.webp",
    alt: "Stamped-concrete patio after pressure washing",
    label: "Patio",
  },
  {
    src: "/images/solar/graham-cleaning.webp",
    alt: "Graham soft-brush cleaning rooftop solar panels in Rocklin",
    label: "Solar",
  },
  {
    src: "/images/birdproofing/mesh-neighborhood.webp",
    alt: "Solar panel birdproofing mesh on a clay tile roof",
    label: "Birdproofing",
  },
  {
    src: "/images/bins/green-bin-after.webp",
    alt: "Trash bin interior after a hot wash by Graham's Wash",
    label: "Bins",
  },
  {
    src: "/images/lights/warm-craftsman.webp",
    alt: "Permanent warm-white Christmas lights on a craftsman home",
    label: "Lights",
  },
  {
    src: "/images/before-after/driveway-levi.webp",
    alt: "Driveway before and after pressure washing in Rocklin",
    label: "Driveway",
  },
];

export function BeforeAfterGrid({ limit = 8 }: { limit?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {shots.slice(0, limit).map((shot) => (
        <figure
          key={shot.src}
          className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
        >
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent px-3 pb-3 pt-8 text-xs font-semibold text-white">
            {shot.label}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

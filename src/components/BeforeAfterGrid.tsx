import Image from "next/image";

const shots = [
  { src: "/images/before-after/driveway-levi.webp", alt: "Driveway before and after pressure washing", label: "Driveway" },
  { src: "/images/before-after/driveway-keith.webp", alt: "Concrete cleaning before and after", label: "Concrete" },
  { src: "/images/before-after/sidewalk.webp", alt: "Sidewalk pressure washing before and after", label: "Sidewalk" },
  { src: "/images/before-after/fence.webp", alt: "Fence brightening before and after", label: "Fence" },
  { src: "/images/before-after/gate.webp", alt: "Gate cleaning before and after", label: "Gate" },
  { src: "/images/bins/bin-before-after.webp", alt: "Trash bin cleaning before and after", label: "Trash bins" },
  { src: "/images/solar/panels-vs-neighbors.webp", alt: "Clean solar panels compared to neighbors", label: "Solar panels" },
  { src: "/images/before-after/trailer.webp", alt: "Trailer exterior cleaning before and after", label: "Trailer" },
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

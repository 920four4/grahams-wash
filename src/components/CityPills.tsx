import Link from "next/link";
import { cities } from "@/lib/site";

export function CityPills({ limit }: { limit?: number }) {
  const list = limit ? cities.slice(0, limit) : cities;
  return (
    <div className="flex flex-wrap gap-2">
      {list.map((city) => (
        <span
          key={city}
          className="rounded-full border border-border bg-white px-3.5 py-1.5 text-sm font-medium text-navy shadow-sm"
        >
          {city}
        </span>
      ))}
      {limit && cities.length > limit && (
        <Link
          href="/service-areas"
          className="rounded-full border border-brand/20 bg-brand-soft px-3.5 py-1.5 text-sm font-semibold text-brand"
        >
          +{cities.length - limit} more
        </Link>
      )}
    </div>
  );
}

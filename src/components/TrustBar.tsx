import { Clock3, MapPin, ShieldCheck, Star } from "lucide-react";
import { site } from "@/lib/site";

const items = [
  {
    icon: Star,
    title: `${site.googleRating.toFixed(1)} on Google`,
    subtitle: `${site.googleReviewCount} five-star reviews`,
  },
  {
    icon: MapPin,
    title: "Rocklin based",
    subtitle: "Neighbor-level reliability",
  },
  {
    icon: Clock3,
    title: "Often same / next day",
    subtitle: "Fast replies by text",
  },
  {
    icon: ShieldCheck,
    title: "Right method, every surface",
    subtitle: "Hot wash · soft wash · pure water",
  },
];

export function TrustBar() {
  return (
    <section className="border-y border-border bg-white">
      <div className="mx-auto grid max-w-6xl gap-0 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className={`flex items-center gap-3 px-5 py-5 ${i < items.length - 1 ? "border-b border-border sm:border-b-0 lg:border-r" : ""} ${i % 2 === 0 ? "sm:border-r lg:border-r" : ""} ${i === 1 ? "sm:border-r-0 lg:border-r" : ""}`}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-navy">{item.title}</p>
                <p className="text-xs text-muted">{item.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Droplets, Sparkles, Sun, Trash2 } from "lucide-react";
import { services } from "@/lib/site";

const icons = {
  droplets: Droplets,
  sun: Sun,
  trash: Trash2,
  sparkles: Sparkles,
};

export function ServiceCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {services.map((service, i) => {
        const Icon = icons[service.icon];
        return (
          <Link
            key={service.slug}
            href={service.href}
            className="pressable group relative overflow-hidden rounded-[1.75rem] border border-border bg-white shadow-sm transition hover:border-brand/30 hover:shadow-lg hover:shadow-brand/10"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-navy/5">
              <Image
                src={service.image}
                alt={service.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition duration-500 group-hover:scale-105"
                priority={i < 2}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />
              <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/95 text-brand shadow">
                <Icon className="h-5 w-5" />
              </span>
            </div>
            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-xl font-bold tracking-tight text-navy">{service.name}</h3>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand transition group-hover:bg-brand group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{service.blurb}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

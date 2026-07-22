import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { cities, services, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4 lg:col-span-1">
            {/* Full badge mark — clearer on a white plate against the dark footer */}
            <Link
              href="/"
              className="inline-flex items-center rounded-2xl bg-white px-3.5 py-2.5 shadow-sm ring-1 ring-black/5"
              aria-label="Graham's Wash home"
            >
              <Image
                src="/images/logo/gw-transparent-bg-badge-logo.png"
                alt="Graham's Wash — Bin Cleaning & Pressure Washing"
                width={180}
                height={180}
                className="h-16 w-16 object-contain sm:h-[4.5rem] sm:w-[4.5rem]"
              />
              <span className="ml-3 hidden min-w-0 sm:block">
                <span className="block font-display text-base font-extrabold tracking-tight text-navy">
                  Graham&apos;s Wash
                </span>
                <span className="block text-xs font-medium text-muted">
                  Bin cleaning & pressure washing
                </span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/70">
              Locally owned exterior cleaning in Rocklin. Pressure washing, solar panel cleaning, bin wash, and
              permanent holiday lights — focused on quality and clear communication.
            </p>
            <div className="flex items-center gap-2 text-sm font-medium text-white/90">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1">
                ★ {site.googleRating.toFixed(1)} on Google
              </span>
              <span className="text-white/50">·</span>
              <span className="text-white/70">{site.googleReviewCount} reviews</span>
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white/50">Services</h3>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={s.href} className="text-sm text-white/80 transition hover:text-white">
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/results" className="text-sm text-white/80 transition hover:text-white">
                  Before & after
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-sm text-white/80 transition hover:text-white">
                  Google reviews
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-white/80 transition hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-white/80 transition hover:text-white">
                  About Graham
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white/50">Service area</h3>
            <p className="mt-4 flex items-start gap-2 text-sm text-white/80">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              Based in {site.city}, CA — serving {cities.length}+ nearby cities
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/55">{cities.slice(0, 10).join(" · ")} · and more</p>
            <Link href="/service-areas" className="mt-3 inline-block text-sm font-semibold text-brand hover:underline">
              See all cities →
            </Link>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white/50">Get in touch</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              The best way to reach Graham is through the contact form. Leave your details and how you’d like to hear
              back — text, call, or email.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex h-11 items-center justify-center rounded-2xl bg-brand px-5 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:bg-brand-dark"
            >
              Request a quote
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Locally owned in {site.city}, California.
          </p>
          <p>Quality work. Clear communication. Clean results.</p>
        </div>
      </div>
    </footer>
  );
}

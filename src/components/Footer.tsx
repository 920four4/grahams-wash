import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { cities, services, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4 lg:col-span-1">
            <Image
              src="/images/logo/Grahams-Wash-Logo-Badge.svg"
              alt="Graham's Wash"
              width={160}
              height={56}
              className="h-12 w-auto brightness-0 invert"
            />
            <p className="max-w-xs text-sm leading-relaxed text-white/70">
              One-man quality from a Rocklin neighbor. Hot pressure washing, pure-water solar cleaning, bin wash, and
              permanent holiday lights—done right.
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
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`tel:${site.phoneTel}`}
                  className="flex items-center gap-2 text-sm font-semibold text-white hover:text-brand"
                >
                  <Phone className="h-4 w-4 text-brand" />
                  {site.phoneDisplay}
                </a>
                <p className="ml-6 text-xs text-white/50">Call or text — same number</p>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-white"
                >
                  <Mail className="h-4 w-4 text-brand" />
                  {site.email}
                </a>
              </li>
            </ul>
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
          <p>Quality work. Honest communication. Spotless results.</p>
        </div>
      </div>
    </footer>
  );
}

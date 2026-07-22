"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-all duration-300",
          scrolled
            ? "border-border/80 bg-white/90 shadow-sm backdrop-blur-xl"
            : "border-transparent bg-white/75 backdrop-blur-md",
        )}
        style={{ paddingTop: "var(--safe-top)" }}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link href="/" className="relative flex shrink-0 items-center gap-2" aria-label="Graham's Wash home">
            <Image
              src="/images/logo/Grahams-Wash-Logo-Badge.svg"
              alt="Graham's Wash"
              width={148}
              height={52}
              priority
              className="h-10 w-auto sm:h-11"
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.slice(0, 6).map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                    active ? "bg-brand-soft text-brand" : "text-navy/75 hover:bg-black/5 hover:text-navy",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button href="/contact" size="sm" className="hidden sm:inline-flex lg:h-11 lg:px-5 lg:text-sm">
              Get a quote
            </Button>
            <button
              type="button"
              className="pressable inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-white text-navy lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-navy/40 backdrop-blur-sm transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-40 origin-top rounded-b-[2rem] border-b border-border bg-white px-4 pb-8 pt-20 shadow-2xl transition-transform duration-300 ease-out lg:hidden",
          open ? "translate-y-0" : "-translate-y-full",
        )}
        style={{ paddingTop: "calc(5rem + var(--safe-top))" }}
      >
        <nav className="mx-auto flex max-w-lg flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-2xl px-4 py-3.5 text-lg font-semibold text-navy transition-colors hover:bg-brand-soft hover:text-brand"
            >
              {link.label}
            </Link>
          ))}
          <Button href="/contact" className="mt-4 w-full" size="lg">
            Request a free quote
          </Button>
        </nav>
      </div>
    </>
  );
}

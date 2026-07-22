"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MenuToggleIcon } from "@/components/MenuToggleIcon";
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
            ? "border-border/80 bg-white/95 shadow-sm backdrop-blur-xl"
            : "border-border/40 bg-white/90 backdrop-blur-md",
        )}
        style={{ paddingTop: "var(--safe-top)" }}
      >
        <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between gap-3 px-4 sm:h-[4.75rem] sm:px-6">
          <Link
            href="/"
            className="relative flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3"
            aria-label="Graham's Wash home"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-soft sm:h-12 sm:w-12">
              <Image
                src="/images/logo/Grahams-Wash-Icon.svg"
                alt=""
                width={40}
                height={40}
                priority
                className="h-7 w-7 sm:h-8 sm:w-8"
              />
            </span>
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="font-display text-[1.05rem] font-extrabold tracking-tight text-navy sm:text-xl">
                Graham&apos;s Wash
              </span>
              <span className="truncate text-[11px] font-medium text-muted sm:text-xs">
                Rocklin · Pressure · Solar · Lights
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {navLinks.slice(0, 6).map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    active ? "bg-brand-soft text-brand" : "text-navy/75 hover:bg-black/5 hover:text-navy",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button href="/contact" size="sm" className="hidden sm:inline-flex sm:h-11 sm:px-5 sm:text-sm">
              Get a quote
            </Button>
            <button
              type="button"
              className={cn(
                "pressable inline-flex h-11 w-11 items-center justify-center rounded-2xl border transition-all lg:hidden",
                open
                  ? "border-navy bg-navy text-white shadow-md"
                  : "border-border bg-white text-navy shadow-sm hover:border-brand/40 hover:bg-brand-soft",
              )}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <MenuToggleIcon open={open} />
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
        style={{ paddingTop: "calc(5.5rem + var(--safe-top))" }}
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

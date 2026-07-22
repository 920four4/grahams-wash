"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Droplets, Home, MessageCircle, Sparkles, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/", label: "Home", icon: Home, match: (p: string) => p === "/" },
  {
    href: "/services/pressure-washing",
    label: "Wash",
    icon: Droplets,
    match: (p: string) => p.includes("pressure") || p.includes("trash") || p === "/services",
  },
  {
    href: "/services/solar-panel-cleaning",
    label: "Solar",
    icon: Sun,
    match: (p: string) => p.includes("solar"),
  },
  {
    href: "/services/permanent-christmas-lights",
    label: "Lights",
    icon: Sparkles,
    match: (p: string) => p.includes("lights") || p.includes("christmas"),
  },
  {
    href: "/contact",
    label: "Contact",
    icon: MessageCircle,
    match: (p: string) => p.startsWith("/contact") || p.startsWith("/faq") || p.startsWith("/about"),
  },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border/80 bg-white/92 backdrop-blur-xl lg:hidden"
      style={{ paddingBottom: "var(--safe-bottom)" }}
      aria-label="Primary"
    >
      <ul className="mx-auto grid h-[4.5rem] max-w-lg grid-cols-5 px-1">
        {tabs.map((tab) => {
          const active = tab.match(pathname);
          const Icon = tab.icon;
          return (
            <li key={tab.href} className="flex">
              <Link
                href={tab.href}
                className={cn(
                  "pressable flex flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl text-[11px] font-semibold transition-colors",
                  active ? "text-brand" : "text-muted",
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-12 items-center justify-center rounded-2xl transition-colors",
                    active && "bg-brand-soft",
                  )}
                >
                  <Icon className={cn("h-[1.15rem] w-[1.15rem]", active && "stroke-[2.5]")} />
                </span>
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

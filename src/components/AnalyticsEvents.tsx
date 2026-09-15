"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { track, trackPageView } from "@/lib/analytics";

function pathWithQuery(pathname: string, search: string) {
  return search ? `${pathname}?${search}` : pathname;
}

function PageViews() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  useEffect(() => {
    trackPageView(pathWithQuery(pathname, search));
  }, [pathname, search]);

  return null;
}

function ClickTracking() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a");
      if (!link) return;

      const href = link.getAttribute("href") || "";
      const label = (link.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80);

      if (href === "/contact" || href.startsWith("/contact?")) {
        track("click_contact_cta", {
          link_url: href,
          link_text: label,
          page_path: window.location.pathname,
        });
        return;
      }

      if (href.startsWith("/services/")) {
        track("select_service", {
          service: href.replace("/services/", "").split("?")[0],
          link_text: label,
          page_path: window.location.pathname,
        });
        return;
      }

      const isOutbound =
        href.startsWith("http") && !href.includes("grahamswash.com") && !href.includes("localhost");
      if (isOutbound) {
        track("click_outbound", {
          link_url: href,
          link_text: label,
          page_path: window.location.pathname,
        });
      }
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

export function AnalyticsEvents() {
  return (
    <>
      <Suspense fallback={null}>
        <PageViews />
      </Suspense>
      <ClickTracking />
    </>
  );
}

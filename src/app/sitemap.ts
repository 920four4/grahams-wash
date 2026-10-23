import type { MetadataRoute } from "next";
import { cityPageHref, cityPages } from "@/lib/city-pages";
import { services, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/contact", "/faq", "/reviews", "/results", "/service-areas", "/services"].map((path) => ({
    url: `${site.url}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: path === "/reviews" || path === "/results" ? ("daily" as const) : ("weekly" as const),
    priority: path === "" ? 1 : path === "/reviews" || path === "/results" ? 0.9 : 0.8,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${site.url}${s.href}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const cityRoutes = cityPages.map((c) => ({
    url: `${site.url}${cityPageHref(c.slug)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...cityRoutes];
}

import type { MetadataRoute } from "next";
import { services, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/contact", "/faq", "/reviews", "/service-areas"].map((path) => ({
    url: `${site.url}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: path === "/reviews" ? ("daily" as const) : ("weekly" as const),
    priority: path === "" ? 1 : path === "/reviews" ? 0.9 : 0.8,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${site.url}${s.href}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...serviceRoutes];
}

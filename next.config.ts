import type { NextConfig } from "next";
import { withBotId } from "botid/next/config";

const APEX = "https://grahamswash.com";
const WWW_HOST = { type: "host" as const, value: "www.grahamswash.com" };

/** Old Webflow URLs and the live page each one now lives at. */
const OLD_WEBFLOW_PATHS: Record<string, string> = {
  "/holiday-lights": "/services/permanent-christmas-lights",
  "/christmas-lights": "/services/permanent-christmas-lights",
  "/permanent-lights": "/services/permanent-christmas-lights",
  "/lights": "/services/permanent-christmas-lights",
  "/solar": "/services/solar-panel-cleaning",
  "/solar-panels": "/services/solar-panel-cleaning",
  "/solar-panel-cleaning": "/services/solar-panel-cleaning",
  "/pressure-washing": "/services/pressure-washing",
  "/power-washing": "/services/pressure-washing",
  "/bins": "/services/trash-bin-cleaning",
  "/trash-bin": "/services/trash-bin-cleaning",
  "/trash-bins": "/services/trash-bin-cleaning",
  "/trash-bin-cleaning": "/services/trash-bin-cleaning",
  "/birdproofing": "/services/birdproofing",
};

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "lh4.googleusercontent.com" },
      { protocol: "https", hostname: "lh5.googleusercontent.com" },
      { protocol: "https", hostname: "lh6.googleusercontent.com" },
      { protocol: "https", hostname: "streetviewpixels-pa.googleapis.com" },
    ],
  },
  async redirects() {
    const oldPaths = Object.entries(OLD_WEBFLOW_PATHS);
    return [
      // www is a Vercel domain redirect today, so these www rules only run once
      // www.grahamswash.com serves this project directly. They send each old
      // www URL to its final apex page in one 308 instead of www -> apex -> page.
      ...oldPaths.map(([source, destination]) => ({
        source,
        has: [WWW_HOST],
        destination: `${APEX}${destination}`,
        permanent: true,
      })),
      { source: "/:path*", has: [WWW_HOST], destination: `${APEX}/:path*`, permanent: true },
      ...oldPaths.map(([source, destination]) => ({ source, destination, permanent: true })),
    ];
  },
};

export default withBotId(nextConfig);

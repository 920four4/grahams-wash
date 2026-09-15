import type { NextConfig } from "next";
import { withBotId } from "botid/next/config";

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
    return [
      { source: "/holiday-lights", destination: "/services/permanent-christmas-lights", permanent: true },
      { source: "/christmas-lights", destination: "/services/permanent-christmas-lights", permanent: true },
      { source: "/permanent-lights", destination: "/services/permanent-christmas-lights", permanent: true },
      { source: "/lights", destination: "/services/permanent-christmas-lights", permanent: true },
      { source: "/solar", destination: "/services/solar-panel-cleaning", permanent: true },
      { source: "/solar-panels", destination: "/services/solar-panel-cleaning", permanent: true },
      { source: "/solar-panel-cleaning", destination: "/services/solar-panel-cleaning", permanent: true },
      { source: "/pressure-washing", destination: "/services/pressure-washing", permanent: true },
      { source: "/power-washing", destination: "/services/pressure-washing", permanent: true },
      { source: "/bins", destination: "/services/trash-bin-cleaning", permanent: true },
      { source: "/trash-bin", destination: "/services/trash-bin-cleaning", permanent: true },
      { source: "/trash-bins", destination: "/services/trash-bin-cleaning", permanent: true },
      { source: "/trash-bin-cleaning", destination: "/services/trash-bin-cleaning", permanent: true },
    ];
  },
};

export default withBotId(nextConfig);

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      {
        source: "/holiday-lights",
        destination: "/services/permanent-christmas-lights",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

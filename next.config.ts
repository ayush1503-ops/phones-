import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The preview serves photos from the existing WordPress media library directly.
    // After running assets:vendor, remove this to enable Next.js image optimization.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "dumbphones.co.in", pathname: "/wp-content/uploads/**" },
    ],
  },
};

export default nextConfig;

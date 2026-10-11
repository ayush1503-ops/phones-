import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the Arena iframe host to load Turbopack's development resources.
  allowedDevOrigins: ["3000-ifncog6x7o8p7fbb06adg.e2b.app"],
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

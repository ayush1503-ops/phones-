import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The dev server is proxied through hosts such as 3000-<id>.e2b.app in the
  // preview sandbox, so allow that suffix (and anything in ALLOWED_DEV_ORIGINS)
  // to load Turbopack's development resources.
  allowedDevOrigins: [
    "*.e2b.app",
    ...(process.env.ALLOWED_DEV_ORIGINS?.split(",")
      .map((origin) => origin.trim())
      .filter(Boolean) ?? []),
  ],
  images: {
    // Product photos are served from the existing WordPress media library.
    // After running assets:vendor, remove "unoptimized" to enable optimization.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "dumbphones.co.in", pathname: "/wp-content/uploads/**" },
    ],
  },
};

export default nextConfig;

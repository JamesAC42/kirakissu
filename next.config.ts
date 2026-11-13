import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Media bucket on Cloudflare R2 (AWS_S3_PUBLIC_BASE_URL).
      { protocol: "https", hostname: "media.kirakissu.com" },
      { protocol: "https", hostname: "**.r2.dev" },
      // Legacy AWS S3 URLs.
      { protocol: "https", hostname: "**.amazonaws.com" },
      { protocol: "https", hostname: "**.s3.amazonaws.com" },
      { protocol: "https", hostname: "**.cloudfront.net" },
      { protocol: "https", hostname: "s4.anilist.co" },
    ],
  },
};

export default nextConfig;

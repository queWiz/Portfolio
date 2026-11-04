import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The About photo is hosted on Vercel Blob, outside the repo.
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
    qualities: [75, 85],
  },
};

export default nextConfig;

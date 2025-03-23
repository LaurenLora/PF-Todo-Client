import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "playable-factory.b-cdn.net",
        port: "",
        pathname: "/uploads/**",
        search: ""
      }
    ]
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "10mb"
    }
  },
  output: "standalone"
};

export default nextConfig;

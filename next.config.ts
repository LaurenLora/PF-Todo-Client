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
  }
};

export default nextConfig;

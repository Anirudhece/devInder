import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["3000-firebase-devinder-1747476670920.cluster-nzwlpk54dvagsxetkvxzbvslyi.cloudworkstations.dev"],
  reactStrictMode:true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true, 
  },
};

export default nextConfig;

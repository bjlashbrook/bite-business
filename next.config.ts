import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dinnerdeal.backendless.com'
      },
      {
        protocol: 'https',
        hostname: 'demo.eccdn.com.au'
      }
    ]
  }
};

export default nextConfig;

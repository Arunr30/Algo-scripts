import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'www.google.com',
        protocol: "https",
        
      },
      {
        hostname: 'images.unsplash.com',
        protocol: "https",
      },
      {
        hostname: 'lh3.googleusercontent.com',
        protocol: "https",
      }
      ,
      {
        hostname: "i.ytimg.com",
        protocol: "https"
      },
      {
        hostname: "plus.unsplash.com",
        protocol: "https"
      },
      {
        hostname: "**",
        protocol: "https"
      }
    ]
  }
};

export default nextConfig;

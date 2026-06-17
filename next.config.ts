// next.config.ts
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    minimumCacheTTL: 60,
  },
  // Increase timeout for image optimization
  experimental: {
    proxyTimeout: 30000, // 30 seconds
  },
};

export default nextConfig;
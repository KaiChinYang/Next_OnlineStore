/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.foodstore.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.epochtimes.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "canonrice.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

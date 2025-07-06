/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/**",
      },
    ],
    formats: ["image/webp", "image/avif"],
  },
  // Enable compression
  compress: true,
  // Optimize for production
  swcMinify: true,
};

export default nextConfig;

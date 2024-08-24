/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "epic.gsfc.nasa.gov",
      },
      {
        protocol: "https",
        hostname: "apod.nasa.gov",
      },
      {
        protocol: "https",
        hostname: "mars.nasa.gov",
      },
      {
        protocol: "http",
        hostname:"mars.jpl.nasa.gov",
      },
    ],
  },
};

module.exports = nextConfig;

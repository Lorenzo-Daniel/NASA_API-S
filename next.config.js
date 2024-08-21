/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'apod.nasa.gov', // Solo el dominio, sin la ruta
      },
    ],
  },
};


module.exports = nextConfig
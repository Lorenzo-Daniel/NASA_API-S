/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
 images:{
    domains : ['apod.nasa.gov']
  }
};


module.exports = nextConfig
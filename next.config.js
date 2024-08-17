/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: [ "es","en"],
    defaultLocale: "es",
  },images:{
    domains : ['apod.nasa.gov']
  }
};


module.exports = nextConfig
/** @type {import('next').NextConfig} */

const nextConfig = {
  serverRuntimeConfig: {
    CONTENTFUL_CDA_KEY: process.env.CONTENTFUL_CDA_KEY,
  },

  reactStrictMode: true,

  images: {
    domains: ["images.ctfassets.net"],
  },

  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/blog/1",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

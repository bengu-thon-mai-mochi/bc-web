/** @type {import('next').NextConfig} */

const nextConfig = {
  serverRuntimeConfig: {
    CONTENTFUL_CDA_KEY: process.env.CONTENTFUL_CDA_KEY,
  },

  reactStrictMode: true,
};

module.exports = nextConfig;

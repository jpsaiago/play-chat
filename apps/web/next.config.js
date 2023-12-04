/** @type {import('next').NextConfig} */

const UnoCSS = require("@unocss/webpack").default;

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.cache = false;
    config.plugins.push(UnoCSS());
    return config;
  },
  experimental: {
    externalDir: true,
  },
};

module.exports = nextConfig;

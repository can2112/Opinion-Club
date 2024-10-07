/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["polymarket.com"],
  },
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

module.exports = nextConfig;

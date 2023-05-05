/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
  experimental: {
    typedRoutes: true,
  },
};

module.exports = nextConfig;

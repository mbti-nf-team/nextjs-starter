/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  pageExtensions: ['page.tsx', 'api.ts'],
  swcMinify: true,
  compiler: {
    emotion: true,
  },
};

module.exports = nextConfig;

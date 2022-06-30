/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'api.ts'],
  swcMinify: true,
  compiler: {
    emotion: true,
  },
};

module.exports = nextConfig;

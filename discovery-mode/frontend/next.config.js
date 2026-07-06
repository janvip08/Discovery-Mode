/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["i.scdn.co"],
  },
  generateBuildId: async () => {
    return Date.now().toString();
  },
};

module.exports = nextConfig;

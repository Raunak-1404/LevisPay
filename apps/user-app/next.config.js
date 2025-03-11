/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during builds
  },
  typescript: {
    ignoreBuildErrors: true, // Disable TypeScript errors during the build
  },
  webpack: (config) => {
    config.externals = [...config.externals, "bcrypt"];
    return config;
  },

  transpilePackages: ["@repo/ui"],
};

export default nextConfig;

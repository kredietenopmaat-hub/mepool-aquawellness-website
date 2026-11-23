/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: { bodySizeLimit: "2mb" },
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig

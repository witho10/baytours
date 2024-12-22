/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Use the userland punycode package instead of the Node.js built-in one
    config.resolve.alias = {
      ...config.resolve.alias,
      punycode: 'punycode/',
    }
    return config
  },
}

module.exports = nextConfig 
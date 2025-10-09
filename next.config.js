/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['instagram.com', 'scontent.cdninstagram.com', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: 'instagram.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ]
  }
}

module.exports = nextConfig
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['instagram.com', 'scontent.cdninstagram.com', 'images.unsplash.com', 'via.placeholder.com', 'picsum.photos'],
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
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      }
    ]
  }
}

module.exports = nextConfig
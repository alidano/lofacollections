/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lofa.store', 
      'images.unsplash.com', 
      'via.placeholder.com',
      'i0.wp.com',
      'i1.wp.com', 
      'i2.wp.com',
      'i3.wp.com',
      'secure.gravatar.com',
      'wp.lofa.store'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.wp.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lofa.store',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig 
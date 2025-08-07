import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/checkout/',
          '/cart/',
          '/account/',
          '/_next/',
          '/static/',
          '/private/',
          '/.well-known/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/', 
          '/admin/', 
          '/checkout/', 
          '/account/',
          '/cart/'
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/', 
          '/admin/', 
          '/checkout/', 
          '/account/',
        ],
      },
      // Permitir específicamente a los bots de compras
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
      }
    ],
    sitemap: 'https://lofacollections.com/sitemap.xml',
    host: 'https://lofacollections.com',
  }
}
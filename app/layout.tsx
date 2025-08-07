import type { Metadata } from 'next'
import { Inter, Playfair_Display, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { Analytics } from '@/components/analytics'
import { CartProvider } from '@/components/cart-provider'
import { AuthProvider } from '@/components/auth-provider'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'LOFA Collections - Joyería Premium 925 Sterling Silver & Stainless Steel | Puerto Rico',
    template: '%s | LOFA Collections PR'
  },
  description: 'Joyería premium en Puerto Rico. Plata 925 sterling silver, acero inoxidable hipoalergénico y oro filled. ✨ Envío GRATIS en pedidos +$50. Resistente al agua, diseño único por Tamara Rivera.',
  keywords: [
    // Keywords principales Puerto Rico
    'joyería Puerto Rico', 'plata 925 Puerto Rico', 'sterling silver PR', 'acero inoxidable joyería', 
    'stainless steel jewelry PR', 'joyas hipoalergénicas Puerto Rico', 'joyería resistente agua',
    
    // Keywords de producto específicos
    'bangles Puerto Rico', 'pulseras acero inoxidable PR', 'aretes plata 925 Puerto Rico',
    'collares cadenas oro Puerto Rico', 'anillos ajustables PR', 'chokers acero Puerto Rico',
    'brazaletes stainless steel PR', 'pendientes sterling silver Puerto Rico',
    
    // Keywords comerciales locales
    'joyería online Puerto Rico', 'envío gratis joyas PR', 'joyas San Juan Puerto Rico',
    'joyería Carolina PR', 'joyas Bayamón Puerto Rico', 'joyería premium Puerto Rico',
    'joyas Ponce PR', 'joyería Caguas Puerto Rico', 'tienda joyas online PR',
    
    // Keywords de marca y diferenciación
    'LOFA Collections', 'Tamara Rivera joyería', 'joyería artesanal Puerto Rico',
    'joyas hechas a mano PR', 'diseñadora joyas Puerto Rico', 'joyería exclusiva PR',
    
    // Keywords long-tail específicos
    'joyería acero inoxidable que no se oxida Puerto Rico',
    'plata 925 hipoalergénica envío gratis PR',
    'joyas resistentes agua sudor Puerto Rico',
    'bangles pulseras acero inoxidable stainless steel PR'
  ],
  authors: [{ name: 'Tamara Rivera', url: 'https://lofacollections.com/sobre-nosotros' }],
  creator: 'LOFA Collections',
  publisher: 'LOFA Collections',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://lofacollections.com'),
  alternates: {
    canonical: '/',
    languages: {
      'es-PR': 'https://lofacollections.com/',
      'es': 'https://lofacollections.com/',
      'en': 'https://lofacollections.com/en'
    }
  },
  openGraph: {
    title: 'LOFA Collections - Joyería Premium Puerto Rico | Plata 925 & Stainless Steel',
    description: 'Descubre joyería de lujo en Puerto Rico. Plata 925 sterling silver y acero inoxidable hipoalergénico. ✨ Envío GRATIS en pedidos +$50. Resistente al agua.',
    url: 'https://lofacollections.com',
    siteName: 'LOFA Collections Puerto Rico',
    images: [
      {
        url: '/images/og-lofa-joyeria-puerto-rico.jpg',
        width: 1200,
        height: 630,
        alt: 'LOFA Collections - Joyería Premium Plata 925 y Acero Inoxidable Puerto Rico',
      },
      {
        url: '/images/og-bangles-stainless-steel-pr.jpg',
        width: 1200,
        height: 630,
        alt: 'Bangles y Pulseras Acero Inoxidable LOFA Collections Puerto Rico',
      }
    ],
    locale: 'es_PR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@lofacollections',
    creator: '@tamararivera_pr',
    title: 'LOFA Collections - Joyería Premium Puerto Rico',
    description: 'Plata 925 sterling silver y acero inoxidable hipoalergénico. Envío gratis en pedidos +$50 🇵🇷',
    images: ['/images/twitter-lofa-joyeria-pr.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification',
  },
  // Información geográfica específica para Puerto Rico
  other: {
    'geo.region': 'PR',
    'geo.placename': 'Puerto Rico',
    'geo.position': '18.2208;-66.5901', // Coordenadas de Puerto Rico
    'ICBM': '18.2208,-66.5901',
    'distribution': 'global',
    'rating': 'general',
    'HandheldFriendly': 'True',
    'MobileOptimized': '320'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // JSON-LD Schema para Local Business + Jewelry Store
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'JewelryStore',
        '@id': 'https://lofacollections.com/#organization',
        name: 'LOFA Collections',
        alternateName: 'LOFA Collections Puerto Rico',
        description: 'Joyería premium en Puerto Rico especializada en plata 925 sterling silver y acero inoxidable hipoalergénico',
        url: 'https://lofacollections.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://lofacollections.com/images/logo-lofa-collections.png',
          width: 300,
          height: 100
        },
        image: [
          'https://lofacollections.com/images/joyeria-plata-925-puerto-rico.jpg',
          'https://lofacollections.com/images/bangles-acero-inoxidable-pr.jpg',
          'https://lofacollections.com/images/aretes-sterling-silver-hipoalergenicos.jpg'
        ],
        founder: {
          '@type': 'Person',
          name: 'Tamara Rivera',
          jobTitle: 'Diseñadora de Joyería',
          nationality: 'Puerto Rico'
        },
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'PR',
          addressRegion: 'Puerto Rico'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '18.2208',
          longitude: '-66.5901'
        },
        areaServed: [
          {
            '@type': 'Country',
            name: 'Puerto Rico'
          },
          {
            '@type': 'Country', 
            name: 'United States'
          }
        ],
        priceRange: '$10-$300',
        paymentAccepted: ['Credit Card', 'PayPal', 'Apple Pay', 'Google Pay'],
        currenciesAccepted: 'USD',
        telephone: '+1-787-XXX-XXXX',
        email: 'info@lofacollections.com',
        sameAs: [
          'https://www.instagram.com/lofacollections',
          'https://www.facebook.com/lofacollections',
          'https://www.tiktok.com/@lofacollections'
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Catálogo Joyería Premium Puerto Rico',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'Joyería Plata 925 Sterling Silver',
                category: 'Jewelry',
                material: 'Sterling Silver 925'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product', 
                name: 'Joyería Acero Inoxidable Stainless Steel',
                category: 'Jewelry',
                material: 'Stainless Steel'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'Bangles y Pulseras Premium',
                category: 'Bracelet',
                material: 'Stainless Steel, Sterling Silver'
              }
            }
          ]
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '150',
          bestRating: '5',
          worstRating: '1'
        }
      },
      {
        '@type': 'WebSite',
        '@id': 'https://lofacollections.com/#website',
        url: 'https://lofacollections.com',
        name: 'LOFA Collections',
        description: 'Joyería premium Puerto Rico - Plata 925 y Acero Inoxidable',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://lofacollections.com/productos?q={search_term_string}'
          },
          'query-input': 'required name=search_term_string'
        },
        inLanguage: 'es-PR'
      }
    ]
  }

  return (
    <html lang="es-PR" className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#f2750a" />
        <meta name="msapplication-TileColor" content="#f2750a" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/images/hero-joyeria-puerto-rico.webp" as="image" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 5000,
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
            <Analytics />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

// Función helper para generar Schema de productos individuales
export function generateProductSchema(product: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images?.map((img: string) => img) || [],
    brand: {
      '@type': 'Brand',
      name: 'LOFA Collections'
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'LOFA Collections',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'PR'
      }
    },
    material: product.material || 'Sterling Silver 925, Stainless Steel',
    category: product.category || 'Jewelry',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: product.price,
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'LOFA Collections'
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'USD'
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'PR'
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 2,
            unitCode: 'DAY'
          },
          transitTime: {
            '@type': 'QuantitativeValue', 
            minValue: 2,
            maxValue: 5,
            unitCode: 'DAY'
          }
        }
      }
    },
    aggregateRating: product.rating ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount || 1
    } : undefined
  }
}
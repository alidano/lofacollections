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
    default: 'LOFA Collections - Joyería 925 Sterling Silver y Acero Inoxidable | Puerto Rico',
    template: '%s | LOFA Collections'
  },
  description: 'Descubre elegancia y calidad en LOFA Collections. Joyería de plata 925, acero inoxidable y oro. Envío gratis a Puerto Rico en pedidos +$50. Fundada por Tamara Rivera.',
  keywords: ['joyería', 'plata 925', 'acero inoxidable', 'oro', 'Puerto Rico', 'Tamara Rivera', 'bangles', 'pulseras', 'aretes', 'collares', 'anillos'],
  authors: [{ name: 'Tamara Rivera' }],
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
  },
  openGraph: {
    title: 'LOFA Collections - Elegancia en cada pieza',
    description: 'Descubre elegancia y calidad en LOFA Collections. Joyería de plata 925, acero inoxidable y oro. Envío gratis a Puerto Rico en pedidos +$50.',
    url: 'https://lofacollections.com',
    siteName: 'LOFA Collections',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LOFA Collections - Joyería Premium',
      },
    ],
    locale: 'es_PR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LOFA Collections - Elegancia en cada pieza',
    description: 'Descubre elegancia y calidad en LOFA Collections. Joyería de plata 925, acero inoxidable y oro.',
    images: ['/images/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f2750a" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { ShoppingCart, Search, User, Menu, X, Heart } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { SearchModal } from '@/components/modals/search-modal'
import { UserMenu } from '@/components/ui/user-menu'
import { MobileMenu } from '@/components/ui/mobile-menu'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Bangles', href: '/categoria/bangles' },
  { name: 'Aretes', href: '/categoria/aretes' },
  { name: 'Collares', href: '/categoria/collares' },
  { name: 'Anillos', href: '/categoria/anillos' },
  { name: 'Colección Masculina', href: '/categoria/masculina' },
  { name: 'Cuidado de Joyas', href: '/cuidado-joyas' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contacto', href: '/contacto' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { data: session } = useSession()
  const { items } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200' 
          : 'bg-white'
      }`}>
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center justify-center flex-1 lg:flex-none">
              <ImageWithFallback
                src="/images/lofa-logo.png"
                alt="LOFA Collections"
                fallbackSrc="/images/placeholder.svg"
                width={200}
                height={60}
                className="h-14 lg:h-16 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="nav-link text-sm font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                aria-label="Buscar productos"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="p-2 text-gray-600 hover:text-primary-600 transition-colors relative"
                aria-label="Lista de deseos"
              >
                <Heart className="w-5 h-5" />
              </Link>

              {/* Cart */}
              <Link
                href="/carrito"
                className="p-2 text-gray-600 hover:text-primary-600 transition-colors relative"
                aria-label="Carrito de compras"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              {session ? (
                <UserMenu user={session.user} />
              ) : (
                <Link
                  href="/login"
                  className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                  aria-label="Iniciar sesión"
                >
                  <User className="w-5 h-5" />
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors mr-2"
              aria-label="Abrir menú móvil"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        navigation={navigation}
        cartItemsCount={cartItemsCount}
        session={session}
      />

      {/* Spacer for fixed header */}
      <div className="h-16 lg:h-20" />
    </>
  )
} 
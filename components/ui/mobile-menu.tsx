'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { X, ShoppingCart, Heart, User, Search } from 'lucide-react'
import { useSession } from 'next-auth/react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navigation: Array<{ name: string; href: string }>
  cartItemsCount: number
  session: any
}

export function MobileMenu({ isOpen, onClose, navigation, cartItemsCount, session }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Menu */}
      <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="text-xl font-display font-bold text-gradient">
                LOFA
              </div>
              <span className="text-sm text-gray-600 font-medium">
                Collections
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Cerrar menú"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 py-4">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={onClose}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* User Actions */}
          <div className="border-t border-gray-200 p-6">
            <div className="space-y-3">
              {/* Search */}
              <button className="flex items-center w-full px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors">
                <Search className="w-5 h-5 mr-3" />
                Buscar Productos
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="flex items-center px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={onClose}
              >
                <Heart className="w-5 h-5 mr-3" />
                Lista de Deseos
              </Link>

              {/* Cart */}
              <Link
                href="/carrito"
                className="flex items-center px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={onClose}
              >
                <ShoppingCart className="w-5 h-5 mr-3" />
                Carrito
                {cartItemsCount > 0 && (
                  <span className="ml-auto bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              {/* User Account */}
              {session ? (
                <div className="space-y-2">
                  <div className="px-4 py-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">
                      {session.user.name || 'Usuario'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {session.user.email}
                    </p>
                  </div>
                  <Link
                    href="/perfil"
                    className="flex items-center px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={onClose}
                  >
                    <User className="w-5 h-5 mr-3" />
                    Mi Cuenta
                  </Link>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={onClose}
                >
                  <User className="w-5 h-5 mr-3" />
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="border-t border-gray-200 p-6">
            <div className="text-sm text-gray-600 space-y-2">
              <p>Contacto:</p>
              <p>+1 787-478-3713</p>
              <p>sales@lofagroup.com</p>
              <p className="text-xs mt-4">
                Lunes a Viernes<br />
                7:00 AM - 4:00 PM EST
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
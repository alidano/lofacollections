'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react'
import { ProductCard } from '@/components/ui/product-card'
import { useFeaturedProducts, useLatestProducts, useBestSellingProducts } from '@/hooks/use-products'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState<'featured' | 'new' | 'bestsellers'>('bestsellers')
  
  const { products: featuredProducts, loading: featuredLoading, error: featuredError } = useFeaturedProducts(8)
  const { products: latestProducts, loading: latestLoading, error: latestError } = useLatestProducts(8)
  const { products: bestSellingProducts, loading: bestSellingLoading, error: bestSellingError } = useBestSellingProducts(8)

  const getCurrentProducts = () => {
    switch (activeTab) {
      case 'featured':
        return featuredProducts
      case 'new':
        return latestProducts
      case 'bestsellers':
        return bestSellingProducts
      default:
        return featuredProducts
    }
  }

  const getCurrentLoading = () => {
    switch (activeTab) {
      case 'featured':
        return featuredLoading
      case 'new':
        return latestLoading
      case 'bestsellers':
        return bestSellingLoading
      default:
        return featuredLoading
    }
  }

  const getCurrentError = () => {
    switch (activeTab) {
      case 'featured':
        return featuredError
      case 'new':
        return latestError
      case 'bestsellers':
        return bestSellingError
      default:
        return featuredError
    }
  }

  const currentProducts = getCurrentProducts()
  const isLoading = getCurrentLoading()
  const error = getCurrentError()

  return (
    <section className="section-padding">
      <div className="container-custom px-4 lg:px-0">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 lg:mb-12"
        >
          <h2 className="heading-2 mb-4">
            Productos
            <span className="text-gradient block">Destacados</span>
          </h2>
          <p className="body-text max-w-2xl mx-auto text-sm lg:text-base">
            Descubre nuestras piezas más populares y nuevas colecciones. 
            Cada producto está cuidadosamente seleccionado para ofrecerte la mejor calidad.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-6 lg:mb-8"
        >
          <div className="flex bg-gray-100 rounded-lg p-1">
            {[
              { key: 'featured', label: 'Destacados' },
              { key: 'new', label: 'Nuevos' },
              { key: 'bestsellers', label: 'Más Vendidos' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-3 lg:px-6 py-2 rounded-md text-xs lg:text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6"
        >
          {isLoading ? (
            // Loading state
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))
          ) : error ? (
            // Error state
            <div className="col-span-full text-center py-12">
              <p className="text-red-600 mb-4">Error al cargar los productos</p>
              <button 
                onClick={() => window.location.reload()} 
                className="btn-primary"
              >
                Intentar de nuevo
              </button>
            </div>
          ) : currentProducts.length === 0 ? (
            // Empty state
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 mb-4">No se encontraron productos</p>
            </div>
          ) : (
            // Products grid
            currentProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))
          )}
        </motion.div>

        {/* View All Products CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/productos"
            className="btn-primary inline-flex items-center group"
          >
            Ver Todos los Productos
            <svg
              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 
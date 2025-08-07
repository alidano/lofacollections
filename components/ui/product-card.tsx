'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react'
import { Product } from '@/hooks/use-products'
import { useCart } from '@/hooks/use-cart'
import toast from 'react-hot-toast'
import { ImageWithFallback } from './image-with-fallback'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0]

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      quantity: 1,
      image: primaryImage?.url || '/images/placeholder.jpg',
      sku: product.slug,
    })
    
    toast.success(`${product.name} agregado al carrito`)
  }

  const discountPercentage = product.salePrice 
    ? Math.round(((product.regularPrice - product.salePrice) / product.regularPrice) * 100)
    : 0

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
    >
      <Link href={`/producto/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          <ImageWithFallback
            src={primaryImage?.url || '/images/placeholder.svg'}
            alt={primaryImage?.alt || product.name}
            fallbackSrc="/images/placeholder.svg"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.isFeatured && (
              <span className="badge badge-primary text-xs">
                Destacado
              </span>
            )}
            {product.isOnSale && discountPercentage > 0 && (
              <span className="badge badge-error text-xs">
                -{discountPercentage}%
              </span>
            )}
            {product.totalSales > 10 && (
              <span className="badge badge-success text-xs">
                {product.totalSales > 50 ? `${product.totalSales}+ vendidos` : 'Popular'}
              </span>
            )}
            {product.rating >= 4.5 && product.ratingCount > 5 && (
              <span className="badge badge-warning text-xs">
                ⭐ {product.rating.toFixed(1)}
              </span>
            )}
            {product.dateCreated && new Date(product.dateCreated) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) && (
              <span className="badge badge-info text-xs">
                Nuevo
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-colors">
              <Heart className="w-4 h-4 text-gray-600" />
            </button>
            <button 
              onClick={handleAddToCart}
              className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
            >
              <ShoppingCart className="w-4 h-4 text-gray-600" />
            </button>
            <Link 
              href={`/producto/${product.slug}`}
              className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
            >
              <Eye className="w-4 h-4 text-gray-600" />
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          {product.categories[0] && (
            <div className="text-xs text-gray-500 mb-2">
              {product.categories[0].name}
            </div>
          )}

          {/* Title */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          {product.rating > 0 && (
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-1">
                ({product.ratingCount})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {product.salePrice ? (
                <>
                  <span className="font-bold text-gray-900">
                    ${product.salePrice.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ${product.regularPrice.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${
                product.stockStatus === 'instock' ? 'bg-green-500' : 'bg-red-500'
              }`} />
              <span className="text-xs text-gray-500">
                {product.stockStatus === 'instock' ? 'En stock' : 'Agotado'}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
} 
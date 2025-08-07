'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Star, Heart, ShoppingCart, Truck, Shield, ArrowLeft, Share2 } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/hooks/use-cart'
import toast from 'react-hot-toast'
import { Product } from '@/hooks/use-products'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'

export default function ProductPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlist, setIsWishlist] = useState(false)
  const [addingToCart, setAddingToCart] = useState(false)
  
  const { addItem } = useCart()

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/products?slug=${slug}`)
        
        if (!response.ok) {
          throw new Error('Error fetching product')
        }

        const data = await response.json()
        if (data.products && data.products.length > 0) {
          setProduct(data.products[0])
        } else {
          throw new Error('Product not found')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [slug])

  const handleAddToCart = () => {
    if (!product) return

    setAddingToCart(true)
    
    // Simulate API call
    setTimeout(() => {
      addItem({
        id: product.id,
        name: product.name,
        price: product.salePrice || product.price,
        quantity: quantity,
        image: product.images[0]?.url || '/images/placeholder.jpg',
        sku: product.slug,
      })
      
      toast.success(`${product.name} agregado al carrito`)
      setAddingToCart(false)
    }, 500)
  }

  const handleWishlist = () => {
    setIsWishlist(!isWishlist)
    toast.success(
      isWishlist 
        ? `${product?.name} removido de favoritos` 
        : `${product?.name} agregado a favoritos`
    )
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name || 'LOFA Collections',
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Enlace copiado al portapapeles')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container-custom py-8">
          <div className="animate-pulse">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <div className="bg-gray-200 rounded-lg h-96 mb-4"></div>
                <div className="flex space-x-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-gray-200 rounded-lg h-20 w-20"></div>
                  ))}
                </div>
              </div>
              <div>
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
                <div className="h-12 bg-gray-200 rounded mb-6"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container-custom py-8">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error || 'Producto no encontrado'}</p>
            <Link href="/productos" className="btn-primary">
              Volver a Productos
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const discountPercentage = product.salePrice 
    ? Math.round(((product.regularPrice - product.salePrice) / product.regularPrice) * 100)
    : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-white mb-4">
              <ImageWithFallback
                src={product.images[selectedImage]?.url || '/images/placeholder.svg'}
                alt={product.images[selectedImage]?.alt || product.name}
                fallbackSrc="/images/placeholder.svg"
                fill
                className="object-cover"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isFeatured && (
                  <span className="badge badge-primary text-xs">
                    Destacado
                  </span>
                )}
                {product.isOnSale && (
                  <span className="badge badge-error text-xs">
                    -{discountPercentage}%
                  </span>
                )}
                {product.totalSales > 10 && (
                  <span className="badge badge-success text-xs">
                    Popular
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button
                  onClick={handleWishlist}
                  className={`p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-colors ${
                    isWishlist ? 'text-red-500' : 'text-gray-600'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlist ? 'fill-current' : ''}`} />
                </button>
                
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square w-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? 'border-primary-500'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <ImageWithFallback
                      src={image.url}
                      alt={image.alt}
                      fallbackSrc="/images/placeholder.svg"
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-600 mb-6">
              <Link href="/productos" className="hover:text-primary-600">
                Productos
              </Link>
              {product.categories[0] && (
                <>
                  <span className="mx-2">/</span>
                  <Link 
                    href={`/categoria/${product.categories[0].slug}`}
                    className="hover:text-primary-600"
                  >
                    {product.categories[0].name}
                  </Link>
                </>
              )}
              <span className="mx-2">/</span>
              <span className="text-gray-900">{product.name}</span>
            </div>

            {/* Product Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            {product.rating > 0 && (
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">
                  ({product.ratingCount} reseñas)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="mb-6">
              {product.salePrice ? (
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-gray-900">
                    ${product.salePrice.toFixed(2)}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    ${product.regularPrice.toFixed(2)}
                  </span>
                  <span className="text-sm font-medium text-green-600">
                    -{discountPercentage}%
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${
                  product.stockStatus === 'instock' ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <span className={`text-sm font-medium ${
                  product.stockStatus === 'instock' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {product.stockStatus === 'instock' ? 'En stock' : 'Agotado'}
                </span>
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cantidad
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg w-32">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gray-600 hover:text-gray-900"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full text-center border-none focus:ring-0"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-gray-600 hover:text-gray-900"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="mb-8">
              <button
                onClick={handleAddToCart}
                disabled={addingToCart || product.stockStatus !== 'instock'}
                className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {addingToCart ? (
                  <div className="loading-dots">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Agregar al Carrito
                  </>
                )}
              </button>
            </div>

            {/* Features */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-primary-600" />
                <span className="text-sm text-gray-600">Envío gratis en pedidos +$50</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary-600" />
                <span className="text-sm text-gray-600">Garantía de 1 año</span>
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold mb-3">Descripción</h3>
              <div className="text-gray-600 leading-relaxed">
                {product.description ? (
                  <div dangerouslySetInnerHTML={{ __html: product.description }} />
                ) : (
                  <p>{product.shortDescription || 'Descripción del producto no disponible.'}</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 
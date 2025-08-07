'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, Filter, Grid, List, Star, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { ProductCard } from '@/components/ui/product-card'
import { Product } from '@/hooks/use-products'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'

interface CategoryInfo {
  id: string
  name: string
  slug: string
  description: string
  count: number
  image?: {
    id: string
    url: string
    alt: string
  } | null
}

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const [products, setProducts] = useState<Product[]>([])
  const [category, setCategory] = useState<CategoryInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // Fetch category info and products
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true)
        
        // Map friendly slugs to actual category slugs
        const slugMapping: { [key: string]: string } = {
          'bangles': 'bangles-cuffs',
          'aretes': 'earrings',
          'collares': 'necklaces',
          'anillos': 'rings',
          'hombres': 'mens',
          'masculina': 'mens'
        }
        
        const actualSlug = slugMapping[slug] || slug
        
        // Fetch category info
        const categoryResponse = await fetch('/api/categories')
        if (categoryResponse.ok) {
          const categoryData = await categoryResponse.json()
          const foundCategory = categoryData.categories.find((cat: CategoryInfo) => cat.slug === actualSlug)
          setCategory(foundCategory || null)
        }

        // Fetch products for this category
        const params = new URLSearchParams({
          page: currentPage.toString(),
          per_page: '20',
          category: actualSlug,
          orderby: sortBy,
          order: 'desc'
        })

        if (searchQuery) {
          params.set('search', searchQuery)
        }

        const productsResponse = await fetch(`/api/products?${params}`)
        
        if (!productsResponse.ok) {
          throw new Error('Error fetching products')
        }

        const productsData = await productsResponse.json()
        setProducts(productsData.products)
        setTotalPages(productsData.totalPages)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchCategoryData()
  }, [slug, searchQuery, sortBy, currentPage])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
  }

  const handleSortChange = (sort: string) => {
    setSortBy(sort)
    setCurrentPage(1)
  }

  const getCategoryTitle = (slug: string) => {
    const titles: { [key: string]: string } = {
      'bangles': 'Bangles',
      'bangles-cuffs': 'Bangles',
      'aretes': 'Aretes',
      'earrings': 'Aretes',
      'collares': 'Collares',
      'necklaces': 'Collares',
      'anillos': 'Anillos',
      'rings': 'Anillos',
      'hombres': 'Colección Masculina',
      'masculina': 'Colección Masculina',
      'mens': 'Colección Masculina',
      'cuff': 'Cuff'
    }
    return titles[slug] || slug.charAt(0).toUpperCase() + slug.slice(1)
  }

  const getCategoryDescription = (slug: string) => {
    const descriptions: { [key: string]: string } = {
      'bangles': 'Descubre nuestra colección exclusiva de bangles elegantes. Cada pieza está diseñada para complementar tu estilo único y añadir un toque de sofisticación a cualquier look.',
      'aretes': 'Explora nuestra selección de aretes únicos. Desde diseños minimalistas hasta piezas más elaboradas, tenemos el par perfecto para cada ocasión.',
      'collares': 'Encuentra el collar perfecto para complementar tu outfit. Nuestra colección incluye desde piezas delicadas hasta declaraciones audaces.',
      'anillos': 'Descubre anillos que cuentan historias. Cada diseño está creado para resaltar la belleza de tus manos y expresar tu personalidad.',
      'hombres': 'Joyería sofisticada para el hombre moderno. Diseños elegantes que combinan estilo y funcionalidad.',
      'masculina': 'Joyería sofisticada para el hombre moderno. Diseños elegantes que combinan estilo y funcionalidad.',
      'mens': 'Joyería sofisticada para el hombre moderno. Diseños elegantes que combinan estilo y funcionalidad.',
      'cuff': 'Brazaletes únicos que hacen una declaración. Nuestros cuffs están diseñados para ser versátiles y elegantes.'
    }
    return descriptions[slug] || 'Descubre nuestra colección exclusiva de joyería premium.'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container-custom py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4 w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded mb-8 w-2/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, index) => (
                <div key={index}>
                  <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container-custom py-8">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn-primary"
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container-custom py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-4">
              <Link 
                href="/productos" 
                className="flex items-center text-gray-600 hover:text-primary-600 transition-colors mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver a Productos
              </Link>
            </div>
            
            <h1 className="heading-1 mb-4">{getCategoryTitle(slug)}</h1>
            <p className="body-text max-w-2xl">
              {getCategoryDescription(slug)}
            </p>
            
            {category && (
              <div className="mt-4 text-sm text-gray-600">
                {category.count} productos en esta categoría
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Filtros</h3>
              
              {/* Search */}
              <div className="mb-6">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Buscar en esta categoría..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </form>
              </div>

              {/* Sort */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Ordenar por</h4>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="date">Más recientes</option>
                  <option value="price">Precio: menor a mayor</option>
                  <option value="price_desc">Precio: mayor a menor</option>
                  <option value="name">Nombre A-Z</option>
                  <option value="popularity">Más populares</option>
                </select>
              </div>

              {/* Category Image */}
              {category?.image && (
                <div className="mb-6">
                  <ImageWithFallback
                    src={category.image.url}
                    alt={category.image.alt}
                    fallbackSrc="/images/placeholder.svg"
                    width={400}
                    height={128}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-600">
                {loading ? 'Cargando...' : `${products.length} productos encontrados`}
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list'
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products */}
            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No se encontraron productos en esta categoría</p>
                <Link href="/productos" className="btn-primary">
                  Ver todos los productos
                </Link>
              </div>
            ) : (
              <>
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  {products.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-12">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Anterior
                      </button>
                      
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page = i + 1
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 border rounded-md ${
                              currentPage === page
                                ? 'bg-primary-600 text-white border-primary-600'
                                : 'border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        )
                      })}
                      
                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Siguiente
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'
import { useCategories } from '@/hooks/use-products'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export function CategoriesSection() {
  const { categories, loading, error } = useCategories()

  if (loading) {
    return (
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">
              Explora Nuestras
              <span className="text-gradient block">Categorías</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 rounded-xl h-48"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error al cargar las categorías</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn-primary"
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      </section>
    )
  }

  // Find bangles category and make it featured
  const banglesCategory = categories.find(cat => 
    cat.name.toLowerCase().includes('bangle') || 
    cat.name.toLowerCase().includes('pulsera') ||
    cat.slug.toLowerCase().includes('bangle')
  )

  const otherCategories = categories.filter(cat => cat.id !== banglesCategory?.id).slice(0, 5)

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom px-4 lg:px-0">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 lg:mb-16"
        >
          <h2 className="heading-2 mb-4">
            Nuestras
            <span className="text-gradient block">Categorías</span>
          </h2>
          <p className="body-text max-w-2xl mx-auto text-sm lg:text-base">
            Descubre nuestra amplia selección de joyería premium. 
            <strong className="text-primary-600"> Nuestros Bangles son los más vendidos</strong> - 
            cada pieza está diseñada para resaltar tu estilo y personalidad.
          </p>
        </motion.div>

        {/* Featured Bangles Category */}
        {banglesCategory && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="relative overflow-hidden rounded-xl lg:rounded-2xl">
              <Link href={`/categoria/${banglesCategory.slug}`} className="block">
                <div className="relative aspect-[2/1] lg:aspect-[3/1] overflow-hidden">
                  <ImageWithFallback
                    src={banglesCategory.image?.url || '/images/hero-bangles-new.jpg'}
                    alt={banglesCategory.image?.alt || banglesCategory.name}
                    fallbackSrc="/images/placeholder.svg"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex items-center p-4 lg:p-8 xl:p-12">
                    <div className="text-white max-w-md">
                      <div className="flex items-center mb-2 lg:mb-4">
                        <Star className="w-4 h-4 lg:w-6 lg:h-6 text-yellow-400 mr-2" />
                        <span className="text-xs lg:text-sm font-medium bg-yellow-400 text-black px-2 lg:px-3 py-1 rounded-full">
                          Más Vendidos
                        </span>
                      </div>
                      <h3 className="text-xl lg:text-3xl xl:text-4xl font-bold mb-2 lg:mb-3">
                        {banglesCategory.name}
                      </h3>
                      <p className="text-sm lg:text-lg text-gray-200 mb-3 lg:mb-4">
                        {banglesCategory.description || 'Nuestra colección más popular de bangles elegantes'}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300 bg-white/20 px-3 py-2 rounded-full">
                          {banglesCategory.count} productos
                        </span>
                        <div className="flex items-center text-lg font-medium group-hover:translate-x-1 transition-transform">
                          Ver colección
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
        )}

        {/* Other Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
          {otherCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-lg lg:rounded-xl"
            >
              <Link href={`/categoria/${category.slug}`} className="block">
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={category.image?.url || '/images/placeholder.svg'}
                    alt={category.image?.alt || category.name}
                    fallbackSrc="/images/placeholder.svg"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4 lg:p-6 text-white">
                    <div className="mb-2">
                      <h3 className="text-lg lg:text-xl xl:text-2xl font-semibold mb-2">
                        {category.name}
                      </h3>
                      <p className="text-xs lg:text-sm text-gray-200 mb-3">
                        {category.description || 'Descubre nuestra colección exclusiva'}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-300 bg-white/20 px-2 py-1 rounded-full">
                          {category.count} productos
                        </span>
                        <div className="flex items-center text-sm font-medium group-hover:translate-x-1 transition-transform">
                          Ver productos
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Categories CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/categorias"
            className="btn-outline inline-flex items-center group"
          >
            Ver Todas las Categorías
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 
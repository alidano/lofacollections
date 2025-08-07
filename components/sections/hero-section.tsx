'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Star, Truck, Shield } from 'lucide-react'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="/images/hero-bg-new.webp"
          alt="LOFA Collections - Joyería Premium"
          fallbackSrc="/images/placeholder.svg"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 px-4 lg:px-0">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-4 lg:mb-6"
            >
              <span className="text-primary-300 font-medium text-sm uppercase tracking-wide">
                Colección 2024
              </span>
                             <h1 className="heading-1 mt-2">
                 <span className="text-white">Joyería que</span>
                 <span className="text-gradient block">Inspira</span>
               </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg lg:text-xl text-gray-200 mb-6 lg:mb-8 max-w-lg"
            >
              Descubre nuestra colección premium de <strong className="text-primary-300">Bangles</strong>, 
              la categoría más vendida. Cada pieza está diseñada para complementar tu estilo único.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 lg:gap-4 mb-4 lg:mb-8"
            >
              <Link
                href="/categoria/bangles"
                className="btn-primary inline-flex items-center group"
              >
                Ver Bangles
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/productos"
                className="btn-outline border-white text-white hover:bg-white hover:text-gray-900 inline-flex items-center group"
              >
                Ver Todos los Productos
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Key Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 px-4 lg:px-0"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary-500 rounded-full flex items-center justify-center mr-2 lg:mr-3">
                  <Star className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-xs lg:text-sm">Calidad Premium</div>
                  <div className="text-xs text-gray-300">Plata 925 & Acero</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary-500 rounded-full flex items-center justify-center mr-2 lg:mr-3">
                  <Truck className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-xs lg:text-sm">Envío Gratis</div>
                  <div className="text-xs text-gray-300">Pedidos +$50</div>
                </div>
              </div>
              
                             <div className="flex items-center">
                 <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary-500 rounded-full flex items-center justify-center mr-2 lg:mr-3">
                   <Shield className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                 </div>
                 <div>
                   <div className="font-semibold text-xs lg:text-sm">Calidad</div>
                   <div className="text-xs text-gray-300">Garantizada</div>
                 </div>
               </div>
            </motion.div>
          </motion.div>

          {/* Image/Product Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative aspect-square rounded-xl lg:rounded-2xl overflow-hidden shadow-xl lg:shadow-2xl max-w-sm mx-auto lg:max-w-none">
                             <ImageWithFallback
                 src="/images/hero-product.jpg"
                 alt="Producto LOFA Collections"
                 fallbackSrc="/images/placeholder.svg"
                 fill
                 className="object-cover"
               />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              
                             {/* Floating Badge */}
               <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                 <div className="text-center">
                   <div className="text-lg font-bold text-primary-600">Disponible en</div>
                   <div className="text-xs text-gray-600">Puerto Rico</div>
                 </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
} 
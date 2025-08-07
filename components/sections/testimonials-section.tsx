'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Les Hernández',
    location: 'Puerto Rico',
    rating: 5,
    content: '¡¡Gracias me encantan!! Llegaron a su tiempo. La calidad es excelente y el servicio al cliente fue muy profesional.',
    image: '/images/testimonials/les-hernandez.jpg',
    product: 'Bangle Omega Silver'
  },
  {
    id: 2,
    name: 'Migdalia Cruz',
    location: 'Puerto Rico',
    rating: 5,
    content: 'Hoy recibí las mías y me encantaron, se ven bien lindas. El envío fue rápido y la atención fue excelente.',
    image: '/images/testimonials/migdalia-cruz.jpg',
    product: 'Aretes Elegantes Dorados'
  },
  {
    id: 3,
    name: 'Maria Ramos',
    location: 'Puerto Rico',
    rating: 5,
    content: 'Excelente servicio... envío rápido y productos de calidad. Definitivamente volveré a comprar.',
    image: '/images/testimonials/maria-ramos.jpg',
    product: 'Collar Infinity Plateado'
  },
  {
    id: 4,
    name: 'Ana García',
    location: 'Florida',
    rating: 5,
    content: 'Las joyas de LOFA son hermosas y de excelente calidad. El servicio al cliente es excepcional.',
    image: '/images/testimonials/ana-garcia.jpg',
    product: 'Anillo Minimalista'
  },
  {
    id: 5,
    name: 'Carlos Rodríguez',
    location: 'Puerto Rico',
    rating: 5,
    content: 'Compré un brazalete para mi esposa y quedó encantada. La calidad es increíble y el precio muy justo.',
    image: '/images/testimonials/carlos-rodriguez.jpg',
    product: 'Brazalete Masculino Acero'
  }
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-2 mb-4">
            Lo Que Dicen
            <span className="text-gradient block">Nuestros Clientes</span>
          </h2>
          <p className="body-text max-w-2xl mx-auto">
            Descubre por qué nuestros clientes confían en LOFA Collections. 
            Cada testimonio refleja nuestra dedicación a la calidad y el servicio.
          </p>
        </motion.div>

        {/* Testimonial Card */}
        <motion.div
          key={currentTestimonial.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 relative">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 text-primary-200">
              <Quote className="w-8 h-8" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Customer Info */}
              <div className="text-center lg:text-left">
                <div className="w-20 h-20 mx-auto lg:mx-0 mb-4 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {currentTestimonial.name}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  {currentTestimonial.location}
                </p>
                <div className="flex items-center justify-center lg:justify-start mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < currentTestimonial.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  Producto: {currentTestimonial.product}
                </p>
              </div>

              {/* Testimonial Content */}
              <div className="lg:col-span-2">
                <blockquote className="text-lg lg:text-xl text-gray-700 leading-relaxed italic">
                  "{currentTestimonial.content}"
                </blockquote>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex items-center justify-center mt-8 space-x-4"
        >
          <button
            onClick={prevTestimonial}
            className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
            aria-label="Testimonio anterior"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          {/* Dots */}
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex
                    ? 'bg-primary-500'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Ir al testimonio ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
            aria-label="Siguiente testimonio"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </motion.div>

        {/* Overall Rating */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 max-w-md mx-auto">
            <div className="flex items-center justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-current"
                />
              ))}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              4.9/5
            </div>
            <div className="text-sm text-gray-600">
              Basado en {testimonials.length * 25}+ reseñas
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 
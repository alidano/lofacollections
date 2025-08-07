'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Gift, Truck, Shield } from 'lucide-react'
import toast from 'react-hot-toast'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast.error('Por favor ingresa tu email')
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      toast.success('¡Gracias por suscribirte! Te mantendremos informado sobre nuestras novedades.')
      setEmail('')
      setIsLoading(false)
    }, 1000)
  }

  const benefits = [
    {
      icon: Gift,
      title: 'Ofertas Exclusivas',
      description: 'Recibe descuentos especiales solo para suscriptores'
    },
    {
      icon: Truck,
      title: 'Envío Gratis',
      description: 'Información sobre promociones de envío gratuito'
    },
    {
      icon: Shield,
      title: 'Nuevos Productos',
      description: 'Sé el primero en conocer nuestras nuevas colecciones'
    }
  ]

  if (!isMounted) {
    return (
      <section className="section-padding bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h2 className="heading-2 text-white mb-6">
                Únete a Nuestra
                <span className="text-gradient block">Comunidad</span>
              </h2>
              
              <p className="body-text text-gray-100 mb-8">
                Suscríbete a nuestro newsletter y recibe las últimas novedades, 
                ofertas exclusivas y consejos de estilo directamente en tu email.
              </p>
            </div>

            {/* Newsletter Form */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  ¡Suscríbete Ahora!
                </h3>
                <p className="text-gray-200">
                  Recibe un 10% de descuento en tu primera compra
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding bg-gradient-to-br from-primary-600 to-primary-700 text-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-2 text-white mb-6">
              Únete a Nuestra
              <span className="text-gradient block">Comunidad</span>
            </h2>
            
            <p className="body-text text-gray-100 mb-8">
              Suscríbete a nuestro newsletter y recibe las últimas novedades, 
              ofertas exclusivas y consejos de estilo directamente en tu email.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <div className="flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary-200" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-gray-200">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Privacy Note */}
            <p className="text-xs text-gray-300">
              Respetamos tu privacidad. Puedes cancelar tu suscripción en cualquier momento.
            </p>
          </motion.div>

          {/* Newsletter Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                ¡Suscríbete Ahora!
              </h3>
              <p className="text-gray-200">
                Recibe un 10% de descuento en tu primera compra
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-primary-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="loading-dots">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  <>
                    Suscribirse
                    <Mail className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </form>

            {/* Social Proof */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-300 mb-2">
                Ya se han suscrito más de 2,000 clientes
              </p>
              <div className="flex items-center justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-white/60 rounded-full"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 
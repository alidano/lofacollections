'use client'

import { motion } from 'framer-motion'
import { Star, Award, Truck, Shield } from 'lucide-react'

export function BrandStory() {
  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-2 mb-6">
              Nuestra
              <span className="text-gradient block">Historia</span>
            </h2>
            
            <div className="space-y-6 body-text">
              <p>
                LOFA Collections nació de la pasión por seleccionar y ofrecer joyería que combine elegancia, 
                calidad y accesibilidad. Nos especializamos en piezas únicas que reflejan 
                la belleza y sofisticación de la mujer moderna.
              </p>
              
              <p>
                Nuestra colección de <strong>Bangles</strong> es nuestra joya de la corona, 
                con diseños que van desde lo minimalista hasta lo más elaborado. Cada pieza 
                está cuidadosamente seleccionada para ofrecer la mejor calidad en plata 925 
                y acero inoxidable.
              </p>
              
              <p>
                Creemos que la joyería debe ser accesible sin comprometer la calidad. 
                Por eso seleccionamos cuidadosamente cada pieza para ofrecer 
                productos únicos a precios justos.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">5000+</div>
                <div className="text-sm text-gray-600">Productos Vendidos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">98%</div>
                <div className="text-sm text-gray-600">Clientes Satisfechos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">5+</div>
                <div className="text-sm text-gray-600">Años de Experiencia</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">50+</div>
                <div className="text-sm text-gray-600">Diseños Únicos</div>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-primary-600">
                  <Award className="w-24 h-24 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Calidad Garantizada</h3>
                  <p className="text-sm">Cada pieza pasa por rigurosos controles de calidad</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mt-16"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Calidad Premium</h3>
            <p className="text-gray-600">
              Solo utilizamos los mejores materiales: plata 925, acero inoxidable y oro de 18k.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Envío Gratis</h3>
            <p className="text-gray-600">
              Envío gratis a Puerto Rico en pedidos superiores a $50.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Garantía</h3>
            <p className="text-gray-600">
              Garantía de 1 año en todos nuestros productos.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 
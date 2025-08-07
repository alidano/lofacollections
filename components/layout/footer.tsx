'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="mb-6">
              <ImageWithFallback
                src="/images/lofa-logo.png"
                alt="LOFA Collections"
                fallbackSrc="/images/placeholder.svg"
                width={150}
                height={50}
                className="h-10 w-auto mb-4"
              />
              <p className="text-gray-300 text-sm">
                Joyería premium que combina elegancia, calidad y accesibilidad. 
                Especialistas en bangles y joyería moderna.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Mail className="w-4 h-4 mr-3 text-primary-400" />
                <span>info@lofagroup.com</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="w-4 h-4 mr-3 text-primary-400" />
                <span>+1 (787) 555-0123</span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="w-4 h-4 mr-3 text-primary-400" />
                <span>Puerto Rico</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/productos" className="text-gray-300 hover:text-white transition-colors">
                  Todos los Productos
                </Link>
              </li>
              <li>
                <Link href="/categoria/bangles" className="text-gray-300 hover:text-white transition-colors">
                  Bangles
                </Link>
              </li>
              <li>
                <Link href="/categoria/aretes" className="text-gray-300 hover:text-white transition-colors">
                  Aretes
                </Link>
              </li>
              <li>
                <Link href="/categoria/collares" className="text-gray-300 hover:text-white transition-colors">
                  Collares
                </Link>
              </li>
              <li>
                <Link href="/categoria/anillos" className="text-gray-300 hover:text-white transition-colors">
                  Anillos
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Customer Service */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6">Servicio al Cliente</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/contacto" className="text-gray-300 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/envio" className="text-gray-300 hover:text-white transition-colors">
                  Envío y Devoluciones
                </Link>
              </li>
              <li>
                <Link href="/garantia" className="text-gray-300 hover:text-white transition-colors">
                  Garantía
                </Link>
              </li>
              <li>
                <Link href="/tallas" className="text-gray-300 hover:text-white transition-colors">
                  Guía de Tallas
                </Link>
              </li>
              <li>
                <Link href="/cuidado" className="text-gray-300 hover:text-white transition-colors">
                  Cuidado de Joyería
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Business Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6">Información</h4>
            
            {/* Hours */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <Clock className="w-4 h-4 mr-3 text-primary-400" />
                <span className="font-medium">Horario de Atención</span>
              </div>
              <div className="text-sm text-gray-300 space-y-1">
                <div>Lunes - Viernes: 9:00 AM - 6:00 PM</div>
                <div>Sábado: 10:00 AM - 4:00 PM</div>
                <div>Domingo: Cerrado</div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h5 className="font-medium mb-3">Síguenos</h5>
              <div className="flex space-x-4">
                <Link 
                  href="https://facebook.com/lofacollections" 
                  className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link 
                  href="https://instagram.com/lofacollections" 
                  className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link 
                  href="https://twitter.com/lofacollections" 
                  className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2024 LOFA Collections. Todos los derechos reservados.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacidad" className="text-gray-400 hover:text-white transition-colors">
                Política de Privacidad
              </Link>
              <Link href="/terminos" className="text-gray-400 hover:text-white transition-colors">
                Términos de Servicio
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Política de Cookies
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
} 
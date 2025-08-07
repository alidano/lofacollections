# LOFA Collections - E-commerce Platform

Una plataforma e-commerce moderna y completa para LOFA Collections, especializada en joyería premium fundada por Tamara Rivera en Puerto Rico.

## 🚀 Características Principales

### 🛍️ E-commerce Completo
- **Catálogo de Productos** con filtros avanzados
- **Carrito de Compras** persistente
- **Sistema de Checkout** con múltiples métodos de pago
- **Gestión de Usuarios** y perfiles personalizados
- **Sistema de Reviews** y testimonios
- **Lista de Deseos** integrada

### 🎨 Diseño y UX
- **Diseño Responsive** optimizado para móviles
- **Animaciones Fluidas** con Framer Motion
- **Interfaz Moderna** con Tailwind CSS
- **Accesibilidad** completa
- **Performance Optimizada** con Next.js 14

### 🔧 Tecnologías Utilizadas

#### Frontend
- **Next.js 14** con App Router
- **TypeScript** para type safety
- **Tailwind CSS** para styling
- **Framer Motion** para animaciones
- **Zustand** para state management
- **React Hook Form** para formularios

#### Backend & Base de Datos
- **Prisma ORM** con PostgreSQL
- **NextAuth.js** para autenticación
- **Stripe** para procesamiento de pagos
- **WooCommerce API** para sincronización

#### Herramientas Adicionales
- **Lucide React** para iconos
- **React Hot Toast** para notificaciones
- **React Intersection Observer** para lazy loading

## 📁 Estructura del Proyecto

```
LOFAColl/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Homepage
│   └── globals.css        # Estilos globales
├── components/            # Componentes React
│   ├── layout/           # Componentes de layout
│   ├── sections/         # Secciones de la homepage
│   ├── ui/              # Componentes UI reutilizables
│   └── modals/          # Modales y overlays
├── hooks/               # Custom hooks
├── lib/                 # Utilidades y configuraciones
├── prisma/              # Schema de base de datos
├── types/               # Definiciones de TypeScript
└── public/              # Assets estáticos
```

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- PostgreSQL
- npm o yarn

### 1. Clonar el Repositorio
```bash
git clone <repository-url>
cd LOFAColl
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar Variables de Entorno
```bash
cp env.example .env.local
```

Editar `.env.local` con tus configuraciones:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/lofa_collections"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key"

# Stripe
STRIPE_PUBLISHABLE_KEY="pk_test_your-stripe-publishable-key"
STRIPE_SECRET_KEY="sk_test_your-stripe-secret-key"

# WooCommerce API
WOOCOMMERCE_URL="https://lofa.store"
WOOCOMMERCE_CONSUMER_KEY="your-woocommerce-consumer-key"
WOOCOMMERCE_CONSUMER_SECRET="your-woocommerce-consumer-secret"
```

### 4. Configurar Base de Datos
```bash
# Generar cliente Prisma
npm run db:generate

# Ejecutar migraciones
npm run db:push

# (Opcional) Abrir Prisma Studio
npm run db:studio
```

### 5. Ejecutar el Proyecto
```bash
# Desarrollo
npm run dev

# Producción
npm run build
npm start
```

## 📱 Funcionalidades Implementadas

### Homepage
- ✅ **Hero Section** con llamada a la acción
- ✅ **Categorías** con navegación visual
- ✅ **Productos Destacados** con filtros
- ✅ **Historia de la Marca** con Tamara Rivera
- ✅ **Testimonios** de clientes
- ✅ **Newsletter Signup** con beneficios

### Navegación
- ✅ **Header Responsive** con menú móvil
- ✅ **Búsqueda Global** con modal
- ✅ **Carrito de Compras** con contador
- ✅ **Menú de Usuario** para autenticados

### Productos
- ✅ **Product Cards** con hover effects
- ✅ **Sistema de Wishlist** integrado
- ✅ **Quick Add to Cart** funcionalidad
- ✅ **Ratings y Reviews** display

### Carrito
- ✅ **Persistencia** con localStorage
- ✅ **Gestión de Cantidades**
- ✅ **Cálculo de Totales**
- ✅ **Integración con Zustand**

## 🎨 Diseño y Branding

### Paleta de Colores
- **Primary**: `#f2750a` (Naranja LOFA)
- **Secondary**: `#64748b` (Gris elegante)
- **Gold**: `#f59e0b` (Dorado premium)
- **Silver**: `#64748b` (Plateado)

### Tipografías
- **Inter**: Para texto general
- **Playfair Display**: Para títulos
- **Cormorant Garamond**: Para elementos decorativos

### Componentes UI
- Botones con estados hover/focus
- Cards con sombras y animaciones
- Modales con backdrop blur
- Formularios con validación visual

## 🔐 Autenticación y Seguridad

### NextAuth.js
- Soporte para email/password
- OAuth con Google y Facebook
- Sesiones persistentes
- Protección de rutas

### Seguridad
- Headers de seguridad configurados
- Validación de formularios
- Sanitización de inputs
- CSRF protection

## 📊 SEO y Performance

### Optimización SEO
- Meta tags dinámicos
- Open Graph tags
- Schema markup para productos
- Sitemap automático
- URLs semánticas

### Performance
- Image optimization con Next.js
- Lazy loading de componentes
- Code splitting automático
- Bundle analysis
- Core Web Vitals optimizados

## 🚀 Deployment

### Vercel (Recomendado)
```bash
# Conectar repositorio a Vercel
# Configurar variables de entorno
# Deploy automático en push
```

### Variables de Entorno de Producción
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://lofacollections.com"
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."
```

## 📈 Analytics y Tracking

### Google Analytics 4
- Page views tracking
- E-commerce events
- User behavior analysis

### Facebook Pixel
- Conversion tracking
- Custom audiences
- Retargeting campaigns

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linting con ESLint

# Base de Datos
npm run db:generate  # Generar cliente Prisma
npm run db:push      # Sincronizar schema
npm run db:studio    # Abrir Prisma Studio

# TypeScript
npm run type-check   # Verificar tipos
```

## 📝 Próximas Funcionalidades

### Fase 2 - Funcionalidades Avanzadas
- [ ] **Sistema de Reviews** completo
- [ ] **Blog/Artículos** sobre joyería
- [ ] **Sección de Cuidado de Joyas** interactiva
- [ ] **Sistema de Cupones** y descuentos
- [ ] **Notificaciones Push** para móviles

### Fase 3 - Integraciones
- [ ] **WooCommerce API** completa
- [ ] **Stripe Checkout** integrado
- [ ] **PayPal** como método de pago
- [ ] **Email Marketing** con SendGrid
- [ ] **SMS Notifications** con Twilio

### Fase 4 - Optimizaciones
- [ ] **PWA** capabilities
- [ ] **Offline Support**
- [ ] **Advanced Caching**
- [ ] **CDN Integration**
- [ ] **Performance Monitoring**

## 🤝 Contribución

1. Fork el proyecto
2. Crear feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👥 Equipo

- **Tamara Rivera** - Fundadora de LOFA Collections
- **Desarrollo** - Plataforma e-commerce moderna
- **Diseño** - UX/UI optimizado para conversión

## 📞 Contacto

- **Email**: sales@lofagroup.com
- **Teléfono**: +1 787-478-3713
- **Dirección**: 12 Palacios de Escorial, Puerto Rico
- **Horario**: Lunes a Viernes 7am - 4pm EST

---

**LOFA Collections** - Elegancia, calidad y durabilidad en cada pieza. 🏆 
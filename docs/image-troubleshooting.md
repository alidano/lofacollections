# Solución de Problemas de Imágenes

## Problemas Comunes

### 1. Imágenes no cargan
- **Causa**: URLs incorrectas o imágenes faltantes
- **Solución**: 
  - Verificar que las URLs de WooCommerce sean accesibles
  - Asegurar que las imágenes locales existan en `/public/images/`
  - Usar el componente `ImageWithFallback` para manejo de errores

### 2. Errores de CORS
- **Causa**: Dominios no configurados en `next.config.js`
- **Solución**: Agregar dominios a la configuración de imágenes

### 3. Imágenes lentas
- **Causa**: Imágenes sin optimizar
- **Solución**: 
  - Usar formato WebP
  - Implementar lazy loading
  - Usar diferentes tamaños para diferentes dispositivos

## Componentes Disponibles

### ImageWithFallback
```tsx
import { ImageWithFallback } from '@/components/ui/image-with-fallback'

<ImageWithFallback
  src={product.image}
  alt={product.name}
  fallbackSrc="/images/placeholder.svg"
  fill
  className="object-cover"
/>
```

### OptimizedImage
```tsx
import { OptimizedImage } from '@/components/ui/optimized-image'

<OptimizedImage
  src={product.image}
  alt={product.name}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  quality={75}
  priority={true}
/>
```

### ImageDebug (para desarrollo)
```tsx
import { ImageDebug } from '@/components/ui/image-debug'

<ImageDebug
  src={product.image}
  alt={product.name}
  debug={true}
/>
```

## Configuración de Next.js

```javascript
// next.config.js
module.exports = {
  images: {
    domains: [
      'lofa.store',
      'wp.lofa.store',
      'i0.wp.com',
      'i1.wp.com',
      'i2.wp.com',
      'i3.wp.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.wp.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lofa.store',
        port: '',
        pathname: '/**',
      },
    ],
  },
}
```

## Verificación de Imágenes

Ejecuta el script de verificación:
```bash
node scripts/check-images.js
```

## Mejores Prácticas

1. **Siempre usar fallbacks**: Proporcionar imágenes de respaldo
2. **Optimizar tamaños**: Usar diferentes tamaños para diferentes dispositivos
3. **Lazy loading**: Cargar imágenes solo cuando sean necesarias
4. **Formato moderno**: Preferir WebP sobre JPEG/PNG
5. **Monitoreo**: Usar herramientas de debug en desarrollo

## Estructura de Archivos

```
public/
├── images/
│   ├── placeholder.svg          # Imagen de respaldo
│   ├── hero-bg.jpg             # Imagen principal
│   └── categories/
│       └── bangles-featured.jpg # Imagen de categoría
```

## Debugging

Para activar el modo debug en desarrollo:
```tsx
<ImageDebug
  src={imageUrl}
  alt="Debug image"
  debug={process.env.NODE_ENV === 'development'}
/>
```

## Monitoreo de Errores

Los errores de imágenes se registran en la consola del navegador:
- ✅ Imagen cargada exitosamente
- ⚠️ Imagen falló, usando fallback
- ❌ Error de red o CORS

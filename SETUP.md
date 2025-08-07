# Configuración del Proyecto LOFA Collections

## Variables de Entorno Requeridas

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# WooCommerce API Configuration
WOOCOMMERCE_CONSUMER_KEY=your_woocommerce_consumer_key
WOOCOMMERCE_CONSUMER_SECRET=your_woocommerce_consumer_secret
WOOCOMMERCE_STORE_URL=https://your-store.com

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key_here

# Email Configuration (optional)
EMAIL_SERVER_HOST=smtp.sendgrid.net
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=apikey
EMAIL_SERVER_PASSWORD=your_sendgrid_api_key_here
EMAIL_FROM=noreply@yourdomain.com

# Google Analytics (optional)
GOOGLE_ANALYTICS_ID=your_google_analytics_id_here
```

## Instalación

1. Clona el repositorio
2. Instala las dependencias: `npm install`
3. Configura las variables de entorno
4. Ejecuta el servidor: `npm run dev`

## Configuración de WooCommerce

Para conectar con WooCommerce, necesitas:
- URL de tu tienda WooCommerce
- Consumer Key y Consumer Secret de la API de WooCommerce

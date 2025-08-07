const fs = require('fs');
const path = require('path');

// Función para verificar si una imagen existe
function checkImageExists(imagePath) {
  const fullPath = path.join(__dirname, '..', 'public', imagePath);
  return fs.existsSync(fullPath);
}

// Función para verificar URLs de imágenes
async function checkImageUrl(url) {
  try {
    const response = await fetch(url);
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Lista de imágenes que deberían existir
const requiredImages = [
  '/images/placeholder.svg',
  '/images/hero-bg.jpg',
  '/images/categories/bangles-featured.jpg'
];

// Verificar imágenes locales
console.log('🔍 Verificando imágenes locales...');
requiredImages.forEach(imagePath => {
  const exists = checkImageExists(imagePath);
  console.log(`${exists ? '✅' : '❌'} ${imagePath} ${exists ? 'existe' : 'NO EXISTE'}`);
});

// Verificar configuración de Next.js
const nextConfigPath = path.join(__dirname, '..', 'next.config.js');
if (fs.existsSync(nextConfigPath)) {
  console.log('\n🔍 Verificando configuración de Next.js...');
  const nextConfig = require(nextConfigPath);
  
  if (nextConfig.images && nextConfig.images.domains) {
    console.log('✅ Dominios configurados:', nextConfig.images.domains);
  } else {
    console.log('❌ No hay dominios configurados para imágenes');
  }
  
  if (nextConfig.images && nextConfig.images.remotePatterns) {
    console.log('✅ Patrones remotos configurados:', nextConfig.images.remotePatterns.length);
  } else {
    console.log('❌ No hay patrones remotos configurados');
  }
}

console.log('\n💡 Recomendaciones:');
console.log('1. Asegúrate de que todas las imágenes locales existan en /public/images/');
console.log('2. Verifica que las URLs de WooCommerce sean accesibles');
console.log('3. Considera usar un CDN para mejorar el rendimiento de las imágenes');
console.log('4. Optimiza las imágenes para web (formato WebP, tamaños apropiados)');

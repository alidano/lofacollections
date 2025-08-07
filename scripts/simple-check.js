const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando imágenes locales...');

const images = [
  '/images/placeholder.svg',
  '/images/hero-bg.jpg',
  '/images/categories/bangles-featured.jpg'
];

images.forEach(imagePath => {
  const fullPath = path.join(__dirname, '..', 'public', imagePath);
  const exists = fs.existsSync(fullPath);
  console.log(`${exists ? '✅' : '❌'} ${imagePath} ${exists ? 'existe' : 'NO EXISTE'}`);
});

console.log('\n✅ Verificación completada');

import Head from 'next/head'

interface PageSEOProps {
  title: string
  description: string
  keywords?: string[]
  canonicalUrl?: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'product'
  jsonLd?: object
  noindex?: boolean
}

export function PageSEO({ 
  title, 
  description, 
  keywords = [], 
  canonicalUrl,
  ogImage = '/images/og-default-lofa-puerto-rico.jpg',
  ogType = 'website',
  jsonLd,
  noindex = false
}: PageSEOProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content="es_PR" />
      <meta property="og:site_name" content="LOFA Collections Puerto Rico" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@lofacollections" />
      <meta name="twitter:creator" content="@tamararivera_pr" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Información geográfica para Puerto Rico */}
      <meta name="geo.region" content="PR" />
      <meta name="geo.placename" content="Puerto Rico" />
      <meta name="geo.position" content="18.2208;-66.5901" />
      <meta name="ICBM" content="18.2208,-66.5901" />
      
      {/* JSON-LD Schema */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </Head>
  )
}

// Hook para generar meta tags específicos de productos
export function useProductSEO(product: any) {
  return {
    title: `${product.name} - ${product.material} | LOFA Collections Puerto Rico`,
    description: `${product.description} ✨ Joyería premium en Puerto Rico. Envío gratis en pedidos +$50. ${product.material === 'Sterling Silver 925' ? 'Plata 925 hipoalergénica' : 'Acero inoxidable resistente al agua'}.`,
    keywords: [
      product.name?.toLowerCase(),
      `${product.category?.toLowerCase()} Puerto Rico`,
      `${product.material?.toLowerCase()} PR`,
      'joyería premium Puerto Rico',
      'envío gratis joyas PR',
      product.material === 'Sterling Silver 925' ? 'plata 925 hipoalergénica' : 'acero inoxidable resistente agua'
    ],
    ogImage: product.images?.[0] || '/images/og-default-product-lofa.jpg'
  }
}

// Hook para generar meta tags específicos de categorías
export function useCategorySEO(category: string) {
  const categoryMeta: Record<string, any> = {
    'plata-925': {
      title: 'Joyería Plata 925 Sterling Silver Puerto Rico - Hipoalergénica | LOFA Collections',
      description: 'Descubre nuestra colección de joyería auténtica de plata 925 en Puerto Rico. Sterling silver hipoalergénico, resistente al agua. Aretes, collares, pulseras y anillos premium con envío gratis.',
      keywords: [
        'plata 925 Puerto Rico', 'sterling silver PR', 'joyería hipoalergénica Puerto Rico',
        'plata esterlina PR', 'joyas plata 925 hipoalergénicas', 'sterling silver jewelry Puerto Rico'
      ]
    },
    'acero-inoxidable': {
      title: 'Joyería Acero Inoxidable Stainless Steel Puerto Rico | No Se Oxida | LOFA',
      description: 'Joyería de acero inoxidable en Puerto Rico que no se oxida ni cambia de color. Stainless steel hipoalergénico, resistente al agua y sudor. Bangles, aretes, collares premium.',
      keywords: [
        'acero inoxidable joyería Puerto Rico', 'stainless steel jewelry PR', 'joyería que no se oxida PR',
        'acero inoxidable hipoalergénico', 'joyas resistentes agua Puerto Rico'
      ]
    },
    'bangles': {
      title: 'Bangles y Pulseras Premium Puerto Rico - Plata 925 & Stainless Steel | LOFA',
      description: 'Bangles elegantes y pulseras premium en Puerto Rico. Acero inoxidable y plata 925 sterling silver. Diseños únicos resistentes al agua con envío gratis en pedidos +$50.',
      keywords: [
        'bangles Puerto Rico', 'pulseras acero inoxidable PR', 'bangles plata 925 Puerto Rico',
        'pulseras stainless steel PR', 'brazaletes premium Puerto Rico'
      ]
    },
    'aretes': {
      title: 'Aretes Elegantes Puerto Rico - Plata 925 & Acero Inoxidable | LOFA Collections',
      description: 'Aretes premium en Puerto Rico. Plata 925 sterling silver y acero inoxidable hipoalergénico. Diseños únicos para uso diario, resistentes al agua y sudor.',
      keywords: [
        'aretes Puerto Rico', 'pendientes plata 925 PR', 'aretes acero inoxidable Puerto Rico',
        'earrings hipoalergénicos PR', 'aretes sterling silver Puerto Rico'
      ]
    }
  }

  return categoryMeta[category] || {
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} - Joyería Premium Puerto Rico | LOFA Collections`,
    description: `Descubre nuestra colección de ${category} premium en Puerto Rico. Joyería de alta calidad con envío gratis en pedidos +$50.`,
    keywords: [`${category} Puerto Rico`, 'joyería premium PR', 'envío gratis joyas']
  }
}

export default PageSEO
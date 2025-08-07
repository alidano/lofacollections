import { NextResponse } from 'next/server'
import { getWooCommerceCategories } from '@/lib/woocommerce'

export async function GET() {
  try {
    const categories = await getWooCommerceCategories()
    
    return NextResponse.json({
      categories: categories.map(cat => ({
        id: cat.id.toString(),
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        count: cat.count,
        image: cat.image ? {
          id: cat.image.id.toString(),
          url: cat.image.src,
          alt: cat.image.alt || cat.image.name
        } : null
      }))
    })
  } catch (error) {
    console.error('Error in categories API:', error)
    return NextResponse.json(
      { error: 'Error fetching categories' },
      { status: 500 }
    )
  }
} 
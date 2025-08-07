import { NextRequest, NextResponse } from 'next/server'
import { getWooCommerceProducts, transformWooCommerceProduct } from '@/lib/woocommerce'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const perPage = parseInt(searchParams.get('per_page') || '20')
    const category = searchParams.get('category') || undefined
    const featured = searchParams.get('featured') === 'true'
    const onSale = searchParams.get('on_sale') === 'true'
    const orderby = searchParams.get('orderby') || 'date'
    const order = (searchParams.get('order') as 'asc' | 'desc') || 'desc'

    const result = await getWooCommerceProducts({
      page,
      per_page: perPage,
      category,
      featured,
      on_sale: onSale,
      orderby,
      order
    })

    const transformedProducts = result.products.map(transformWooCommerceProduct)

    return NextResponse.json({
      products: transformedProducts,
      total: result.total,
      totalPages: result.totalPages,
      currentPage: page
    })
  } catch (error) {
    console.error('Error in products API:', error)
    return NextResponse.json(
      { error: 'Error fetching products' },
      { status: 500 }
    )
  }
} 
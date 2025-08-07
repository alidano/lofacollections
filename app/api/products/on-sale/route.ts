import { NextRequest, NextResponse } from 'next/server'
import { getOnSaleProducts, transformWooCommerceProduct } from '@/lib/woocommerce'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '8')

    const result = await getOnSaleProducts(limit)
    const transformedProducts = result.products.map(transformWooCommerceProduct)

    return NextResponse.json({
      products: transformedProducts,
      total: result.total
    })
  } catch (error) {
    console.error('Error in on-sale products API:', error)
    return NextResponse.json(
      { error: 'Error fetching on-sale products' },
      { status: 500 }
    )
  }
} 
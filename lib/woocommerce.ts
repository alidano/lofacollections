import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api'

// WooCommerce API configuration
const WooCommerce = new WooCommerceRestApi({
  url: process.env.WOOCOMMERCE_URL || 'https://lofa.store',
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY || '',
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET || '',
  version: 'wc/v3'
})

export interface WooCommerceProduct {
  id: number
  name: string
  slug: string
  description: string
  short_description: string
  price: string
  regular_price: string
  sale_price: string
  images: Array<{
    id: number
    src: string
    name: string
    alt: string
  }>
  categories: Array<{
    id: number
    name: string
    slug: string
  }>
  attributes: Array<{
    id: number
    name: string
    options: string[]
  }>
  stock_status: string
  stock_quantity: number | null
  average_rating: string
  rating_count: number
  total_sales: number
  featured: boolean
  on_sale: boolean
  date_created: string
  date_modified: string
}

export interface WooCommerceCategory {
  id: number
  name: string
  slug: string
  description: string
  count: number
  image?: {
    id: number
    src: string
    name: string
    alt: string
  }
}

// Fetch products from WooCommerce
export async function getWooCommerceProducts(params: {
  per_page?: number
  page?: number
  category?: string
  featured?: boolean
  on_sale?: boolean
  orderby?: string
  order?: 'asc' | 'desc'
} = {}) {
  try {
    // If category is provided as a slug, we need to find the category ID first
    let categoryId = params.category
    
    if (params.category && isNaN(Number(params.category))) {
      // Category is a slug, find the category ID
      const categories = await getWooCommerceCategories()
      const foundCategory = categories.find(cat => cat.slug === params.category)
      if (foundCategory) {
        categoryId = foundCategory.id.toString()
      } else {
        console.warn(`Category with slug '${params.category}' not found`)
        return {
          products: [],
          total: 0,
          totalPages: 0
        }
      }
    }

    const response = await WooCommerce.get('products', {
      per_page: params.per_page || 20,
      page: params.page || 1,
      category: categoryId,
      featured: params.featured,
      on_sale: params.on_sale,
      orderby: params.orderby || 'date',
      order: params.order || 'desc',
      status: 'publish'
    })

    return {
      products: response.data as WooCommerceProduct[],
      total: parseInt(response.headers['x-wp-total'] || '0'),
      totalPages: parseInt(response.headers['x-wp-totalpages'] || '0')
    }
  } catch (error) {
    console.error('Error fetching WooCommerce products:', error)
    return {
      products: [],
      total: 0,
      totalPages: 0
    }
  }
}

// Fetch featured products
export async function getFeaturedProducts(limit: number = 8) {
  return getWooCommerceProducts({
    per_page: limit,
    featured: true,
    orderby: 'date',
    order: 'desc'
  })
}

// Fetch on-sale products
export async function getOnSaleProducts(limit: number = 8) {
  return getWooCommerceProducts({
    per_page: limit,
    on_sale: true,
    orderby: 'date',
    order: 'desc'
  })
}

// Fetch latest products
export async function getLatestProducts(limit: number = 8) {
  return getWooCommerceProducts({
    per_page: limit,
    orderby: 'date',
    order: 'desc'
  })
}

// Fetch best-selling products
export async function getBestSellingProducts(limit: number = 8) {
  return getWooCommerceProducts({
    per_page: limit,
    orderby: 'popularity',
    order: 'desc'
  })
}

// Fetch categories from WooCommerce
export async function getWooCommerceCategories() {
  try {
    const response = await WooCommerce.get('products/categories', {
      per_page: 100,
      hide_empty: true,
      orderby: 'name',
      order: 'asc'
    })

    return response.data as WooCommerceCategory[]
  } catch (error) {
    console.error('Error fetching WooCommerce categories:', error)
    return []
  }
}

// Fetch single product by ID
export async function getWooCommerceProduct(id: number) {
  try {
    const response = await WooCommerce.get(`products/${id}`)
    return response.data as WooCommerceProduct
  } catch (error) {
    console.error('Error fetching WooCommerce product:', error)
    return null
  }
}

// Search products
export async function searchWooCommerceProducts(query: string, limit: number = 20) {
  try {
    const response = await WooCommerce.get('products', {
      search: query,
      per_page: limit,
      status: 'publish'
    })

    return {
      products: response.data as WooCommerceProduct[],
      total: parseInt(response.headers['x-wp-total'] || '0'),
      totalPages: parseInt(response.headers['x-wp-totalpages'] || '0')
    }
  } catch (error) {
    console.error('Error searching WooCommerce products:', error)
    return {
      products: [],
      total: 0,
      totalPages: 0
    }
  }
}

// Transform WooCommerce product to our app format
export function transformWooCommerceProduct(wcProduct: WooCommerceProduct) {
  return {
    id: wcProduct.id.toString(),
    name: wcProduct.name,
    slug: wcProduct.slug,
    description: wcProduct.description,
    shortDescription: wcProduct.short_description,
    price: parseFloat(wcProduct.price),
    regularPrice: parseFloat(wcProduct.regular_price),
    salePrice: wcProduct.sale_price ? parseFloat(wcProduct.sale_price) : null,
    images: wcProduct.images.map(img => ({
      id: img.id.toString(),
      url: img.src,
      alt: img.alt || img.name,
      isPrimary: wcProduct.images.indexOf(img) === 0
    })),
    categories: wcProduct.categories.map(cat => ({
      id: cat.id.toString(),
      name: cat.name,
      slug: cat.slug
    })),
    stock: wcProduct.stock_quantity || 0,
    stockStatus: wcProduct.stock_status,
    rating: parseFloat(wcProduct.average_rating),
    ratingCount: wcProduct.rating_count,
    totalSales: wcProduct.total_sales,
    isFeatured: wcProduct.featured,
    isOnSale: wcProduct.on_sale,
    createdAt: wcProduct.date_created,
    updatedAt: wcProduct.date_modified
  }
} 
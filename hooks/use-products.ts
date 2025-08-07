import { useState, useEffect } from 'react'

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  price: number
  regularPrice: number
  salePrice: number | null
  images: Array<{
    id: string
    url: string
    alt: string
    isPrimary: boolean
  }>
  categories: Array<{
    id: string
    name: string
    slug: string
  }>
  stock: number
  stockStatus: string
  rating: number
  ratingCount: number
  totalSales: number
  isFeatured: boolean
  isOnSale: boolean
  createdAt: string
  updatedAt: string
}

export interface ProductsResponse {
  products: Product[]
  total: number
  totalPages: number
  currentPage: number
}

export interface CategoriesResponse {
  categories: Array<{
    id: string
    name: string
    slug: string
    description: string
    count: number
    image: {
      id: string
      url: string
      alt: string
    } | null
  }>
}

// Hook para obtener productos destacados
export function useFeaturedProducts(limit: number = 8) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/products/featured?limit=${limit}`)
        
        if (!response.ok) {
          throw new Error('Error fetching featured products')
        }

        const data = await response.json()
        setProducts(data.products)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [limit])

  return { products, loading, error }
}

// Hook para obtener productos en oferta
export function useOnSaleProducts(limit: number = 8) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/products/on-sale?limit=${limit}`)
        
        if (!response.ok) {
          throw new Error('Error fetching on-sale products')
        }

        const data = await response.json()
        setProducts(data.products)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [limit])

  return { products, loading, error }
}

// Hook para obtener productos más recientes
export function useLatestProducts(limit: number = 8) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/products/latest?limit=${limit}`)
        
        if (!response.ok) {
          throw new Error('Error fetching latest products')
        }

        const data = await response.json()
        setProducts(data.products)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [limit])

  return { products, loading, error }
}

// Hook para obtener productos más vendidos
export function useBestSellingProducts(limit: number = 8) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/products/best-selling?limit=${limit}`)
        
        if (!response.ok) {
          throw new Error('Error fetching best-selling products')
        }

        const data = await response.json()
        setProducts(data.products)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [limit])

  return { products, loading, error }
}

// Hook para obtener categorías
export function useCategories() {
  const [categories, setCategories] = useState<CategoriesResponse['categories']>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/categories')
        
        if (!response.ok) {
          throw new Error('Error fetching categories')
        }

        const data: CategoriesResponse = await response.json()
        setCategories(data.categories)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return { categories, loading, error }
}

// Hook para buscar productos
export function useSearchProducts(query: string, limit: number = 20) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!query.trim()) {
      setProducts([])
      return
    }

    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/products?search=${encodeURIComponent(query)}&per_page=${limit}`)
        
        if (!response.ok) {
          throw new Error('Error searching products')
        }

        const data: ProductsResponse = await response.json()
        setProducts(data.products)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    const timeoutId = setTimeout(fetchProducts, 300) // Debounce search
    return () => clearTimeout(timeoutId)
  }, [query, limit])

  return { products, loading, error }
} 
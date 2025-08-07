import { useState, useEffect } from 'react'

interface UseImageErrorOptions {
  fallbackSrc?: string
  onError?: (error: Error) => void
  onLoad?: () => void
}

export function useImageError(
  src: string,
  options: UseImageErrorOptions = {}
) {
  const { fallbackSrc = '/images/placeholder.svg', onError, onLoad } = options
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleError = () => {
    if (!hasError && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc)
      setHasError(true)
      onError?.(new Error(`Failed to load image: ${src}`))
    }
    setIsLoading(false)
  }

  const handleLoad = () => {
    setHasError(false)
    setIsLoading(false)
    onLoad?.()
  }

  // Reset state when src changes
  useEffect(() => {
    setImgSrc(src)
    setHasError(false)
    setIsLoading(true)
  }, [src])

  return {
    imgSrc,
    hasError,
    isLoading,
    handleError,
    handleLoad,
    retry: () => {
      setImgSrc(src)
      setHasError(false)
      setIsLoading(true)
    }
  }
}

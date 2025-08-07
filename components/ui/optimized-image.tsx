'use client'

import { useState, useEffect } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  fallbackSrc?: string
  className?: string
  fill?: boolean
  width?: number
  height?: number
  priority?: boolean
  sizes?: string
  quality?: number
}

export function OptimizedImage({
  src,
  alt,
  fallbackSrc = '/images/placeholder.svg',
  className = '',
  fill = false,
  width,
  height,
  priority = false,
  sizes = '100vw',
  quality = 75
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  // Reset state when src changes
  useEffect(() => {
    setImgSrc(src)
    setHasError(false)
  }, [src])

  const handleError = () => {
    if (!hasError && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc)
      setHasError(true)
    }
  }

  return (
    <div className={`relative ${fill ? 'w-full h-full' : ''}`}>
      <img
        src={imgSrc}
        alt={alt}
        className={className}
        style={fill ? { width: '100%', height: '100%', objectFit: 'cover' } : {}}
        width={width}
        height={height}
        onError={handleError}
      />
    </div>
  )
}

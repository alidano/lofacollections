'use client'

import { useState } from 'react'

interface ImageDebugProps {
  src: string
  alt: string
  fallbackSrc?: string
  className?: string
  fill?: boolean
  width?: number
  height?: number
  priority?: boolean
  debug?: boolean
}

export function ImageDebug({
  src,
  alt,
  fallbackSrc = '/images/placeholder.svg',
  className = '',
  fill = false,
  width,
  height,
  priority = false,
  debug = false
}: ImageDebugProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loadTime, setLoadTime] = useState<number | null>(null)
  const [errorCount, setErrorCount] = useState(0)

  const handleError = () => {
    setErrorCount(prev => prev + 1)
    if (!hasError && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc)
      setHasError(true)
      console.warn(`Image failed to load: ${src}, using fallback`)
    }
    setIsLoading(false)
  }

  const handleLoad = () => {
    setHasError(false)
    setIsLoading(false)
    setLoadTime(Date.now())
    console.log(`Image loaded successfully: ${src}`)
  }

  if (debug) {
    return (
      <div className="border border-red-300 bg-red-50 p-2 rounded">
        <div className="text-xs text-red-600 mb-2">
          <strong>Image Debug Info:</strong>
          <br />
          Original URL: {src}
          <br />
          Current URL: {imgSrc}
          <br />
          Has Error: {hasError ? 'Yes' : 'No'}
          <br />
          Is Loading: {isLoading ? 'Yes' : 'No'}
          <br />
          Error Count: {errorCount}
          <br />
          Load Time: {loadTime ? `${loadTime}ms` : 'Not loaded'}
        </div>
        <img
          src={imgSrc}
          alt={alt}
          className={className}
          style={fill ? { width: '100%', height: '100%', objectFit: 'cover' } : {}}
          width={width}
          height={height}
          onError={handleError}
          onLoad={handleLoad}
        />
      </div>
    )
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      style={fill ? { width: '100%', height: '100%', objectFit: 'cover' } : {}}
      width={width}
      height={height}
      onError={handleError}
      onLoad={handleLoad}
    />
  )
}

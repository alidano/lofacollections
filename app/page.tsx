import { Suspense } from 'react'
import { HeroSection } from '@/components/sections/hero-section'
import { CategoriesSection } from '@/components/sections/categories-section'
import { FeaturedProducts } from '@/components/sections/featured-products'
import { BrandStory } from '@/components/sections/brand-story'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { NewsletterSignup } from '@/components/sections/newsletter-signup'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Suspense fallback={<LoadingSpinner />}>
        <HeroSection />
      </Suspense>

      {/* Featured Products */}
      <Suspense fallback={<LoadingSpinner />}>
        <FeaturedProducts />
      </Suspense>

      {/* Categories Section */}
      <Suspense fallback={<LoadingSpinner />}>
        <CategoriesSection />
      </Suspense>

      {/* Brand Story */}
      <Suspense fallback={<LoadingSpinner />}>
        <BrandStory />
      </Suspense>

      {/* Testimonials */}
      <Suspense fallback={<LoadingSpinner />}>
        <TestimonialsSection />
      </Suspense>

      {/* Newsletter Signup */}
      <Suspense fallback={<LoadingSpinner />}>
        <NewsletterSignup />
      </Suspense>
    </main>
  )
} 
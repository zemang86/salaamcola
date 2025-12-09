'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlassButton } from '@/components/ui/GlassButton'
import { ProductCard } from '@/components/shop/ProductCard'
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations'
import { Grid, List, SlidersHorizontal } from 'lucide-react'
import type { Product } from '@/lib/shopify/types'

interface ShopPageClientProps {
  products: Product[]
}

type SortOption = 'newest' | 'price-low-high' | 'price-high-low'

export function ShopPageClient({ products }: ShopPageClientProps) {
  const t = useTranslations('shop')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low-high':
        return a.price - b.price
      case 'price-high-low':
        return b.price - a.price
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Page header */}
          <motion.div variants={fadeInUp} className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              {t('title')}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('allProducts')}
            </p>
          </motion.div>

          {/* Filters and sort */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            {/* Product count */}
            <p className="text-gray-500">
              {sortedProducts.length} products
            </p>

            {/* Sort and view controls */}
            <div className="flex items-center gap-4">
              {/* Sort dropdown */}
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-salaam-red-500/50"
                >
                  <option value="newest">{t('newest')}</option>
                  <option value="price-low-high">{t('priceLowHigh')}</option>
                  <option value="price-high-low">{t('priceHighLow')}</option>
                </select>
              </div>

              {/* View mode toggle */}
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-salaam-red-500 text-white'
                      : 'bg-white text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${
                    viewMode === 'list'
                      ? 'bg-salaam-red-500 text-white'
                      : 'bg-white text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Products grid */}
          {sortedProducts.length > 0 ? (
            <motion.div
              variants={staggerContainer}
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'flex flex-col gap-4'
              }
            >
              {sortedProducts.map((product, index) => (
                <motion.div key={product.id} variants={scaleIn} custom={index}>
                  <ProductCard product={product} viewMode={viewMode} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              variants={fadeInUp}
              className="text-center py-20"
            >
              <p className="text-gray-500">{t('noProducts')}</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

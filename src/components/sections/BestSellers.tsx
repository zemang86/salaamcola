'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlassButton } from '@/components/ui/GlassButton'
import { Link } from '@/i18n/routing'
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations'
import { formatPrice } from '@/lib/utils'
import { ShoppingBag, ArrowRight } from 'lucide-react'
import type { Product } from '@/lib/shopify/types'

interface BestSellersProps {
  products: Product[]
}

export function BestSellers({ products }: BestSellersProps) {
  const t = useTranslations('products')

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-salaam-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gray-100 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-12"
        >
          {/* Section header */}
          <motion.div variants={fadeInUp} className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              {t('bestSellers')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* Products grid */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                variants={scaleIn}
                custom={index}
              >
                <Link href={`/shop/${product.handle}`}>
                  <GlassCard
                    variant="light"
                    padding="none"
                    className="group h-full overflow-hidden bg-white border-gray-100"
                  >
                    {/* Product image */}
                    <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                      {product.featuredImage ? (
                        <img
                          src={product.featuredImage.url}
                          alt={product.featuredImage.altText || product.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-32 h-40 bg-gradient-to-b from-salaam-red-500 to-salaam-red-700 rounded-lg flex items-center justify-center text-white font-bold text-center p-4">
                            <span>MISTER COLA</span>
                          </div>
                        </div>
                      )}

                      {/* Quick add button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <GlassButton
                          variant="secondary"
                          size="sm"
                          className="w-full bg-white/90 text-gray-900"
                          leftIcon={<ShoppingBag className="w-4 h-4" />}
                        >
                          {t('addToCart')}
                        </GlassButton>
                      </motion.div>

                      {/* Sale badge */}
                      {product.compareAtPrice && product.compareAtPrice > product.price && (
                        <div className="absolute top-4 left-4 px-3 py-1 bg-salaam-red-500 text-white text-sm font-semibold rounded-full">
                          Sale
                        </div>
                      )}
                    </div>

                    {/* Product info */}
                    <div className="p-4 space-y-2">
                      <h3 className="font-semibold text-gray-900 group-hover:text-salaam-red-500 transition-colors line-clamp-1">
                        {product.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-salaam-red-500">
                          {formatPrice(product.price, product.currencyCode)}
                        </span>
                        {product.compareAtPrice && product.compareAtPrice > product.price && (
                          <span className="text-sm text-gray-400 line-through">
                            {formatPrice(product.compareAtPrice, product.currencyCode)}
                          </span>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* View all button */}
          <motion.div variants={fadeInUp} className="text-center">
            <Link href="/shop">
              <GlassButton
                variant="outline"
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                {t('viewAll')}
              </GlassButton>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

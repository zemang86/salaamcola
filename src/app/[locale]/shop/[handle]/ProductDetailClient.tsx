'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/routing'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlassButton } from '@/components/ui/GlassButton'
import { ProductCard } from '@/components/shop/ProductCard'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '@/lib/animations'
import {
  ShoppingBag,
  Minus,
  Plus,
  ChevronLeft,
  Check,
  Truck,
  Shield,
  RefreshCw,
} from 'lucide-react'
import Image from 'next/image'
import type { Product, ShopifyProductVariant } from '@/lib/shopify/types'

interface ProductDetailClientProps {
  product: Product
  relatedProducts: Product[]
}

export function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const t = useTranslations('product')
  const tProducts = useTranslations('products')
  const tCart = useTranslations('cart')
  const { addItem, isLoading, openCart } = useCart()

  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState<ShopifyProductVariant | null>(
    product.variants[0] || null
  )
  const [selectedImage, setSelectedImage] = useState(0)
  const [isAdded, setIsAdded] = useState(false)

  const images = product.images.length > 0 ? product.images : product.featuredImage ? [product.featuredImage] : []

  const handleAddToCart = async () => {
    if (!selectedVariant) return

    await addItem(selectedVariant.id, quantity)
    setIsAdded(true)

    setTimeout(() => setIsAdded(false), 2000)
  }

  const incrementQuantity = () => setQuantity((q) => q + 1)
  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1))

  const currentPrice = selectedVariant
    ? parseFloat(selectedVariant.price.amount)
    : product.price

  const compareAtPrice = selectedVariant?.compareAtPrice
    ? parseFloat(selectedVariant.compareAtPrice.amount)
    : product.compareAtPrice

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24">
      <div className="container mx-auto px-4 py-12">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-salaam-red-500 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Shop</span>
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 lg:gap-16"
        >
          {/* Product images */}
          <motion.div variants={fadeInLeft} className="space-y-4">
            {/* Main image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
              {images[selectedImage] ? (
                <Image
                  src={images[selectedImage].url}
                  alt={images[selectedImage].altText || product.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-48 h-60 bg-gradient-to-b from-salaam-red-500 to-salaam-red-700 rounded-2xl flex items-center justify-center text-white font-bold text-2xl text-center p-6">
                    MISTER COLA
                  </div>
                </div>
              )}

              {/* Sale badge */}
              {compareAtPrice && compareAtPrice > currentPrice && (
                <div className="absolute top-6 left-6 px-4 py-2 bg-salaam-red-500 text-white font-semibold rounded-full">
                  Sale
                </div>
              )}
            </div>

            {/* Thumbnail images */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 transition-all duration-200 ${
                      selectedImage === index
                        ? 'ring-2 ring-salaam-red-500 ring-offset-2'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={image.altText || `${product.title} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product info */}
          <motion.div variants={fadeInRight} className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {product.title}
              </h1>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-salaam-red-500">
                  {formatPrice(currentPrice, product.currencyCode)}
                </span>
                {compareAtPrice && compareAtPrice > currentPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    {formatPrice(compareAtPrice, product.currencyCode)}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Variants */}
            {product.options.length > 0 &&
              product.options[0].values.length > 1 && (
                <div className="space-y-4">
                  {product.options.map((option) => (
                    <div key={option.id} className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        {option.name}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {option.values.map((value) => (
                          <button
                            key={value}
                            className={`px-4 py-2 rounded-full border transition-all duration-200 ${
                              selectedVariant?.selectedOptions.find(
                                (o) => o.name === option.name
                              )?.value === value
                                ? 'border-salaam-red-500 bg-salaam-red-500/10 text-salaam-red-500'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

            {/* Quantity selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                {tProducts('quantity')}
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={decrementQuantity}
                    className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-salaam-red-500 transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </motion.button>
                  <span className="w-12 text-center font-semibold text-gray-900">
                    {quantity}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={incrementQuantity}
                    className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-salaam-red-500 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Add to cart button */}
            <div className="flex gap-4">
              <GlassButton
                variant="primary"
                size="xl"
                className="flex-1"
                onClick={handleAddToCart}
                isLoading={isLoading}
                disabled={!product.availableForSale}
                leftIcon={
                  isAdded ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <ShoppingBag className="w-6 h-6" />
                  )
                }
              >
                {isAdded
                  ? tCart('itemAdded')
                  : product.availableForSale
                  ? tProducts('addToCart')
                  : tProducts('outOfStock')}
              </GlassButton>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-salaam-red-500/10 rounded-full flex items-center justify-center">
                  <Truck className="w-6 h-6 text-salaam-red-500" />
                </div>
                <p className="text-sm text-gray-600">Free Shipping</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-salaam-red-500/10 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-salaam-red-500" />
                </div>
                <p className="text-sm text-gray-600">Halal Certified</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-salaam-red-500/10 rounded-full flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-salaam-red-500" />
                </div>
                <p className="text-sm text-gray-600">Easy Returns</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-24 space-y-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {t('relatedProducts')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

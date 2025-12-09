'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations'
import { Instagram, ExternalLink } from 'lucide-react'
import Image from 'next/image'

// Mock Instagram posts with Unsplash images
const instagramPosts = [
  { id: 1, image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=400&h=400&fit=crop' },
  { id: 2, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&h=400&fit=crop' },
  { id: 3, image: 'https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?w=400&h=400&fit=crop' },
  { id: 4, image: 'https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=400&h=400&fit=crop' },
  { id: 5, image: 'https://images.unsplash.com/photo-1598614187854-26a60e982dc4?w=400&h=400&fit=crop' },
  { id: 6, image: 'https://images.unsplash.com/photo-1567103472667-6898f3a79cf2?w=400&h=400&fit=crop' },
]

export function InstagramFeed() {
  const t = useTranslations('instagram')

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-salaam-red-500/5 to-transparent rounded-full blur-3xl" />

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
            <div className="flex items-center justify-center gap-3">
              <Instagram className="w-8 h-8 text-salaam-red-500" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                {t('title')}{' '}
                <span className="text-salaam-red-500">{t('highlight')}</span>
              </h2>
            </div>
            <a
              href="https://instagram.com/salaamcola"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-salaam-red-500 transition-colors"
            >
              @salaamcola
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Instagram grid */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {instagramPosts.map((post, index) => (
              <motion.a
                key={post.id}
                href="https://instagram.com/salaamcola"
                target="_blank"
                rel="noopener noreferrer"
                variants={scaleIn}
                custom={index}
                className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100"
              >
                {/* Instagram post image */}
                <Image
                  src={post.image}
                  alt={`Instagram post ${post.id}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Hover overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-salaam-red-500/80 backdrop-blur-sm flex items-center justify-center"
                >
                  <Instagram className="w-8 h-8 text-white" />
                </motion.div>

                {/* Glass border effect */}
                <div className="absolute inset-0 rounded-xl border border-white/20 pointer-events-none" />
              </motion.a>
            ))}
          </motion.div>

          {/* View more link */}
          <motion.div variants={fadeInUp} className="text-center">
            <a
              href="https://instagram.com/salaamcola"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-salaam-red-500 hover:text-salaam-red-600 font-medium transition-colors group"
            >
              {t('cta')}
              <motion.span
                className="inline-block"
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <ExternalLink className="w-4 h-4" />
              </motion.span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

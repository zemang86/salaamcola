'use client'

import { useTranslations } from 'next-intl'
import { motion, useScroll, useTransform } from 'framer-motion'
import { GlassButton } from '@/components/ui/GlassButton'
import { Link } from '@/i18n/routing'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '@/lib/animations'
import Image from 'next/image'

export function HeroSection() {
  const t = useTranslations('hero')
  const { scrollY } = useScroll()

  // Parallax effects
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Background elements */}
      <motion.div style={{ y }} className="absolute inset-0">
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-hero-gradient" />

        {/* Decorative circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-salaam-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-salaam-red-500/5 rounded-full blur-3xl" />

        {/* Glass shapes */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 right-1/4 w-32 h-32 bg-white/30 backdrop-blur-lg rounded-2xl border border-white/40 shadow-glass"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-salaam-red-500/20 backdrop-blur-lg rounded-xl border border-salaam-red-500/30"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 container mx-auto px-4 pt-32 pb-20 min-h-screen flex flex-col justify-center"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Text content */}
          <motion.div variants={fadeInLeft} className="space-y-8">
            <div className="space-y-4">
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <span className="text-gray-900">{t('title')}</span>
                <br />
                <motion.span
                  className="text-salaam-red-500 inline-block"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
                >
                  {t('highlight')}
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-gray-600 max-w-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {t('description')}
              </motion.p>
            </div>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Link href="/shop">
                <GlassButton
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  {t('cta')}
                </GlassButton>
              </Link>
            </motion.div>
          </motion.div>

          {/* Product showcase */}
          <motion.div
            variants={fadeInRight}
            className="relative aspect-square max-w-lg mx-auto"
          >
            {/* Glass card background */}
            <div className="absolute inset-8 bg-white/20 backdrop-blur-xl rounded-3xl border border-white/30 shadow-glass" />

            {/* Floating product image */}
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative z-10 flex items-center justify-center h-full"
            >
              <div className="relative w-72 h-96">
                {/* Product image */}
                <Image
                  src="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&h=800&fit=crop"
                  alt="Mister Cola"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />

                {/* Glow effect */}
                <div className="absolute -inset-4 bg-salaam-red-500/30 rounded-3xl blur-2xl -z-10" />
              </div>
            </motion.div>

            {/* Decorative floating elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute top-0 right-0 w-20 h-20 bg-salaam-red-500/20 rounded-full blur-xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-10 left-0 w-16 h-16 bg-white/30 backdrop-blur rounded-full"
            />
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-sm text-gray-500">{t('scrollDown')}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-salaam-red-500" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

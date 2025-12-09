'use client'

import { useTranslations } from 'next-intl'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { GlassButton } from '@/components/ui/GlassButton'
import { Link } from '@/i18n/routing'
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '@/lib/animations'
import { ArrowRight, Leaf, Heart, Shield } from 'lucide-react'
import Image from 'next/image'

export function TasteIsEverything() {
  const t = useTranslations('taste')
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      {/* Split background - dark left, image right */}
      <div className="absolute inset-0 grid lg:grid-cols-2">
        {/* Dark side */}
        <div className="bg-gray-900 relative">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: '32px 32px'
            }} />
          </div>
          {/* Red accent glow */}
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-salaam-red-500/20 rounded-full blur-3xl" />
        </div>
        {/* Image side */}
        <motion.div style={{ y }} className="relative hidden lg:block">
          <Image
            src="https://images.unsplash.com/photo-1567103472667-6898f3a79cf2?w=1200&h=800&fit=crop"
            alt="Cola splash"
            fill
            className="object-cover"
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/50 to-transparent" />
        </motion.div>
      </div>

      {/* Mobile background image */}
      <div className="absolute inset-0 lg:hidden">
        <Image
          src="https://images.unsplash.com/photo-1567103472667-6898f3a79cf2?w=800&h=600&fit=crop"
          alt="Cola splash"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/90" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid lg:grid-cols-2 gap-12 items-center min-h-[500px]"
        >
          {/* Text content */}
          <motion.div variants={fadeInLeft} className="space-y-8">
            <div className="space-y-4">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="inline-block text-salaam-red-500 font-semibold tracking-wider uppercase text-sm"
              >
                {t('tagline')}
              </motion.span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {t('title')}
              </h2>
              <p className="text-lg text-gray-300 max-w-lg">
                {t('description')}
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <motion.div
                variants={fadeInUp}
                className="flex items-center gap-3 text-white/80"
              >
                <div className="w-10 h-10 rounded-lg bg-salaam-red-500/20 flex items-center justify-center backdrop-blur-sm">
                  <Leaf className="w-5 h-5 text-salaam-red-400" />
                </div>
                <span className="text-sm font-medium">{t('feature1')}</span>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="flex items-center gap-3 text-white/80"
              >
                <div className="w-10 h-10 rounded-lg bg-salaam-red-500/20 flex items-center justify-center backdrop-blur-sm">
                  <Shield className="w-5 h-5 text-salaam-red-400" />
                </div>
                <span className="text-sm font-medium">{t('feature2')}</span>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="flex items-center gap-3 text-white/80"
              >
                <div className="w-10 h-10 rounded-lg bg-salaam-red-500/20 flex items-center justify-center backdrop-blur-sm">
                  <Heart className="w-5 h-5 text-salaam-red-400" />
                </div>
                <span className="text-sm font-medium">{t('feature3')}</span>
              </motion.div>
            </div>

            {/* CTA */}
            <motion.div variants={fadeInUp}>
              <Link href="/about">
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

          {/* Floating product - visible on desktop only */}
          <motion.div
            variants={fadeInRight}
            className="relative hidden lg:flex items-center justify-center"
          >
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative w-64 h-80"
            >
              <Image
                src="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&h=500&fit=crop"
                alt="Mister Cola Product"
                fill
                className="object-contain drop-shadow-2xl"
              />
              {/* Glow effect */}
              <div className="absolute inset-0 bg-salaam-red-500/30 rounded-full blur-3xl -z-10 scale-150" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

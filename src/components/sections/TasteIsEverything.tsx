'use client'

import { useTranslations } from 'next-intl'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { GlassButton } from '@/components/ui/GlassButton'
import { Link } from '@/i18n/routing'
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '@/lib/animations'
import { ArrowRight } from 'lucide-react'

export function TasteIsEverything() {
  const t = useTranslations('mission')
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
      />

      {/* Overlay patterns */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Red accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-salaam-red-500/20 rounded-full blur-3xl" />

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight"
          >
            {t('title').split(' ').map((word, index) => (
              <span key={index}>
                {word === 'EVERYTHING' || word === 'SEGALANYA' || word === 'شيء' ? (
                  <span className="text-salaam-red-500">{word}</span>
                ) : (
                  word
                )}{' '}
              </span>
            ))}
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            {t('description')}
          </motion.p>

          <motion.div variants={fadeInUp}>
            <Link href="/about">
              <GlassButton
                variant="secondary"
                size="lg"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                {t('cta')}
              </GlassButton>
            </Link>
          </motion.div>
        </motion.div>

        {/* Decorative glass elements */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:block"
        >
          <div className="w-32 h-48 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10" />
        </motion.div>

        <motion.div
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block"
        >
          <div className="w-24 h-36 bg-salaam-red-500/10 backdrop-blur-lg rounded-xl border border-salaam-red-500/20" />
        </motion.div>
      </motion.div>
    </section>
  )
}

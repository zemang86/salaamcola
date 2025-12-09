'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { GlassButton } from '@/components/ui/GlassButton'
import { Link } from '@/i18n/routing'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { ArrowRight, Sparkles } from 'lucide-react'

export function ChangeStartsSmall() {
  const t = useTranslations('change')

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-salaam-red-500" />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating circles */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-10 right-20 w-32 h-32 bg-white rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-white rounded-full"
        />

        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <motion.div variants={fadeInUp} className="space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="w-16 h-16 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
              {t('title')}
            </h2>

            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="text-white/70 max-w-2xl mx-auto"
          >
            {t('description')}
          </motion.p>

          <motion.div variants={fadeInUp}>
            <Link href="/shop">
              <GlassButton
                variant="secondary"
                size="lg"
                className="bg-white text-salaam-red-500 hover:bg-white/90 border-white"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                {t('cta')}
              </GlassButton>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

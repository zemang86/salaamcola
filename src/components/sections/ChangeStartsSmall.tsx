'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { GlassButton } from '@/components/ui/GlassButton'
import { Link } from '@/i18n/routing'
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '@/lib/animations'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

export function ChangeStartsSmall() {
  const t = useTranslations('change')

  return (
    <section className="relative py-24 overflow-hidden bg-gray-900">
      {/* Background with splash image */}
      <div className="absolute inset-0">
        {/* Cola splash background */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2">
          <Image
            src="https://images.unsplash.com/photo-1561758033-48d52648ae8b?w=800&h=600&fit=crop"
            alt="Cola splash"
            fill
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />
        </div>

        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Red accent glow */}
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-salaam-red-500/20 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Text content */}
          <motion.div variants={fadeInLeft} className="space-y-6">
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

            <motion.div variants={fadeInUp} className="pt-4">
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

          {/* Product image with splash */}
          <motion.div
            variants={fadeInRight}
            className="relative flex items-center justify-center"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative"
            >
              {/* Glass card container */}
              <div className="relative w-72 h-96 md:w-80 md:h-[420px]">
                {/* Glass background */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10" />

                {/* Product image */}
                <div className="absolute inset-4">
                  <Image
                    src="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&h=600&fit=crop"
                    alt="Mister Cola"
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Ice cubes decoration */}
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="absolute -top-4 -right-4 w-16 h-16 bg-white/20 backdrop-blur-md rounded-lg border border-white/30"
                />
                <motion.div
                  animate={{
                    y: [0, 5, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
                  className="absolute -bottom-2 -left-2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-lg border border-white/30"
                />
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-salaam-red-500/20 rounded-full blur-3xl -z-10 scale-125" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

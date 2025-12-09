'use client'

import { useTranslations } from 'next-intl'
import { motion, useScroll, useTransform } from 'framer-motion'
import { GlassButton } from '@/components/ui/GlassButton'
import { Link } from '@/i18n/routing'
import { ArrowRight, ShoppingBag } from 'lucide-react'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import Image from 'next/image'

export function HeroSection() {
  const t = useTranslations('hero')
  const { scrollY } = useScroll()

  // Parallax effects
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const canY = useTransform(scrollY, [0, 500], [0, -50])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section className="relative min-h-screen overflow-hidden bg-salaam-red-500">
      {/* Red wave background pattern */}
      <motion.div style={{ y }} className="absolute inset-0">
        {/* Wave SVG pattern */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ height: '40%' }}
        >
          <path
            fill="rgba(255,255,255,0.1)"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          <path
            fill="rgba(255,255,255,0.05)"
            d="M0,256L48,261.3C96,267,192,277,288,272C384,267,480,245,576,224C672,203,768,181,864,186.7C960,192,1056,224,1152,218.7C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>

        {/* Decorative circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-black/10 rounded-full blur-3xl" />

        {/* Glass floating shapes */}
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
          className="absolute top-1/4 right-1/4 w-32 h-32 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-glass hidden lg:block"
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
          className="absolute bottom-1/3 left-10 w-24 h-24 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 hidden lg:block"
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
          <motion.div variants={fadeInUp} className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {t('title')}
                <br />
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
                >
                  {t('highlight')}
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-white/80 max-w-xl mx-auto lg:mx-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {t('description')}
              </motion.p>
            </div>

            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Link href="/shop">
                <GlassButton
                  variant="secondary"
                  size="lg"
                  leftIcon={<ShoppingBag className="w-5 h-5" />}
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  {t('cta')}
                </GlassButton>
              </Link>
            </motion.div>
          </motion.div>

          {/* Product showcase - Floating can */}
          <motion.div
            variants={fadeInUp}
            className="relative aspect-square max-w-lg mx-auto"
          >
            {/* Glow effect behind can */}
            <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl scale-75" />

            {/* Floating product can */}
            <motion.div
              style={{ y: canY }}
              animate={{
                y: [0, -20, 0],
                rotateZ: [-2, 2, -2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative z-10 flex items-center justify-center h-full"
            >
              <div className="relative w-64 h-80 md:w-80 md:h-96">
                {/* Product image - replace with actual can image */}
                <Image
                  src="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&h=800&fit=crop"
                  alt="Mister Cola Can"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />

                {/* Reflection/glow effect */}
                <div className="absolute -inset-8 bg-white/10 rounded-full blur-2xl -z-10" />
              </div>
            </motion.div>

            {/* Floating droplets/bubbles */}
            <motion.div
              animate={{
                y: [0, -30, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 0 }}
              className="absolute top-1/4 right-10 w-4 h-4 bg-white/40 rounded-full blur-sm"
            />
            <motion.div
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              className="absolute top-1/3 left-10 w-3 h-3 bg-white/30 rounded-full blur-sm"
            />
            <motion.div
              animate={{
                y: [0, -25, 0],
                opacity: [0.4, 0.9, 0.4],
              }}
              transition={{ duration: 2.8, repeat: Infinity, delay: 1 }}
              className="absolute bottom-1/3 right-20 w-5 h-5 bg-white/30 rounded-full blur-sm"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom wave transition to white */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="w-full h-20 md:h-32"
        >
          <path
            fill="white"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          />
        </svg>
      </div>
    </section>
  )
}

'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlassButton } from '@/components/ui/GlassButton'
import { GlassInput } from '@/components/ui/GlassInput'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { Mail, Send, Check, Gift } from 'lucide-react'

export function Newsletter() {
  const t = useTranslations('newsletter')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In production, this would be an actual API call
    setStatus('success')
    setEmail('')

    // Reset after 3 seconds
    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <section className="section-padding bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gray-900" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <GlassCard
            variant="light"
            blur="xl"
            padding="none"
            hover={false}
            className="bg-white shadow-2xl overflow-hidden"
          >
            <div className="grid md:grid-cols-2">
              {/* Left side - decorative */}
              <motion.div
                variants={fadeInUp}
                className="hidden md:flex items-center justify-center p-12 bg-gradient-to-br from-salaam-red-500 to-salaam-red-600 relative overflow-hidden"
              >
                {/* Decorative circles */}
                <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />

                <div className="relative z-10 text-center text-white space-y-4">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="w-20 h-20 mx-auto bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                  >
                    <Gift className="w-10 h-10 text-white" />
                  </motion.div>
                  <p className="text-4xl font-bold">10% OFF</p>
                  <p className="text-white/80">Your First Purchase</p>
                </div>
              </motion.div>

              {/* Right side - form */}
              <motion.div variants={fadeInUp} className="p-8 md:p-12 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-salaam-red-500">
                    <Mail className="w-5 h-5" />
                    <span className="font-medium">Newsletter</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {t('title')}
                  </h2>
                  <p className="text-gray-600">{t('subtitle')}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <GlassInput
                    type="email"
                    placeholder={t('placeholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    leftIcon={<Mail className="w-5 h-5" />}
                    disabled={status === 'loading' || status === 'success'}
                    className="bg-gray-50 border-gray-200"
                  />

                  <GlassButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    isLoading={status === 'loading'}
                    rightIcon={
                      status === 'success' ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )
                    }
                  >
                    {status === 'success' ? t('success') : t('cta')}
                  </GlassButton>
                </form>

                {status === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm"
                  >
                    {t('error')}
                  </motion.p>
                )}

                <p className="text-xs text-gray-400">{t('privacy')}</p>
              </motion.div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}

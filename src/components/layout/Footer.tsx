'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react'

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/salaamcola', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com/salaamcola', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/salaamcola', label: 'Twitter' },
  { icon: Youtube, href: 'https://youtube.com/salaamcola', label: 'YouTube' },
]

const quickLinks = [
  { href: '/shop', key: 'shop' },
  { href: '/about', key: 'about' },
  { href: '/contact', key: 'contact' },
]

export function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('navigation')

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black" />

      {/* Glass overlay effect */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative container mx-auto px-4 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {/* Brand column */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-bold">
                <span className="text-salaam-red-500">Salaam</span>
                <span className="text-white">Cola</span>
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed">{t('tagline')}</p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-white hover:bg-salaam-red-500 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h3 className="text-lg font-semibold text-white">{t('quickLinks')}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-salaam-red-500 transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-salaam-red-500 transition-all duration-300 group-hover:w-4" />
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h3 className="text-lg font-semibold text-white">{t('connect')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 mt-0.5 text-salaam-red-500 flex-shrink-0" />
                <span>Kuala Lumpur, Malaysia</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-salaam-red-500 flex-shrink-0" />
                <a
                  href="mailto:hello@salaamcola.com"
                  className="hover:text-salaam-red-500 transition-colors"
                >
                  hello@salaamcola.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-salaam-red-500 flex-shrink-0" />
                <a
                  href="tel:+60123456789"
                  className="hover:text-salaam-red-500 transition-colors"
                >
                  +60 12-345 6789
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h3 className="text-lg font-semibold text-white">{t('legal')}</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-salaam-red-500 transition-colors duration-200"
                >
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-salaam-red-500 transition-colors duration-200"
                >
                  {t('terms')}
                </Link>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} {t('company')}. {t('copyright')}.
            </p>
            <p className="text-gray-500 text-sm">
              Made with purpose in Malaysia
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

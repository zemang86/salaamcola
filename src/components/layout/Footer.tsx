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
  ExternalLink,
} from 'lucide-react'
import Image from 'next/image'

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

const operatingHours = [
  { day: 'Mon - Fri', hours: '9:00 AM - 6:00 PM' },
  { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
]

export function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('navigation')

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-salaam-red-500/50 to-transparent" />

      {/* Top section with columns */}
      <div className="relative container mx-auto px-4 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {/* Our Mission */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-lg font-semibold text-white uppercase tracking-wider">
              {t('mission')}
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              {t('missionText')}
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-salaam-red-500 hover:text-salaam-red-400 transition-colors text-sm font-medium"
            >
              {t('learnMore')}
              <ExternalLink className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Operating Hours */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-lg font-semibold text-white uppercase tracking-wider">
              {t('hours')}
            </h3>
            <ul className="space-y-2">
              {operatingHours.map((item, index) => (
                <li key={index} className="flex justify-between text-sm">
                  <span className="text-gray-400">{item.day}</span>
                  <span className="text-white">{item.hours}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Get in Touch */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-lg font-semibold text-white uppercase tracking-wider">
              {t('connect')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-salaam-red-500 flex-shrink-0" />
                <span className="text-gray-400">Kuala Lumpur, Malaysia</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-salaam-red-500 flex-shrink-0" />
                <a
                  href="mailto:hello@salaamcola.com"
                  className="text-gray-400 hover:text-salaam-red-500 transition-colors"
                >
                  hello@salaamcola.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-salaam-red-500 flex-shrink-0" />
                <a
                  href="tel:+60123456789"
                  className="text-gray-400 hover:text-salaam-red-500 transition-colors"
                >
                  +60 12-345 6789
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Let's Link */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-lg font-semibold text-white uppercase tracking-wider">
              {t('letsLink')}
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-white/5 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-white hover:bg-salaam-red-500 transition-all duration-300 border border-white/10"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            <div className="pt-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                {t('quickLinks')}
              </p>
              <div className="flex flex-wrap gap-3">
                {quickLinks.map((link) => (
                  <Link
                    key={link.key}
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-salaam-red-500 transition-colors"
                  >
                    {tNav(link.key)}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Logo and copyright */}
            <div className="flex items-center gap-4">
              <Link href="/" className="inline-block">
                <span className="text-xl font-bold">
                  <span className="text-salaam-red-500">Salaam</span>
                  <span className="text-white">Cola</span>
                </span>
              </Link>
              <span className="text-gray-600">|</span>
              <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} {t('company')}
              </p>
            </div>

            {/* Legal links */}
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-gray-500 hover:text-gray-300 transition-colors text-sm"
              >
                {t('privacy')}
              </Link>
              <Link
                href="/terms"
                className="text-gray-500 hover:text-gray-300 transition-colors text-sm"
              >
                {t('terms')}
              </Link>
              <span className="text-gray-600 text-sm hidden md:inline">
                Made with purpose in Malaysia
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

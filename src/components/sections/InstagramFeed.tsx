'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Instagram } from 'lucide-react'
import Image from 'next/image'

const instagramPosts = [
  { id: 1, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&h=400&fit=crop' },
  { id: 2, image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=400&h=400&fit=crop' },
  { id: 3, image: 'https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=400&h=400&fit=crop' },
  { id: 4, image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop' },
  { id: 5, image: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=400&h=400&fit=crop' },
  { id: 6, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop' },
]

export function InstagramFeed() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative bg-gray-900 overflow-hidden">
      {/* Header with background image */}
      <div className="relative py-16">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=600&fit=crop"
            alt="Instagram background"
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Follow us on
              <br />
              Instagram
            </h2>
            <a
              href="https://instagram.com/salaamcola"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              @salaamcola
            </a>
          </motion.div>
        </div>
      </div>

      {/* Instagram Grid */}
      <div className="grid grid-cols-3 md:grid-cols-6">
        {instagramPosts.map((post, index) => (
          <motion.a
            key={post.id}
            href="https://instagram.com/salaamcola"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group relative aspect-square overflow-hidden"
          >
            <Image
              src={post.image}
              alt={`Instagram post ${post.id}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-salaam-red-500/0 group-hover:bg-salaam-red-500/70 transition-colors duration-300 flex items-center justify-center">
              <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}

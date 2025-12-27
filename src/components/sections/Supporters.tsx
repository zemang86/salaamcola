'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { MapPin } from 'lucide-react'

// Store locations with coordinates based on the SVG viewBox (0 0 1000 332)
const storeLocations = [
  {
    id: 1,
    name: 'Eraman (KLIA)',
    address: 'KLIA Terminal, Sepang',
    contact: '+603-8787-1234',
    state: 'MY10', // Selangor
    x: 135,
    y: 220,
  },
  {
    id: 2,
    name: 'Hadramawt Bukit Bintang',
    address: 'Jalan Bukit Bintang, KL',
    contact: '+603-2142-5678',
    state: 'MY14', // KL
    x: 128,
    y: 195,
  },
  {
    id: 3,
    name: 'Kunafa Crisp',
    address: 'Bukit Bintang, KL',
    contact: '+603-2143-9012',
    state: 'MY14', // KL
    x: 138,
    y: 190,
  },
  {
    id: 4,
    name: 'BETAWI TTDI',
    address: 'TTDI, Kuala Lumpur',
    contact: '+603-7728-3456',
    state: 'MY14', // KL
    x: 118,
    y: 188,
  },
  {
    id: 5,
    name: 'Woodfire',
    address: 'Multiple Locations, KL',
    contact: '+603-6201-7890',
    state: 'MY10', // Selangor
    x: 145,
    y: 205,
  },
  {
    id: 6,
    name: 'Ignition Burgers',
    address: 'Kuala Lumpur',
    contact: '+603-2110-2345',
    state: 'MY14', // KL
    x: 125,
    y: 200,
  },
  {
    id: 7,
    name: 'VPS Vending',
    address: 'Various Locations',
    contact: '+603-9000-6789',
    state: 'MY10', // Selangor
    x: 150,
    y: 215,
  },
  {
    id: 8,
    name: 'Outlets N. Sembilan',
    address: 'Pedas, Nilai, Seremban, USIM',
    contact: '+606-601-0123',
    state: 'MY05', // Negeri Sembilan
    x: 135,
    y: 245,
  },
]

// States to highlight (where we have stores)
const highlightedStates = ['MY10', 'MY14', 'MY05']

export function Supporters() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredLocation, setHoveredLocation] = useState<typeof storeLocations[0] | null>(null)
  const [svgContent, setSvgContent] = useState<string>('')

  useEffect(() => {
    // Fetch and modify the SVG
    fetch('/images/malaysia-map.svg')
      .then(res => res.text())
      .then(svg => {
        // Modify SVG to highlight states
        let modifiedSvg = svg

        // Change default fill color
        modifiedSvg = modifiedSvg.replace('fill="#6f9c76"', 'fill="#e5e7eb"')

        // Highlight states where we have stores
        highlightedStates.forEach(stateId => {
          const regex = new RegExp(`id="${stateId}"`, 'g')
          modifiedSvg = modifiedSvg.replace(regex, `id="${stateId}" fill="#fecaca" stroke="#ef4444" stroke-width="1.5"`)
        })

        setSvgContent(modifiedSvg)
      })
  }, [])

  const handleMouseEnter = (location: typeof storeLocations[0]) => {
    setHoveredLocation(location)
  }

  return (
    <section id="supporters" ref={ref} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-salaam-red-500 mb-2">
            Get Your Salaam Cola At
          </h2>
          <p className="text-gray-600">Find us across Malaysia</p>
        </motion.div>

        {/* Interactive Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* SVG Map Container */}
          <div className="relative bg-white rounded-2xl shadow-lg p-4 md:p-8 overflow-hidden">
            {/* Malaysia Map SVG */}
            <div
              className="w-full relative"
              style={{ minHeight: '300px' }}
            >
              {svgContent ? (
                <div
                  dangerouslySetInnerHTML={{ __html: svgContent }}
                  className="w-full [&>svg]:w-full [&>svg]:h-auto"
                />
              ) : (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-pulse text-gray-400">Loading map...</div>
                </div>
              )}

              {/* Location Markers Overlay */}
              {svgContent && (
                <svg
                  viewBox="0 0 1000 332"
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                  style={{ zIndex: 10 }}
                >
                  {storeLocations.map((location) => (
                    <g key={location.id} className="pointer-events-auto">
                      {/* Pulse animation */}
                      <circle
                        cx={location.x}
                        cy={location.y}
                        r="12"
                        fill="#ef4444"
                        opacity="0.3"
                        className="animate-ping"
                      />
                      {/* Main marker */}
                      <circle
                        cx={location.x}
                        cy={location.y}
                        r="8"
                        fill="#ef4444"
                        stroke="#fff"
                        strokeWidth="3"
                        className="cursor-pointer transition-all duration-200 hover:scale-125"
                        style={{
                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                          transformOrigin: `${location.x}px ${location.y}px`
                        }}
                        onMouseEnter={() => handleMouseEnter(location)}
                        onMouseLeave={() => setHoveredLocation(null)}
                      />
                      {/* Inner dot */}
                      <circle
                        cx={location.x}
                        cy={location.y}
                        r="3"
                        fill="#fff"
                        className="pointer-events-none"
                      />
                    </g>
                  ))}
                </svg>
              )}
            </div>

            {/* Tooltip */}
            {hoveredLocation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-20 bg-white rounded-xl shadow-xl border border-gray-200 p-4 min-w-[220px]"
                style={{
                  left: '50%',
                  top: '20px',
                  transform: 'translateX(-50%)',
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-salaam-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-salaam-red-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{hoveredLocation.name}</h4>
                    <p className="text-sm text-gray-600">{hoveredLocation.address}</p>
                    <p className="text-sm text-salaam-red-500 font-medium mt-1">{hoveredLocation.contact}</p>
                  </div>
                </div>
                {/* Arrow */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r border-b border-gray-200 transform rotate-45"></div>
              </motion.div>
            )}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-salaam-red-500 rounded-full border-2 border-white shadow"></div>
              <span className="text-sm text-gray-600">Store Location</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-200 border border-red-400 rounded"></div>
              <span className="text-sm text-gray-600">Available Region</span>
            </div>
          </div>
        </motion.div>

        {/* Store List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {storeLocations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-salaam-red-200 transition-all duration-300 cursor-pointer"
              onMouseEnter={() => handleMouseEnter(location)}
              onMouseLeave={() => setHoveredLocation(null)}
            >
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-salaam-red-500" />
                <span className="font-semibold text-gray-900 text-sm">{location.name}</span>
              </div>
              <p className="text-xs text-gray-500 pl-6">{location.address}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

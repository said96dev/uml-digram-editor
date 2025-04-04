'use client'

import { motion } from 'framer-motion'

export function ThickerBackground() {
  return (
    <div className='absolute inset-0 overflow-hidden'>
      {/* Gradient base */}
      <div className='absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]' />

      {/* Animated grid */}
      <motion.div
        className='absolute inset-0'
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(104, 70, 226, 0.1) 2px, transparent 2px), linear-gradient(to bottom, rgba(109, 16, 185, 0.1) 2px, transparent 2px)',
          backgroundSize: '40px 40px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '40px 40px'],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'linear',
        }}
      />

      {/* Gradient overlays */}
      <div className='absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#0F172A] to-transparent'></div>
      <div className='absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0F172A] to-transparent'></div>
    </div>
  )
}

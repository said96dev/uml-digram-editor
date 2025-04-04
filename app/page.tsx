'use client'

import { useState, useEffect } from 'react'
import { LandingPage } from '@/components/landing-page'
import { ReactFlowProvider } from 'reactflow'
import { motion } from 'framer-motion'
import { DiagramEditor } from '@/components/diagram-editor'

// Dynamically import DiagramEditor with SSR disabled

export default function Home() {
  const [showEditor, setShowEditor] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading for a smoother experience
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <motion.div
        key='loading'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className='h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]'
      >
        <motion.div
          className='flex flex-col items-center'
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className='relative w-20 h-20 mb-6'>
            <motion.div
              className='absolute inset-0 rounded-full border-4 border-white opacity-30'
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className='w-20 h-20 border-4 border-t-transparent border-white rounded-full'
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'linear',
              }}
            />
          </div>
          <motion.h2
            className='text-white text-xl font-medium'
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
            }}
          >
            Loading UML Designer...
          </motion.h2>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div className='h-screen w-full'>
      {showEditor ? (
        <ReactFlowProvider>
          <DiagramEditor />
        </ReactFlowProvider>
      ) : (
        <LandingPage onStart={() => setShowEditor(true)} />
      )}
    </div>
  )
}

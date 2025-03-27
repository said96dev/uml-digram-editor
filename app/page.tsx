'use client'

import { useState, useEffect } from 'react'
import { LandingPage } from '@/components/landing-page'
import dynamic from 'next/dynamic'
import { ReactFlowProvider } from 'reactflow'

// Dynamically import DiagramEditor with SSR disabled
const DiagramEditor = dynamic(
  () => import('@/components/diagram-editor').then((mod) => mod.DiagramEditor),
  {
    ssr: false,
  }
)

export default function Home() {
  const [showEditor, setShowEditor] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  // Simulate loading for a smoother experience
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className='h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-700'>
        <div className='flex flex-col items-center'>
          <div className='w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin mb-4'></div>
          <h2 className='text-white text-xl font-medium'>
            Loading UML Designer...
          </h2>
        </div>
      </div>
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

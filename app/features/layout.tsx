import type React from 'react'
import { NavBar } from '@/components/nav-bar'
import { ThickerBackground } from '@/components/thicker-background'

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='min-h-screen bg-[#0F172A] text-white overflow-hidden'>
      {/* Background elements */}
      <div className='fixed inset-0 z-0'>
        {/* Gradient background */}
        <ThickerBackground />

        {/* Animated gradient orbs */}
        <div className='absolute inset-0 overflow-hidden'>
          <div
            className='absolute w-[500px] h-[500px] rounded-full bg-indigo-900/20 blur-[100px]'
            style={{ top: '10%', left: '5%' }}
          />
          <div
            className='absolute w-[600px] h-[600px] rounded-full bg-violet-900/20 blur-[120px]'
            style={{ bottom: '5%', right: '10%' }}
          />
          <div
            className='absolute w-[400px] h-[400px] rounded-full bg-blue-900/20 blur-[80px]'
            style={{ top: '40%', right: '25%' }}
          />
        </div>
      </div>

      {/* Content */}
      <div className='relative z-10'>
        <NavBar />
        <main className='pt-24'>{children}</main>
      </div>
    </div>
  )
}

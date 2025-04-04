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
      </div>

      {/* Content */}
      <div className='relative z-10'>
        <NavBar />
        <main className='pt-24'>{children}</main>
      </div>
    </div>
  )
}

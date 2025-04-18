import type React from 'react'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'UML Diagram Editor',
  description: 'Create UML diagrams with React Flow',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        {children}
        <Toaster richColors />
      </body>
    </html>
  )
}

import './globals.css'

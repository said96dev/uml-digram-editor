'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Design', path: '/features/design' },
    { name: 'Local Storage', path: '/features/local-storage' },
    { name: 'Diagram Types', path: '/features/diagram-types' },
    { name: 'Export', path: '/features/export' },
  ]

  return (
    <header className='fixed top-0 left-0 right-0 z-50'>
      <div className='container mx-auto px-6'>
        <div className='relative flex items-center justify-between py-4'>
          {/* Logo */}
          <motion.div
            className='relative flex items-center space-x-2'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className='relative'>
              <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center'>
                <Activity className='h-6 w-6 text-white' />
              </div>
              <motion.div
                className='absolute -inset-1 rounded-xl bg-indigo-500/30 blur-sm z-[-1]'
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'easeInOut',
                }}
              />
            </div>
            <Link href='/'>
              <span className='text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400'>
                UML Designer
              </span>
            </Link>
          </motion.div>

          {/* Navigation - Desktop */}
          <motion.nav
            className='hidden md:flex items-center space-x-1'
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {navItems.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={item.path}
                  className={`relative px-4 py-2 ${
                    pathname === item.path
                      ? 'text-white'
                      : 'text-slate-300 hover:text-white'
                  } transition-colors group`}
                >
                  {item.name}
                  <motion.div
                    className={`absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 ${
                      pathname === item.path ? 'w-4/5' : 'w-0'
                    }`}
                    style={{ translateX: '-50%' }}
                    whileHover={{ width: '80%' }}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          {/* Mobile menu button */}
          <motion.button
            className='md:hidden relative w-10 h-10 flex items-center justify-center text-white'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className='h-6 w-6' />
            ) : (
              <Menu className='h-6 w-6' />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          className='md:hidden absolute top-full left-0 right-0 bg-[#0F172A]/95 backdrop-blur-md border-b border-slate-800'
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className='container mx-auto px-6 py-4'>
            <ul className='space-y-4'>
              {navItems.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={item.path}
                    className={`block py-2 ${
                      pathname === item.path
                        ? 'text-white font-medium'
                        : 'text-slate-300 hover:text-white'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </header>
  )
}

'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Activity,
  Code,
  Layers,
  GitBranch,
  Users,
  LayoutGrid,
  ArrowRight,
  Github,
  ExternalLink,
  Mail,
  MessageSquare,
  Sparkles,
  Zap,
  Download,
  Share2,
  ChevronRight,
  Twitter,
  Database,
  X,
} from 'lucide-react'
import Link from 'next/link'
import { ContactForm } from './contact-form'

interface LandingPageProps {
  onStart: () => void
}

export function LandingPage({ onStart }: LandingPageProps) {
  const [activeFeature, setActiveFeature] = useState(0)
  const [activeTab, setActiveTab] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: <Users className='h-8 w-8 text-indigo-300' />,
      title: 'Use Case Diagrams',
      description: 'Model system interactions with actors and use cases',
      color: 'bg-indigo-500/20',
      borderColor: 'border-indigo-500/30',
    },
    {
      icon: <GitBranch className='h-8 w-8 text-purple-300' />,
      title: 'State Machine Diagrams',
      description: 'Represent object states and transitions',
      color: 'bg-purple-500/20',
      borderColor: 'border-purple-500/30',
    },

    {
      icon: <LayoutGrid className='h-8 w-8 text-blue-300' />,
      title: 'Interaction Overview',
      description: 'Combine activity and Interaction Overview diagrams',
      color: 'bg-blue-500/20',
      borderColor: 'border-blue-500/30',
    },
  ]

  const tabs = [
    {
      title: 'Design',
      icon: <Layers className='h-5 w-5' />,
      content:
        'Create UML diagrams with an intuitive drag-and-drop interface. Design complex systems with ease using our powerful editor.',
      link: 'design',
    },
    {
      title: 'Local Storage',
      icon: <Code className='h-5 w-5' />,
      content:
        'Automatically save your diagrams locally for easy access later. Never lose your work with reliable storage solutions.',
      link: 'local-storage',
    },
    {
      title: 'Multiple Diagram Types',
      icon: <Database className='h-5 w-5' />,
      content:
        'Support for different standard UML diagram types with specialized elements. Create comprehensive documentation for your projects.',
      link: 'diagram-types',
    },
    {
      title: 'Export',
      icon: <Download className='h-5 w-5' />,
      content:
        'Export your diagrams in various formats including PNG, SVG, PDF, and code snippets for documentation.',
      link: 'export',
    },
  ]

  const navItems = [
    { name: 'Features', href: '#features' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'Contact', href: '#contact' },
  ]
  return (
    <div className='min-h-screen bg-[#0F172A] text-white overflow-hidden'>
      {/* Background elements */}
      <div className='fixed inset-0 z-0'>
        {/* Gradient background */}

        <ThickerBackground />

        {/* Animated gradient orbs */}
        <div className='absolute inset-0 overflow-hidden'>
          <motion.div
            className='absolute w-[500px] h-[500px] rounded-full bg-indigo-900/20 blur-[100px]'
            style={{ top: '10%', left: '5%' }}
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className='absolute w-[600px] h-[600px] rounded-full bg-violet-900/20 blur-[120px]'
            style={{ bottom: '5%', right: '10%' }}
            animate={{
              x: [0, -40, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className='absolute w-[400px] h-[400px] rounded-full bg-blue-900/20 blur-[80px]'
            style={{ top: '40%', right: '25%' }}
            animate={{
              x: [0, 20, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className='relative z-10'>
        {/* Header/Navigation */}
        <header className='fixed top-0 left-0 right-0 z-50'>
          <div className='container mx-auto px-6'>
            <div className='relative flex items-center justify-between py-4'>
              {/* Glaseffekt Hintergrund */}

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
                <div>
                  <span className='text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400'>
                    UML Designer
                  </span>
                </div>
              </motion.div>

              {/* Navigation - Desktop */}
              <motion.nav
                className='hidden md:flex items-center space-x-1'
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {['Features', 'How it Works', 'Contact'].map((item, i) => (
                  <motion.a
                    key={i}
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className='relative px-4 py-2 text-slate-300 hover:text-white transition-colors group'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item}
                    <motion.div
                      className='absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300'
                      style={{ translateX: '-50%' }}
                      whileHover={{ width: '80%' }}
                    />
                  </motion.a>
                ))}
              </motion.nav>

              {/* Actions */}
              <motion.div
                className='relative flex items-center space-x-3'
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.button
                  onClick={onStart}
                  className='relative px-5 py-2.5 rounded-xl overflow-hidden group'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className='absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 transition-all duration-300 group-hover:scale-105'></div>
                  <div className='absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300'>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIj48L3JlY3Q+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIj48L3JlY3Q+PC9zdmc+')]"></div>
                  </div>
                  <span className='relative text-white font-medium'>
                    Get Started
                  </span>
                </motion.button>

                {/* Mobile menu button */}
                <motion.button
                  className='md:hidden relative w-10 h-10 flex items-center justify-center text-white'
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? (
                    <X className='h-6 w-6 text-white' />
                  ) : (
                    <div className='w-6 flex flex-col items-center space-y-1.5'>
                      <motion.span className='block w-full h-0.5 bg-indigo-400 rounded-full' />
                      <motion.span className='block w-3/4 h-0.5 bg-indigo-400 rounded-full self-end' />
                      <motion.span className='block w-full h-0.5 bg-indigo-400 rounded-full' />
                    </div>
                  )}
                </motion.button>
              </motion.div>
            </div>
          </div>
        </header>
        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className='md:hidden fixed top-[60px] left-0 right-0 bg-[#0F172A]/95 backdrop-blur-md border-b border-slate-800 z-40'
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
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
                      <a
                        href={item.href}
                        className='block py-2 text-slate-300 hover:text-white'
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    </motion.li>
                  ))}
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.1 }}
                  >
                    <button
                      onClick={() => {
                        setIsMenuOpen(false)
                        onStart()
                      }}
                      className='w-full py-2 px-4 mt-2 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-lg text-white font-medium'
                    >
                      Get Started
                    </button>
                  </motion.li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Hero Section */}
        <section
          ref={heroRef}
          className='relative min-h-screen pt-24 flex items-center justify-center overflow-hidden'
        >
          <div className='container mx-auto px-6 py-12 md:py-24'>
            <div className='flex flex-col lg:flex-row items-center gap-12'>
              {/* Left side - Text content */}
              <motion.div
                className='w-full lg:w-1/2 text-center lg:text-left'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className='inline-flex items-center px-3 py-1 mb-6 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm'
                >
                  <Sparkles className='h-4 w-4 mr-2' />
                  <span>Powerful UML Diagramming Tool</span>
                </motion.div>
                <div></div>
                <motion.h1
                  className='text-4xl md:text-6xl font-bold mb-6 leading-tight'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Design Software <br />
                  <span className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400'>
                    Visually & Intuitively
                  </span>
                </motion.h1>

                <motion.p
                  className='text-lg md:text-xl text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Create professional UML diagrams with our intuitive,
                  developer-focused interface. Design, collaborate, and export
                  with ease.
                </motion.p>

                <motion.div
                  className='flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <button
                    onClick={onStart}
                    className='px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium hover:from-indigo-500 hover:to-violet-500 transition-all flex items-center'
                  >
                    Start Designing
                    <ArrowRight className='ml-2 h-5 w-5' />
                  </button>

                  <a
                    href='#how-it-works'
                    className='px-8 py-3 rounded-lg border border-slate-700 hover:border-indigo-500/50 text-slate-300 hover:text-white transition-colors flex items-center'
                  >
                    See How It Works
                    <ChevronRight className='ml-1 h-5 w-5' />
                  </a>
                </motion.div>

                {/*               <motion.div
                  className='mt-8 flex items-center justify-center lg:justify-start gap-6'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <div className='flex -space-x-2'>
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className='w-8 h-8 rounded-full border-2 border-[#0F172A] bg-gradient-to-br from-indigo-400 to-purple-500'
                      />
                    ))}
                  </div>
                  <div className='text-slate-400 text-sm'>
                    <span className='text-white font-medium'>500+</span>{' '}
                    developers trust us
                  </div>
                </motion.div> */}
              </motion.div>

              {/* Right side - Use Case Diagram */}
              <motion.div
                className='w-full lg:w-1/2 relative hidden sm:block'
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {/* Use Case Diagram */}
                <div className='relative w-full aspect-square max-w-lg mx-auto'>
                  {/* Background with animated particles */}
                  <div className='absolute inset-0 rounded-xl overflow-hidden border border-indigo-500/20 bg-[#151c33]/80 backdrop-blur-sm shadow-[0_0_50px_rgba(99,102,241,0.2)]'>
                    {/* Animated background particles */}
                    <div className='absolute inset-0'>
                      {[...Array(20)].map((_, i) => (
                        <motion.div
                          key={i}
                          className='absolute w-1 h-1 rounded-full bg-indigo-500/50'
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                          animate={{
                            opacity: [0, 0.8, 0],
                            scale: [0, 1, 0],
                            y: [0, Math.random() * 20 - 10],
                            x: [0, Math.random() * 20 - 10],
                          }}
                          transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: 'easeInOut',
                            delay: Math.random() * 2,
                          }}
                        />
                      ))}
                    </div>

                    {/* System title */}
                    <div className='absolute top-4 right-4 text-indigo-300 text-sm font-medium'>
                      Online Shopping
                    </div>

                    {/* Customer Actor */}
                    <motion.div
                      className='absolute top-[53%] left-[5%] transform -translate-y-1/2 flex flex-col items-center'
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    >
                      <div className='w-12 h-12 rounded-full bg-indigo-900/70 border border-indigo-500/50 flex items-center justify-center mb-2'>
                        <Users className='h-6 w-6 text-indigo-300' />
                      </div>
                      <div className='text-white text-sm'>Customer</div>
                    </motion.div>

                    {/* Payment System Actor */}
                    <motion.div
                      className='absolute top-[24%] right-[5%] transform -translate-y-1/2 flex flex-col items-center'
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                    >
                      <div className='w-12 h-12 rounded-full bg-indigo-900/70 border border-violet-500/50 flex items-center justify-center mb-2'>
                        <Activity className='h-6 w-6 text-violet-300' />
                      </div>
                      <div className='text-white text-sm'>Payment System</div>
                    </motion.div>

                    <motion.div
                      className='absolute bottom-[15%] right-[10%] flex flex-col items-center'
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.9 }}
                    >
                      <div className='w-12 h-12 rounded-full bg-indigo-900/70 border border-purple-500/50 flex items-center justify-center mb-2'>
                        <Layers className='h-6 w-6 text-purple-300' />
                      </div>
                      <div className='text-white text-sm'>Inventory</div>
                    </motion.div>

                    {/* Use Cases */}
                    <motion.div
                      className='absolute top-[22%] left-[35%] transform -translate-x-1/2 -translate-y-1/2 w-36 h-16 bg-indigo-900/70 border border-indigo-500/40 rounded-full flex items-center justify-center'
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.1 }}
                    >
                      <div className='text-white text-sm text-center'>
                        Browse Products
                      </div>
                    </motion.div>

                    <motion.div
                      className='absolute top-[53%] left-[35%] transform -translate-x-1/2 -translate-y-1/2 w-36 h-16 bg-indigo-900/70 border border-violet-500/40 rounded-full flex items-center justify-center'
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.3 }}
                    >
                      <div className='text-white text-sm text-center'>
                        Add to Cart
                      </div>
                    </motion.div>

                    <motion.div
                      className='absolute top-[82%] left-[35%] transform -translate-x-1/2 -translate-y-1/2 w-36 h-16 bg-indigo-900/70 border border-purple-500/40 rounded-full flex items-center justify-center'
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.5 }}
                    >
                      <div className='text-white text-sm text-center'>
                        Checkout
                      </div>
                    </motion.div>

                    {/* Connection lines */}
                    <svg className='absolute inset-0 w-full h-full pointer-events-none'>
                      {/* Customer to Browse Products */}
                      <motion.path
                        d='M 84,300 L 175,140'
                        stroke='rgba(139, 92, 246, 0.7)'
                        strokeWidth='2'
                        fill='none'
                        markerEnd='url(#arrowhead)'
                        initial={{ pathLength: 0 }}
                        animate={{
                          pathLength: [0, 1, 0],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: 'easeInOut',
                        }}
                      />

                      <motion.path
                        d='M 84,300 L 175,300'
                        stroke='rgba(139, 92, 246, 0.7)'
                        strokeWidth='2'
                        fill='none'
                        markerEnd='url(#arrowhead)'
                        initial={{ pathLength: 0 }}
                        animate={{
                          pathLength: [0, 1, 0],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: 'easeInOut',
                          delay: 0.5,
                        }}
                      />

                      <motion.path
                        d='M 84,300 L 175,450'
                        stroke='rgba(139, 92, 246, 0.7)'
                        strokeWidth='2'
                        fill='none'
                        markerEnd='url(#arrowhead)'
                        initial={{ pathLength: 0 }}
                        animate={{
                          pathLength: [0, 1, 0],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: 'easeInOut',
                          delay: 1,
                        }}
                      />

                      {/* System Connections */}
                      <motion.path
                        d='M 325,145 L 403,145'
                        stroke='rgba(139, 92, 246, 0.7)'
                        strokeWidth='2'
                        fill='none'
                        strokeDasharray='5,5'
                        markerEnd='url(#arrowhead)'
                        initial={{ pathLength: 0 }}
                        animate={{
                          pathLength: [0, 1, 0],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: 'easeInOut',
                          delay: 1.5,
                        }}
                      />

                      <motion.path
                        d='M 325,450 L 402, 383'
                        stroke='rgba(139, 92, 246, 0.7)'
                        strokeWidth='2'
                        fill='none'
                        strokeDasharray='5,5'
                        markerEnd='url(#arrowhead)'
                        initial={{ pathLength: 0 }}
                        animate={{
                          pathLength: [0, 1, 0],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: 'easeInOut',
                          delay: 2,
                        }}
                      />

                      <motion.path
                        d='M 325,300 L 402,383'
                        stroke='rgba(139, 92, 246, 0.7)'
                        strokeWidth='2'
                        fill='none'
                        strokeDasharray='5,5'
                        markerEnd='url(#arrowhead)'
                        initial={{ pathLength: 0 }}
                        animate={{
                          pathLength: [0, 1, 0],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: 'easeInOut',
                          delay: 2.5,
                        }}
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id='features' className='py-20 md:py-32 relative'>
          <div className='container mx-auto px-6'>
            <div className='text-center max-w-3xl mx-auto mb-16'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: '-50px' }}
                className='inline-flex items-center px-3 py-1 mb-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm'
              >
                <Zap className='h-4 w-4 mr-2' />
                <span>Powerful Features</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, margin: '-50px' }}
                className='text-3xl md:text-5xl font-bold mb-6'
              >
                Everything You Need for <br />
                <span className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400'>
                  UML Diagramming
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, margin: '-50px' }}
                className='text-lg text-slate-300'
              >
                Our platform supports all standard UML diagram types with
                specialized elements and intuitive tools.
              </motion.p>
            </div>

            {/* Feature cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className='relative group'
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true, margin: '-50px' }}
                  whileHover={{ y: -5 }}
                >
                  <div
                    className={`p-8 rounded-xl ${feature.color} ${feature.borderColor} border backdrop-blur-sm relative overflow-hidden h-full`}
                  >
                    {/* Background pattern */}
                    <div className='absolute inset-0 opacity-10'>
                      <svg width='100%' height='100%'>
                        <pattern
                          id={`pattern-${index}`}
                          width='40'
                          height='40'
                          patternUnits='userSpaceOnUse'
                        >
                          <path
                            d='M 40 0 L 0 0 0 40'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='0.5'
                          />
                        </pattern>
                        <rect
                          width='100%'
                          height='100%'
                          fill={`url(#pattern-${index})`}
                        />
                      </svg>
                    </div>

                    {/* Icon */}
                    <div className='relative mb-4'>
                      <motion.div
                        className='w-12 h-12 rounded-lg flex items-center justify-center'
                        whileHover={{ rotate: 5, scale: 1.1 }}
                      >
                        {feature.icon}
                      </motion.div>
                    </div>

                    {/* Content */}
                    <h3 className='text-xl font-bold mb-3 text-white relative'>
                      {feature.title}
                    </h3>
                    <p className='text-slate-300 relative'>
                      {feature.description}
                    </p>

                    {/* Hover effect */}
                    <div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left'></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id='how-it-works' className='py-20 md:py-32 relative'>
          <div className='container mx-auto px-6'>
            <div className='text-center max-w-3xl mx-auto mb-16'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: '-50px' }}
                className='inline-flex items-center px-3 py-1 mb-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm'
              >
                <Activity className='h-4 w-4 mr-2' />
                <span>How It Works</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, margin: '-50px' }}
                className='text-3xl md:text-5xl font-bold mb-6'
              >
                <span className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400'>
                  Simplify
                </span>{' '}
                Your Design Process
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, margin: '-50px' }}
                className='text-lg text-slate-300'
              >
                Our intuitive platform makes UML diagramming easy and efficient.
              </motion.p>
            </div>

            {/* Tabs */}
            <div className='max-w-4xl mx-auto'>
              {/* Tab navigation */}
              <div className='flex flex-wrap justify-center mb-12 gap-2'>
                {tabs.map((tab, index) => (
                  <motion.button
                    key={index}
                    className={`px-6 py-3 rounded-lg flex items-center space-x-2 transition-all ${
                      activeTab === index
                        ? 'bg-indigo-500/20 border-indigo-500/50 text-white'
                        : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700/50'
                    } border`}
                    onClick={() => setActiveTab(index)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    viewport={{ once: true, margin: '-50px' }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.title}</span>
                  </motion.button>
                ))}
              </div>

              {/* Tab content */}
              <div className='relative bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8 min-h-[300px]'>
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className='flex flex-col md:flex-row items-center gap-8'
                  >
                    {/* Tab illustration */}
                    <div className='w-full md:w-1/2'>
                      <div className='relative aspect-square max-w-sm mx-auto'>
                        {/* Placeholder for tab-specific illustration */}
                        <div className='absolute inset-0 rounded-xl overflow-hidden border border-indigo-500/20 bg-slate-900/50 backdrop-blur-sm'>
                          {activeTab === 0 && (
                            <div className='absolute inset-0 flex items-center justify-center'>
                              <motion.div
                                className='w-32 h-32 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center'
                                animate={{
                                  rotate: [0, 5, 0, -5, 0],
                                  scale: [1, 1.05, 1],
                                }}
                                transition={{
                                  duration: 5,
                                  repeat: Number.POSITIVE_INFINITY,
                                  ease: 'easeInOut',
                                }}
                              >
                                <Layers className='h-12 w-12 text-indigo-400' />
                              </motion.div>
                            </div>
                          )}

                          {activeTab === 1 && (
                            <div className='absolute inset-0 flex items-center justify-center'>
                              <motion.div
                                className='w-32 h-32 rounded-xl bg-violet-500/20 border border-violet-500/40 flex items-center justify-center'
                                animate={{
                                  rotate: [0, 5, 0, -5, 0],
                                  scale: [1, 1.05, 1],
                                }}
                                transition={{
                                  duration: 5,
                                  repeat: Number.POSITIVE_INFINITY,
                                  ease: 'easeInOut',
                                }}
                              >
                                <Code className='h-12 w-12 text-violet-400' />
                              </motion.div>
                            </div>
                          )}

                          {activeTab === 2 && (
                            <div className='absolute inset-0 flex items-center justify-center'>
                              <motion.div
                                className='w-32 h-32 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center'
                                animate={{
                                  rotate: [0, 5, 0, -5, 0],
                                  scale: [1, 1.05, 1],
                                }}
                                transition={{
                                  duration: 5,
                                  repeat: Number.POSITIVE_INFINITY,
                                  ease: 'easeInOut',
                                }}
                              >
                                <Share2 className='h-12 w-12 text-purple-400' />
                              </motion.div>
                            </div>
                          )}

                          {activeTab === 3 && (
                            <div className='absolute inset-0 flex items-center justify-center'>
                              <motion.div
                                className='w-32 h-32 rounded-xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center'
                                animate={{
                                  rotate: [0, 5, 0, -5, 0],
                                  scale: [1, 1.05, 1],
                                }}
                                transition={{
                                  duration: 5,
                                  repeat: Number.POSITIVE_INFINITY,
                                  ease: 'easeInOut',
                                }}
                              >
                                <Download className='h-12 w-12 text-pink-400' />
                              </motion.div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Tab description */}
                    <div className='w-full md:w-1/2'>
                      <h3 className='text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400'>
                        {tabs[activeTab].title}
                      </h3>
                      <p className='text-slate-300 mb-6'>
                        {tabs[activeTab].content}
                      </p>
                      <Link
                        href={`features/${tabs[activeTab].link}`}
                        className='px-6 py-2 rounded-lg bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/30 transition-colors flex items-center'
                      >
                        Learn more
                        <ExternalLink className='ml-2 h-4 w-4' />
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id='contact' className='py-20 md:py-32 relative'>
          <div className='container mx-auto px-6'>
            <div className='max-w-5xl mx-auto'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                {/* Left side - Contact info */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true, margin: '-50px' }}
                >
                  <div className='inline-flex items-center px-3 py-1 mb-6 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm'>
                    <MessageSquare className='h-4 w-4 mr-2' />
                    <span>Get in Touch</span>
                  </div>

                  <h2 className='text-3xl md:text-4xl font-bold mb-6'>
                    Let's{' '}
                    <span className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400'>
                      Connect
                    </span>
                  </h2>

                  <p className='text-slate-300 mb-8'>
                    Have questions about UML Designer? Our team is ready to help
                    you create professional diagrams with ease.
                  </p>

                  <div className='space-y-6'>
                    <motion.div
                      className='flex items-center'
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true, margin: '-50px' }}
                    >
                      <div className='w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center mr-4'>
                        <Mail className='h-5 w-5 text-indigo-400' />
                      </div>
                      <div>
                        <p className='text-slate-400 text-sm'>Email</p>
                        <p className='text-white font-medium'>
                          alhendisaid@gmail.com
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      className='flex items-center'
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true, margin: '-50px' }}
                    >
                      <div className='w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center mr-4'>
                        <Github className='h-5 w-5 text-indigo-400' />
                      </div>
                      <div>
                        <p className='text-slate-400 text-sm'>GitHub</p>
                        <p className='text-white font-medium'>
                          https://github.com/said96dev/uml-digram-editor{' '}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Right side - Contact form */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true, margin: '-50px' }}
                  className='bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8'
                >
                  <h3 className='text-2xl font-bold mb-6'>Send a Message</h3>

                  {/* Replace the existing form with the ContactForm component */}
                  <ContactForm />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='py-20 relative'>
          <div className='container mx-auto px-6'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: '-50px' }}
              className='max-w-4xl mx-auto text-center bg-gradient-to-r from-indigo-900/50 to-violet-900/50 backdrop-blur-md rounded-2xl border border-indigo-500/20 p-12 relative overflow-hidden'
            >
              {/* Background elements */}
              <div className='absolute inset-0 overflow-hidden'>
                <svg width='100%' height='100%' className='absolute opacity-10'>
                  <pattern
                    id='grid-pattern'
                    width='40'
                    height='40'
                    patternUnits='userSpaceOnUse'
                  >
                    <path
                      d='M 40 0 L 0 0 0 40'
                      fill='none'
                      stroke='rgba(255, 255, 255, 0.3)'
                      strokeWidth='0.5'
                    />
                  </pattern>
                  <rect width='100%' height='100%' fill='url(#grid-pattern)' />
                </svg>

                <motion.div
                  className='absolute -top-20 -right-20 w-60 h-60 rounded-full bg-indigo-500/20 blur-3xl'
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                  }}
                />

                <motion.div
                  className='absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-violet-500/20 blur-3xl'
                  animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                    delay: 1,
                  }}
                />
              </div>

              <h2 className='text-3xl md:text-4xl font-bold mb-6 relative'>
                Ready to Start{' '}
                <span className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400'>
                  Designing
                </span>
                ?
              </h2>

              <p className='text-lg text-slate-300 mb-8 relative max-w-2xl mx-auto'>
                Join thousands of developers who are creating beautiful UML
                diagrams with our intuitive platform.
              </p>

              <motion.button
                onClick={onStart}
                className='px-8 py-4 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium hover:from-indigo-500 hover:to-violet-500 transition-all relative'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Designing Now
                <ArrowRight className='inline-block ml-2 h-5 w-5' />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className='py-16 relative overflow-hidden'>
          {/* Hintergrund-Elemente */}
          <div className='absolute inset-0 bg-gradient-to-b from-[#0F172A] to-[#1E293B]'></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOHY2YzYuNjMgMCAxMiA1LjM3IDEyIDEyaC02YzAgMy4zMS0yLjY5IDYtNiA2djZjNi42MyAwIDEyLTUuMzcgMTItMTJoNnptLTYgMTJjLTkuOTQgMC0xOCA4LjA2LTE4IDE4aDZjMC02LjYzIDUuMzctMTIgMTItMTJ2LTZ6IiBmaWxsPSIjNjM2NkYxIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz48L2c+PC9zdmc+')]"></div>

          <div className='container mx-auto px-6 relative z-10'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-12'>
              {/* Logo and description */}
              <div className='md:col-span-2'>
                <div className='flex items-center space-x-3 mb-6'>
                  <div className='relative'>
                    <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center'>
                      <Activity className='h-6 w-6 text-white' />
                    </div>
                    <motion.div
                      className='absolute -inset-2 rounded-xl bg-indigo-500/20 blur-md z-[-1]'
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
                  <span className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400'>
                    UML Designer
                  </span>
                </div>

                <p className='text-slate-400 mb-6 max-w-md'>
                  Create professional UML diagrams with our intuitive,
                  developer-focused interface. Design, collaborate, and export
                  with ease.
                </p>

                <div className='flex space-x-4'>
                  {[Github, Twitter, Mail].map((Icon, i) => (
                    <motion.a
                      key={i}
                      href='#'
                      className='w-10 h-10 rounded-lg bg-slate-800/50 backdrop-blur-sm flex items-center justify-center text-slate-400 hover:bg-indigo-500/20 hover:text-indigo-300 transition-all border border-slate-700/50 hover:border-indigo-500/30'
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className='h-5 w-5' />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Quick links */}
              <div>
                <h3 className='text-white font-bold mb-6 text-lg'>
                  Quick Links
                </h3>
                <ul className='space-y-4'>
                  {['Features', 'How it Works', 'Contact'].map((item, i) => (
                    <motion.li key={i} whileHover={{ x: 3 }}>
                      <a
                        href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                        className='text-slate-400 hover:text-indigo-300 transition-colors flex items-center'
                      >
                        <motion.span
                          className='w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2 opacity-0'
                          animate={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        />
                        {item}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/*     <div>
                <h3 className='text-white font-bold mb-6 text-lg'>Resources</h3>
                <ul className='space-y-4'>
                  {[
                    'Documentation',
                    'Tutorials',
                    'Examples',
                    'API Reference',
                    'Support',
                  ].map((item, i) => (
                    <motion.li key={i} whileHover={{ x: 3 }}>
                      <a
                        href='#'
                        className='text-slate-400 hover:text-indigo-300 transition-colors flex items-center'
                      >
                        <motion.span
                          className='w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2 opacity-0'
                          animate={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        />
                        {item}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div> */}
            </div>

            {/* Bottom bar */}
            <div className='mt-16 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center'>
              <p className='text-slate-500 text-sm mb-4 md:mb-0'>
                &copy; {new Date().getFullYear()} UML Designer. All rights
                reserved.
              </p>

              <div className='flex flex-wrap justify-center gap-6'>
                <a
                  href='#'
                  className='text-slate-500 hover:text-indigo-300 text-sm transition-colors'
                >
                  Privacy Policy
                </a>
                <a
                  href='#'
                  className='text-slate-500 hover:text-indigo-300 text-sm transition-colors'
                >
                  Terms of Service
                </a>
                <a
                  href='#'
                  className='text-slate-500 hover:text-indigo-300 text-sm transition-colors'
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

function ThickerBackground() {
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

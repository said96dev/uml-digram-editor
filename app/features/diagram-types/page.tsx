'use client'

import { motion } from 'framer-motion'
import {
  Database,
  ArrowRight,
  GitBranch,
  Users,
  Workflow,
  Network,
  Timer,
  LayoutGrid,
} from 'lucide-react'
import Link from 'next/link'

export default function DiagramTypesPage() {
  return (
    <div className='container mx-auto px-6 py-12'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='inline-flex items-center px-3 py-1 mb-6 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm'
      >
        <Database className='h-4 w-4 mr-2' />
        <span>Diagram Types</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className='text-4xl md:text-6xl font-bold mb-8 leading-tight'
      >
        <span className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400'>
          Multiple Diagram
        </span>{' '}
        Types
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='text-xl text-slate-300 mb-12 max-w-3xl'
      >
        Our UML Designer supports a comprehensive range of UML diagram types,
        allowing you to model every aspect of your software system with
        precision and clarity.
      </motion.p>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
        {/* Use Case Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8 hover:border-indigo-500/30 transition-colors'
        >
          <div className='w-14 h-14 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-6'>
            <Users className='h-8 w-8 text-indigo-400' />
          </div>
          <h3 className='text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400'>
            Use Case Diagrams
          </h3>
          <p className='text-slate-300 mb-6'>
            Model system interactions with actors and use cases. Perfect for
            capturing functional requirements and visualizing how users interact
            with your system.
          </p>
          <ul className='text-slate-400 space-y-2 mb-6'>
            <li className='flex items-start'>
              <div className='w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center mr-3 mt-0.5'>
                <span className='text-indigo-400 text-xs'>✓</span>
              </div>
              <span>Actors and use cases</span>
            </li>
            <li className='flex items-start'>
              <div className='w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center mr-3 mt-0.5'>
                <span className='text-indigo-400 text-xs'>✓</span>
              </div>
              <span>Include and extend relationships</span>
            </li>
            <li className='flex items-start'>
              <div className='w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center mr-3 mt-0.5'>
                <span className='text-indigo-400 text-xs'>✓</span>
              </div>
              <span>System boundaries</span>
            </li>
          </ul>
        </motion.div>

        {/* State Machine Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8 hover:border-purple-500/30 transition-colors'
        >
          <div className='w-14 h-14 rounded-lg bg-purple-500/20 flex items-center justify-center mb-6'>
            <GitBranch className='h-8 w-8 text-purple-400' />
          </div>
          <h3 className='text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400'>
            State Machine Diagrams
          </h3>
          <p className='text-slate-300 mb-6'>
            Represent object states and transitions. Ideal for modeling the
            behavior of objects that change states in response to events and
            conditions.
          </p>
          <ul className='text-slate-400 space-y-2 mb-6'>
            <li className='flex items-start'>
              <div className='w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center mr-3 mt-0.5'>
                <span className='text-purple-400 text-xs'>✓</span>
              </div>
              <span>States and transitions</span>
            </li>
            <li className='flex items-start'>
              <div className='w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center mr-3 mt-0.5'>
                <span className='text-purple-400 text-xs'>✓</span>
              </div>
              <span>Guards and actions</span>
            </li>
            <li className='flex items-start'>
              <div className='w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center mr-3 mt-0.5'>
                <span className='text-purple-400 text-xs'>✓</span>
              </div>
              <span>Composite states</span>
            </li>
          </ul>
        </motion.div>

        {/* Activity Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className='bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8 hover:border-orange-500/30 transition-colors'
        >
          <div className='w-14 h-14 rounded-lg bg-orange-500/20 flex items-center justify-center mb-6'>
            <Workflow className='h-8 w-8 text-orange-400' />
          </div>
          <h3 className='text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-400'>
            Activity Diagrams
          </h3>
          <p className='text-slate-300 mb-6'>
            Model workflows and business processes. Perfect for visualizing
            complex algorithms, business processes, and parallel operations.
          </p>
          <ul className='text-slate-400 space-y-2 mb-6'>
            <li className='flex items-start'>
              <div className='w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center mr-3 mt-0.5'>
                <span className='text-orange-400 text-xs'>✓</span>
              </div>
              <span>Actions and activities</span>
            </li>
            <li className='flex items-start'>
              <div className='w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center mr-3 mt-0.5'>
                <span className='text-orange-400 text-xs'>✓</span>
              </div>
              <span>Decision points and merges</span>
            </li>
            <li className='flex items-start'>
              <div className='w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center mr-3 mt-0.5'>
                <span className='text-orange-400 text-xs'>✓</span>
              </div>
              <span>Forks and joins for parallel flows</span>
            </li>
          </ul>
        </motion.div>

        {/* Communication Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className='bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8 hover:border-blue-500/30 transition-colors'
        >
          <div className='w-14 h-14 rounded-lg bg-blue-500/20 flex items-center justify-center mb-6'>
            <Network className='h-8 w-8 text-blue-400' />
          </div>
          <h3 className='text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400'>
            Communication Diagrams
          </h3>
          <p className='text-slate-400 mb-4 italic'>
            Coming soon – we're working on it!
          </p>
          <div className='absolute top-3 right-3 bg-blue-500 text-xs px-2 py-1 rounded-full text-white'>
            Coming Soon
          </div>
          <ul className='text-slate-400 space-y-2 mb-6'>
            <li className='flex items-start'>
              <div className='w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 mt-0.5'>
                <span className='text-blue-400 text-xs'>✓</span>
              </div>
              <span>Objects and links</span>
            </li>
            <li className='flex items-start'>
              <div className='w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 mt-0.5'>
                <span className='text-blue-400 text-xs'>✓</span>
              </div>
              <span>Sequenced messages</span>
            </li>
            <li className='flex items-start'>
              <div className='w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 mt-0.5'>
                <span className='text-blue-400 text-xs'>✓</span>
              </div>
              <span>Object relationships</span>
            </li>
          </ul>
        </motion.div>

        {/* Sequence Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className='bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8 hover:border-cyan-500/30 transition-colors'
        >
          <div className='w-14 h-14 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-6'>
            <Timer className='h-8 w-8 text-cyan-400' />
          </div>
          <h3 className='text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-400'>
            Sequence Diagrams
          </h3>
          <p className='text-slate-400 mb-4 italic'>
            Coming soon – available in a future update.
          </p>
          <div className='absolute top-3 right-3 bg-cyan-500 text-xs px-2 py-1 rounded-full text-white'>
            Coming Soon
          </div>
          <ul className='text-slate-400 space-y-2 mb-6'>
            <li className='flex items-start'>
              <div className='w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center mr-3 mt-0.5'>
                <span className='text-cyan-400 text-xs'>✓</span>
              </div>
              <span>Lifelines and messages</span>
            </li>
            <li className='flex items-start'>
              <div className='w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center mr-3 mt-0.5'>
                <span className='text-cyan-400 text-xs'>✓</span>
              </div>
              <span>Activation bars</span>
            </li>
            <li className='flex items-start'>
              <div className='w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center mr-3 mt-0.5'>
                <span className='text-cyan-400 text-xs'>✓</span>
              </div>
              <span>Combined fragments (alt, loop, opt)</span>
            </li>
          </ul>
        </motion.div>

        {/* Interaction Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className='bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8 hover:border-pink-500/30 transition-colors'
        >
          <div className='w-14 h-14 rounded-lg bg-pink-500/20 flex items-center justify-center mb-6'>
            <LayoutGrid className='h-8 w-8 text-pink-400' />
          </div>
          <h3 className='text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-rose-400'>
            Interaction Overview
          </h3>
          <p className='text-slate-300 mb-6'>
            Combine activity and sequence diagrams. Ideal for modeling complex
            control flows between different interaction diagrams.
          </p>
          <ul className='text-slate-400 space-y-2 mb-6'>
            <li className='flex items-start'>
              <div className='w-5 h-5 rounded-full bg-pink-500/20 flex items-center justify-center mr-3 mt-0.5'>
                <span className='text-pink-400 text-xs'>✓</span>
              </div>
              <span>Frames containing interactions</span>
            </li>
            <li className='flex items-start'>
              <div className='w-5 h-5 rounded-full bg-pink-500/20 flex items-center justify-center mr-3 mt-0.5'>
                <span className='text-pink-400 text-xs'>✓</span>
              </div>
              <span>Control flow between interactions</span>
            </li>
            <li className='flex items-start'>
              <div className='w-5 h-5 rounded-full bg-pink-500/20 flex items-center justify-center mr-3 mt-0.5'>
                <span className='text-pink-400 text-xs'>✓</span>
              </div>
              <span>Decision points and merges</span>
            </li>
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className='max-w-4xl mx-auto text-center bg-gradient-to-r from-indigo-900/50 to-violet-900/50 backdrop-blur-md rounded-2xl border border-indigo-500/20 p-12 relative overflow-hidden'
      >
        <h2 className='text-3xl font-bold mb-6 relative'>
          Ready to Start{' '}
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400'>
            Designing
          </span>
          ?
        </h2>

        <p className='text-lg text-slate-300 mb-8 relative max-w-2xl mx-auto'>
          Try our UML Designer now and experience the power of multiple diagram
          types in one intuitive interface.
        </p>

        <Link href='/?editor=true'>
          <motion.button
            className='px-8 py-4 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium hover:from-indigo-500 hover:to-violet-500 transition-all relative'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Designing Now
            <ArrowRight className='inline-block ml-2 h-5 w-5' />
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}

'use client'

import { motion } from 'framer-motion'
import { Layers, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function DesignPage() {
  return (
    <div className='container mx-auto px-6 py-12'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='inline-flex items-center px-3 py-1 mb-6 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm'
      >
        <Layers className='h-4 w-4 mr-2' />
        <span>Design Features</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className='text-4xl md:text-6xl font-bold mb-8 leading-tight'
      >
        <span className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400'>
          Intuitive Design
        </span>{' '}
        Experience
      </motion.h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-12 mb-16'>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className='text-lg text-slate-300 mb-6'>
            Our UML Designer provides an intuitive drag-and-drop interface that
            makes creating complex diagrams simple and efficient. Whether you're
            a beginner or an experienced software architect, our tool adapts to
            your needs.
          </p>
          <p className='text-lg text-slate-300 mb-6'>
            The design experience focuses on simplicity without sacrificing
            power, allowing you to create professional diagrams quickly.
          </p>
          <Link
            href='/'
            className='inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium hover:from-indigo-500 hover:to-violet-500 transition-all'
          >
            Try It Now
            <ArrowRight className='ml-2 h-5 w-5' />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8'
        >
          <h3 className='text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400'>
            Key Design Features
          </h3>
          <ul className='space-y-4'>
            <li className='flex items-start'>
              <div className='w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center mr-3 mt-0.5'>
                <span className='text-indigo-400 text-sm font-bold'>1</span>
              </div>
              <div>
                <h4 className='text-white font-medium mb-1'>
                  Drag-and-Drop Interface
                </h4>
                <p className='text-slate-300'>
                  Easily place and connect elements with intuitive drag-and-drop
                  functionality.
                </p>
              </div>
            </li>
            <li className='flex items-start'>
              <div className='w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center mr-3 mt-0.5'>
                <span className='text-indigo-400 text-sm font-bold'>2</span>
              </div>
              <div>
                <h4 className='text-white font-medium mb-1'>
                  Smart Connectors
                </h4>
                <p className='text-slate-300'>
                  Connections between elements automatically adjust as you move
                  items around.
                </p>
              </div>
            </li>
            <li className='flex items-start'>
              <div className='w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center mr-3 mt-0.5'>
                <span className='text-indigo-400 text-sm font-bold'>3</span>
              </div>
              <div>
                <h4 className='text-white font-medium mb-1'>
                  Customizable Elements
                </h4>
                <p className='text-slate-300'>
                  Adjust colors, sizes, and styles to match your preferences or
                  company branding.
                </p>
              </div>
            </li>
            <li className='flex items-start'>
              <div className='w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center mr-3 mt-0.5'>
                <span className='text-indigo-400 text-sm font-bold'>4</span>
              </div>
              <div>
                <h4 className='text-white font-medium mb-1'>Touch-Optimized</h4>
                <p className='text-slate-300'>
                  Works seamlessly on touch devices with gesture support for
                  pinch-to-zoom and panning.
                </p>
              </div>
            </li>
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className='bg-gradient-to-r from-indigo-900/50 to-violet-900/50 backdrop-blur-md rounded-2xl border border-indigo-500/20 p-8 mb-16'
      >
        <h2 className='text-2xl font-bold mb-4'>Design Workflow</h2>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
          <div className='bg-slate-800/50 rounded-lg p-6 border border-slate-700/50'>
            <div className='w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-4'>
              <span className='text-indigo-400 font-bold'>1</span>
            </div>
            <h3 className='text-lg font-medium mb-2'>Select Diagram Type</h3>
            <p className='text-slate-300 text-sm'>
              Choose from various UML diagram types to start your design.
            </p>
          </div>
          <div className='bg-slate-800/50 rounded-lg p-6 border border-slate-700/50'>
            <div className='w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-4'>
              <span className='text-indigo-400 font-bold'>2</span>
            </div>
            <h3 className='text-lg font-medium mb-2'>Add Elements</h3>
            <p className='text-slate-300 text-sm'>
              Drag elements from the toolbar and place them on the canvas.
            </p>
          </div>
          <div className='bg-slate-800/50 rounded-lg p-6 border border-slate-700/50'>
            <div className='w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-4'>
              <span className='text-indigo-400 font-bold'>3</span>
            </div>
            <h3 className='text-lg font-medium mb-2'>Connect Elements</h3>
            <p className='text-slate-300 text-sm'>
              Create relationships between elements with different connection
              types.
            </p>
          </div>
          <div className='bg-slate-800/50 rounded-lg p-6 border border-slate-700/50'>
            <div className='w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-4'>
              <span className='text-indigo-400 font-bold'>4</span>
            </div>
            <h3 className='text-lg font-medium mb-2'>Customize & Export</h3>
            <p className='text-slate-300 text-sm'>
              Adjust styles, add annotations, and export your finished diagram.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h2 className='text-3xl font-bold mb-6'>Design Tips & Tricks</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6'>
            <h3 className='text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400'>
              Keyboard Shortcuts
            </h3>
            <ul className='space-y-3'>
              <li className='flex justify-between'>
                <span className='text-slate-300'>Select All</span>
                <span className='text-white font-mono bg-slate-700/50 px-2 py-0.5 rounded'>
                  Ctrl + A
                </span>
              </li>
              <li className='flex justify-between'>
                <span className='text-slate-300'>Delete Selected</span>
                <span className='text-white font-mono bg-slate-700/50 px-2 py-0.5 rounded'>
                  Delete
                </span>
              </li>
              <li className='flex justify-between'>
                <span className='text-slate-300'>Copy</span>
                <span className='text-white font-mono bg-slate-700/50 px-2 py-0.5 rounded'>
                  Ctrl + C
                </span>
              </li>
              <li className='flex justify-between'>
                <span className='text-slate-300'>Paste</span>
                <span className='text-white font-mono bg-slate-700/50 px-2 py-0.5 rounded'>
                  Ctrl + V
                </span>
              </li>
              <li className='flex justify-between'>
                <span className='text-slate-300'>Undo</span>
                <span className='text-white font-mono bg-slate-700/50 px-2 py-0.5 rounded'>
                  Ctrl + Z
                </span>
              </li>
            </ul>
          </div>
          <div className='bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6'>
            <h3 className='text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400'>
              Best Practices
            </h3>
            <ul className='space-y-3'>
              <li className='flex items-start'>
                <div className='w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center mr-3 mt-0.5'>
                  <span className='text-indigo-400 text-xs'>✓</span>
                </div>
                <span className='text-slate-300'>
                  Keep diagrams focused on a single aspect or functionality
                </span>
              </li>
              <li className='flex items-start'>
                <div className='w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center mr-3 mt-0.5'>
                  <span className='text-indigo-400 text-xs'>✓</span>
                </div>
                <span className='text-slate-300'>
                  Use consistent naming conventions throughout your diagrams
                </span>
              </li>
              <li className='flex items-start'>
                <div className='w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center mr-3 mt-0.5'>
                  <span className='text-indigo-400 text-xs'>✓</span>
                </div>
                <span className='text-slate-300'>
                  Organize elements logically with proper spacing
                </span>
              </li>
              <li className='flex items-start'>
                <div className='w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center mr-3 mt-0.5'>
                  <span className='text-indigo-400 text-xs'>✓</span>
                </div>
                <span className='text-slate-300'>
                  Add notes and annotations to clarify complex relationships
                </span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

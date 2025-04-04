'use client'

import { motion } from 'framer-motion'
import { Download, ArrowRight, FileJson, FileImage, Share2 } from 'lucide-react'
import Link from 'next/link'

export default function ExportPage() {
  return (
    <div className='container mx-auto px-6 py-12'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='inline-flex items-center px-3 py-1 mb-6 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm'
      >
        <Download className='h-4 w-4 mr-2' />
        <span>Export Features</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className='text-4xl md:text-6xl font-bold mb-8 leading-tight'
      >
        <span className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400'>
          Export & Share
        </span>{' '}
        Your Diagrams
      </motion.h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-12 mb-16'>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className='text-lg text-slate-300 mb-6'>
            Our UML Designer provides flexible export options that make it easy
            to share your diagrams or include them in your documentation. Export
            to various formats and seamlessly integrate your designs into your
            workflow.
          </p>
          <p className='text-lg text-slate-300 mb-6'>
            Whether you need to share with team members, include in
            presentations, or document your architecture, our export features
            have you covered.
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
            Export Options
          </h3>
          <ul className='space-y-6'>
            <li className='flex items-start'>
              <div className='w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center mr-4 mt-0.5'>
                <FileJson className='h-5 w-5 text-indigo-400' />
              </div>
              <div>
                <h4 className='text-white font-medium mb-1'>JSON Format</h4>
                <p className='text-slate-300'>
                  Export your diagram as a JSON file that can be imported later
                  to continue your work or share with team members.
                </p>
              </div>
            </li>
            <li className='flex items-start'>
              <div className='w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center mr-4 mt-0.5'>
                <FileImage className='h-5 w-5 text-indigo-400' />
              </div>
              <div>
                <h4 className='text-white font-medium mb-1'>Image Export</h4>
                <p className='text-slate-300'>
                  Export your diagram as a PNG image for easy inclusion in
                  documentation, presentations, or sharing.
                </p>
              </div>
            </li>
            <li className='flex items-start'>
              <div className='w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center mr-4 mt-0.5'>
                <Share2 className='h-5 w-5 text-indigo-400' />
              </div>
              <div>
                <h4 className='text-white font-medium mb-1'>
                  Shareable Format
                </h4>
                <p className='text-slate-300'>
                  Export in a format that can be easily shared and imported by
                  others using the UML Designer.
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
        <h2 className='text-2xl font-bold mb-6'>How to Export Your Diagram</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='bg-slate-800/50 rounded-lg p-6 border border-slate-700/50'>
            <div className='w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-4'>
              <span className='text-indigo-400 font-bold'>1</span>
            </div>
            <h3 className='text-lg font-medium mb-2'>Create Your Diagram</h3>
            <p className='text-slate-300 text-sm'>
              Design your UML diagram using our intuitive editor with the
              diagram type of your choice.
            </p>
          </div>
          <div className='bg-slate-800/50 rounded-lg p-6 border border-slate-700/50'>
            <div className='w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-4'>
              <span className='text-indigo-400 font-bold'>2</span>
            </div>
            <h3 className='text-lg font-medium mb-2'>Click Export</h3>
            <p className='text-slate-300 text-sm'>
              Use the Export button in the top-right corner of the editor to
              open export options.
            </p>
          </div>
          <div className='bg-slate-800/50 rounded-lg p-6 border border-slate-700/50'>
            <div className='w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-4'>
              <span className='text-indigo-400 font-bold'>3</span>
            </div>
            <h3 className='text-lg font-medium mb-2'>Choose Format</h3>
            <p className='text-slate-300 text-sm'>
              Select your preferred export format (JSON or PNG) and save the
              file to your device.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h2 className='text-3xl font-bold mb-6'>Technical Details</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6'>
            <h3 className='text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400'>
              JSON Export Format
            </h3>
            <div className='bg-slate-900/50 rounded-lg p-4 font-mono text-sm text-slate-300 mb-4 overflow-x-auto'>
              <pre>{`{
  "nodes": [
    {
      "id": "node-1",
      "type": "actor",
      "position": { "x": 100, "y": 100 },
      "data": { "name": "User" }
    },
    {
      "id": "node-2",
      "type": "useCase",
      "position": { "x": 300, "y": 100 },
      "data": { "name": "Login" }
    }
  ],
  "edges": [
    {
      "id": "edge-1",
      "source": "node-1",
      "target": "node-2",
      "type": "association"
    }
  ],
  "diagramType": "useCase"
}`}</pre>
            </div>
            <p className='text-slate-300 text-sm'>
              The JSON format preserves all diagram elements, positions, and
              relationships, allowing for perfect reconstruction when imported
              later.
            </p>
          </div>
          <div className='bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6'>
            <h3 className='text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400'>
              Image Export
            </h3>
            <p className='text-slate-300 mb-4'>
              Our image export feature captures your diagram exactly as it
              appears in the editor, including:
            </p>
            <ul className='text-slate-300 space-y-2 mb-4 list-disc pl-5'>
              <li>All diagram elements with proper styling</li>
              <li>Connections and relationships between elements</li>
              <li>Custom colors and formatting</li>
              <li>Text annotations and notes</li>
              <li>High-resolution output for clear presentation</li>
            </ul>
            <p className='text-slate-300 text-sm'>
              The exported PNG image can be easily included in documentation,
              presentations, or shared with stakeholders who don't need to edit
              the diagram.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className='mt-16 max-w-4xl mx-auto text-center bg-gradient-to-r from-indigo-900/50 to-violet-900/50 backdrop-blur-md rounded-2xl border border-indigo-500/20 p-12 relative overflow-hidden'
      >
        <h2 className='text-3xl font-bold mb-6 relative'>
          Ready to{' '}
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400'>
            Export
          </span>{' '}
          Your Diagrams?
        </h2>

        <p className='text-lg text-slate-300 mb-8 relative max-w-2xl mx-auto'>
          Try our UML Designer now and experience the flexibility of our export
          options.
        </p>

        <Link href='/'>
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

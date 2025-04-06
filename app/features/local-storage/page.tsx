'use client'

import { motion } from 'framer-motion'
import { Code, ArrowRight, Save, Upload, Database } from 'lucide-react'
import Link from 'next/link'

export default function LocalStoragePage() {
  return (
    <div className='container mx-auto px-6 py-12'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='inline-flex items-center px-3 py-1 mb-6 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm'
      >
        <Database className='h-4 w-4 mr-2' />
        <span>Local Storage</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className='text-4xl md:text-6xl font-bold mb-8 leading-tight'
      >
        <span className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400'>
          Never Lose
        </span>{' '}
        Your Work
      </motion.h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-12 mb-16'>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className='text-lg text-slate-300 mb-6'>
            Our UML Designer automatically saves your diagrams to your browser's
            local storage, ensuring that your work is never lost, even if you
            accidentally close your browser or experience a power outage.
          </p>
          <p className='text-lg text-slate-300 mb-6'>
            This seamless backup system works without requiring you to create an
            account or manually save your progress, making your design
            experience smooth and worry-free.
          </p>
          <Link
            href='/?editor=true'
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
            How Local Storage Works
          </h3>
          <ul className='space-y-4'>
            <li className='flex items-start'>
              <div className='w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center mr-4 mt-0.5'>
                <Save className='h-5 w-5 text-indigo-400' />
              </div>
              <div>
                <h4 className='text-white font-medium mb-1'>
                  Automatic Saving
                </h4>
                <p className='text-slate-300'>
                  Your diagram is automatically saved to your browser's local
                  storage as you work, with no manual action required.
                </p>
              </div>
            </li>
            <li className='flex items-start'>
              <div className='w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center mr-4 mt-0.5'>
                <Upload className='h-5 w-5 text-indigo-400' />
              </div>
              <div>
                <h4 className='text-white font-medium mb-1'>
                  Instant Recovery
                </h4>
                <p className='text-slate-300'>
                  When you return to the UML Designer, your most recent diagram
                  is automatically loaded from local storage.
                </p>
              </div>
            </li>
            <li className='flex items-start'>
              <div className='w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center mr-4 mt-0.5'>
                <Code className='h-5 w-5 text-indigo-400' />
              </div>
              <div>
                <h4 className='text-white font-medium mb-1'>Browser-Based</h4>
                <p className='text-slate-300'>
                  All data is stored directly in your browser, ensuring privacy
                  and eliminating the need for server connections.
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
        <h2 className='text-2xl font-bold mb-6'>Technical Details</h2>
        <div className='bg-slate-900/50 rounded-lg p-6 font-mono text-sm text-slate-300 mb-6 overflow-x-auto'>
          <pre>{`// Example of how we save your diagram to localStorage
function saveDiagram(diagramData) {
  try {
    const serializedData = JSON.stringify({
      nodes: diagramData.nodes,
      edges: diagramData.edges,
      diagramType: diagramData.type
    });
    
    localStorage.setItem('umlDiagram', serializedData);
    return true;
  } catch (error) {
    console.error('Error saving diagram:', error);
    return false;
  }
}

// Example of how we load your diagram from localStorage
function loadDiagram() {
  try {
    const savedDiagram = localStorage.getItem('umlDiagram');
    if (savedDiagram) {
      return JSON.parse(savedDiagram);
    }
    return null;
  } catch (error) {
    console.error('Error loading diagram:', error);
    return null;
  }
}`}</pre>
        </div>
        <p className='text-slate-300'>
          Our local storage implementation uses the browser's built-in
          localStorage API to securely store your diagram data. This approach
          ensures that your work persists between browser sessions without
          requiring server-side storage or authentication. The data is stored
          locally on your device, making it both fast to access and private.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h2 className='text-3xl font-bold mb-6'>Frequently Asked Questions</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6'>
            <h3 className='text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400'>
              Is my data secure?
            </h3>
            <p className='text-slate-300'>
              Yes, your diagram data is stored only on your local device and is
              not transmitted to any servers. This ensures complete privacy and
              security of your work.
            </p>
          </div>
          <div className='bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6'>
            <h3 className='text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400'>
              What if I clear my browser data?
            </h3>
            <p className='text-slate-300'>
              Clearing your browser data will remove saved diagrams from local
              storage. We recommend exporting important diagrams to files for
              backup before clearing browser data.
            </p>
          </div>
          <div className='bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6'>
            <h3 className='text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400'>
              Can I work on multiple diagrams?
            </h3>
            <p className='text-slate-300'>
              Currently, we store your most recent diagram. For multiple
              diagrams, we recommend using the export feature to save your work
              as files that can be imported later.
            </p>
          </div>
          <div className='bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6'>
            <h3 className='text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400'>
              Is there a size limit?
            </h3>
            <p className='text-slate-300'>
              Most browsers allow 5-10MB of localStorage per domain, which is
              sufficient for even complex UML diagrams. For very large diagrams,
              we recommend using the export feature.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

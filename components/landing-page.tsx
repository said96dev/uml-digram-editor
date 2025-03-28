'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Activity,
  Workflow,
  GitBranch,
  Network,
  Users,
  AlignVerticalJustifyCenter,
  Timer,
  LayoutGrid,
  ArrowRight,
  Github,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface LandingPageProps {
  onStart: () => void
}

export function LandingPage({ onStart }: LandingPageProps) {
  const [activeFeature, setActiveFeature] = useState(0)

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: <Users className='h-8 w-8 text-blue-500' />,
      title: 'Use Case Diagrams',
      description: 'Model system interactions with actors and use cases',
      color: 'bg-blue-500',
    },
    {
      icon: <AlignVerticalJustifyCenter className='h-8 w-8 text-cyan-500' />,
      title: 'Sequence Diagrams',
      description: 'Visualize interactions between objects over time',
      color: 'bg-cyan-500',
    },
    {
      icon: <Workflow className='h-8 w-8 text-orange-500' />,
      title: 'Activity Diagrams',
      description: 'Model workflows and business processes',
      color: 'bg-orange-500',
    },
    {
      icon: <GitBranch className='h-8 w-8 text-purple-500' />,
      title: 'State Machine Diagrams',
      description: 'Represent object states and transitions',
      color: 'bg-purple-500',
    },
    {
      icon: <Network className='h-8 w-8 text-indigo-500' />,
      title: 'Communication Diagrams',
      description: 'Show object interactions and relationships',
      color: 'bg-indigo-500',
    },
    {
      icon: <Timer className='h-8 w-8 text-teal-500' />,
      title: 'Timing Diagrams',
      description: 'Visualize timing constraints and state changes',
      color: 'bg-teal-500',
    },
    {
      icon: <LayoutGrid className='h-8 w-8 text-pink-500' />,
      title: 'Interaction Overview',
      description: 'Combine activity and sequence diagrams',
      color: 'bg-pink-500',
    },
  ]

  // Generate random background elements with better distribution
  const backgroundElements = Array.from({ length: 20 }, (_, i) => {
    // Generate random positions between 5% and 95% to avoid edges
    const randomX = 5 + Math.random() * 90
    const randomY = 5 + Math.random() * 90

    return {
      id: i,
      x: randomX,
      y: randomY,
      size: 50 + Math.random() * 300,
      color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 0.2)`,
      duration: 20 + Math.random() * 20,
    }
  })

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white overflow-hidden'>
      {/* Animated background elements */}
      <div className='absolute inset-0 overflow-hidden'>
        {backgroundElements.map((element) => (
          <motion.div
            key={element.id}
            className='absolute rounded-full'
            style={{
              width: element.size,
              height: element.size,
              backgroundColor: element.color,
              left: `${element.x}%`,
              top: `${element.y}%`,
            }}
            animate={{
              x: ['-10%', '10%', '-5%', '15%', '-10%'],
              y: ['5%', '-10%', '15%', '-5%', '5%'],
              scale: [1, 1.2, 0.9, 1.1, 1],
            }}
            transition={{
              duration: element.duration,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className='relative z-10 container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-12'
        >
          <div className='flex items-center justify-center mb-6'>
            <Activity className='h-12 w-12 text-white mr-4' />
            <h1 className='text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400'>
              UML Designer
            </h1>
          </div>
          <p className='text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto'>
            Create beautiful UML diagrams with an intuitive, touch-optimized
            interface
          </p>
        </motion.div>

        {/* Feature showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className='w-full max-w-5xl mb-16'
        >
          <div className='relative h-[400px] rounded-2xl overflow-hidden border border-gray-700 bg-black/30 backdrop-blur-lg shadow-2xl'>
            {/* Feature content */}
            <div className='absolute inset-0 flex items-center justify-center p-8'>
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className='flex flex-col md:flex-row items-center gap-8 w-full max-w-4xl'
              >
                <div
                  className={`p-8 rounded-2xl ${features[activeFeature].color} bg-opacity-20 backdrop-blur-md flex items-center justify-center w-40 h-40 flex-shrink-0 mx-auto md:mx-0`}
                >
                  {features[activeFeature].icon}
                </div>
                <div className='text-center md:text-left'>
                  <h3 className='text-2xl font-bold mb-4'>
                    {features[activeFeature].title}
                  </h3>
                  <p className='text-gray-300 text-lg'>
                    {features[activeFeature].description}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Feature indicators */}
            <div className='absolute bottom-6 left-0 right-0 flex justify-center gap-2'>
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeFeature
                      ? 'bg-white scale-125'
                      : 'bg-gray-500 opacity-50'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Key features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-16'
        >
          <div className='bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all'>
            <div className='bg-gradient-to-br from-blue-500 to-purple-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4'>
              <Sparkles className='h-6 w-6 text-white' />
            </div>
            <h3 className='text-xl font-semibold mb-2'>Interactive Design</h3>
            <p className='text-gray-300'>
              Drag and drop elements with intuitive touch controls and gestures
            </p>
          </div>

          <div className='bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all'>
            <div className='bg-gradient-to-br from-purple-500 to-pink-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4'>
              <Activity className='h-6 w-6 text-white' />
            </div>
            <h3 className='text-xl font-semibold mb-2'>
              Multiple Diagram Types
            </h3>
            <p className='text-gray-300'>
              Support for all standard UML diagram types with specialized
              elements
            </p>
          </div>

          <div className='bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all'>
            <div className='bg-gradient-to-br from-pink-500 to-orange-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4'>
              <Github className='h-6 w-6 text-white' />
            </div>
            <h3 className='text-xl font-semibold mb-2'>Local Storage</h3>
            <p className='text-gray-300'>
              Automatically save your diagrams locally for easy access later
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className='text-center'
        >
          <Button
            onClick={onStart}
            size='lg'
            className='bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white px-8 py-6 rounded-full text-xl font-medium transition-all hover:scale-105 shadow-lg'
          >
            Start Designing
            <ArrowRight className='ml-2 h-5 w-5' />
          </Button>
          <p className='mt-4 text-gray-400'>
            No account required. Your diagrams are saved locally.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

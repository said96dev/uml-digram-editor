'use client'

import type React from 'react'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      // Success
      setSubmitStatus({
        type: 'success',
        message: "Your message has been sent! We'll get back to you soon.",
      })

      // Clear the form
      setName('')
      setEmail('')
      setMessage('')
    } catch (error) {
      console.error('Error sending message:', error)
      setSubmitStatus({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Failed to send message. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-5'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true, margin: '-50px' }}
      >
        <label className='block text-slate-300 mb-2 text-sm'>Name</label>
        <div className='relative'>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors'
            placeholder='Your name'
            required
          />
          <div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-indigo-500/50 to-transparent'></div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true, margin: '-50px' }}
      >
        <label className='block text-slate-300 mb-2 text-sm'>Email</label>
        <div className='relative'>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors'
            placeholder='Your email'
            required
          />
          <div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-indigo-500/50 to-transparent'></div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true, margin: '-50px' }}
      >
        <label className='block text-slate-300 mb-2 text-sm'>Message</label>
        <div className='relative'>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className='w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors min-h-[120px]'
            placeholder='Your message'
            required
          ></textarea>
          <div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-indigo-500/50 to-transparent'></div>
        </div>
      </motion.div>

      {submitStatus.type && (
        <div
          className={`p-3 rounded-lg text-sm ${
            submitStatus.type === 'success'
              ? 'bg-green-900/30 text-green-300 border border-green-800'
              : 'bg-red-900/30 text-red-300 border border-red-800'
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        viewport={{ once: true, margin: '-50px' }}
        className='pt-4'
      >
        <button
          type='submit'
          disabled={isSubmitting}
          className='w-full px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium hover:from-indigo-500 hover:to-violet-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center'
        >
          {isSubmitting ? (
            <>
              <Loader2 className='h-4 w-4 mr-2 animate-spin' />
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </motion.div>
    </form>
  )
}

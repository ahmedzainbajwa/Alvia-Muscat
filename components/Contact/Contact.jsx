'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Button from '../Button/Button'
import styles from './Contact.module.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: '', message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus({ type: 'success', message: 'Thank you! We will contact you soon.' })
        setFormData({ name: '', email: '', phone: '', message: '' })
      } else {
        setStatus({ type: 'error', message: 'Something went wrong. Please try again.' })
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className={styles.content}
        >
          {/* Left Column - Logo & Contact Info */}
          <div className={styles.leftColumn}>
            <div className={styles.logoWrapper}>
              <Image 
                src="/assets/hero/logo.png" 
                alt="Alvia Logo" 
                width={160} 
                height={80}
              />
            </div>
            
            <div className={styles.contactInfo}>
              <h4 className={styles.contactHeading}>Contact Us At</h4>
              <div className={styles.contactItem}>
                <div className={styles.icon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <span>+96924442682</span>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className={styles.rightColumn}>
            <h3 className={styles.heading}>Get in Touch</h3>
            <p className={styles.subtitle}>
              Ready to start your journey with ALVIA? We'd love to hear from you
            </p>
            
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className={styles.input}
                  required
                  aria-label="Your Name"
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className={styles.input}
                    required
                    aria-label="Email Address"
                  />
                </div>

                <div className={styles.formGroup}>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className={styles.input}
                    required
                    aria-label="Phone Number"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  className={styles.textarea}
                  rows="5"
                  required
                  aria-label="Your Message"
                />
              </div>

              {status.message && (
                <div className={`${styles.status} ${styles[status.type]}`}>
                  {status.message}
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="large"
                disabled={loading}
                ariaLabel="Submit Contact Form"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Button from '../Button/Button'
import CallModal from '../CallModal/CallModal'
import CustomCountrySelect from '../CustomCountrySelect/CustomCountrySelect'
import styles from './Contact.module.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+968',
    phone: '',
    message: ''
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [isCallModalOpen, setIsCallModalOpen] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })

  // Detect mobile device
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 767
  }

  // Handle Contact Us button click
  const handleContactUsClick = () => {
    if (isMobile()) {
      // On mobile: directly open phone dialer
      window.location.href = 'tel:+96924442682'
    } else {
      // On desktop: open modal
      setIsCallModalOpen(true)
    }
  }

  // Country codes for phone input - All countries
  const countryCodes = [
    { code: '+968', name: 'Oman', flag: '🇴🇲' },
    { code: '+971', name: 'UAE', flag: '🇦🇪' },
    { code: '+966', name: 'Saudi Arabia', flag: '🇸🇦' },
    { code: '+974', name: 'Qatar', flag: '🇶🇦' },
    { code: '+965', name: 'Kuwait', flag: '🇰🇼' },
    { code: '+973', name: 'Bahrain', flag: '🇧🇭' },
    { code: '+1', name: 'United States', flag: '🇺🇸' },
    { code: '+1', name: 'Canada', flag: '🇨🇦' },
    { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
    { code: '+33', name: 'France', flag: '🇫🇷' },
    { code: '+49', name: 'Germany', flag: '🇩🇪' },
    { code: '+39', name: 'Italy', flag: '🇮🇹' },
    { code: '+34', name: 'Spain', flag: '🇪🇸' },
    { code: '+31', name: 'Netherlands', flag: '🇳🇱' },
    { code: '+32', name: 'Belgium', flag: '🇧🇪' },
    { code: '+41', name: 'Switzerland', flag: '🇨🇭' },
    { code: '+43', name: 'Austria', flag: '🇦🇹' },
    { code: '+46', name: 'Sweden', flag: '🇸🇪' },
    { code: '+47', name: 'Norway', flag: '🇳🇴' },
    { code: '+45', name: 'Denmark', flag: '🇩🇰' },
    { code: '+358', name: 'Finland', flag: '🇫🇮' },
    { code: '+353', name: 'Ireland', flag: '🇮🇪' },
    { code: '+351', name: 'Portugal', flag: '🇵🇹' },
    { code: '+30', name: 'Greece', flag: '🇬🇷' },
    { code: '+48', name: 'Poland', flag: '🇵🇱' },
    { code: '+420', name: 'Czech Republic', flag: '🇨🇿' },
    { code: '+36', name: 'Hungary', flag: '🇭🇺' },
    { code: '+40', name: 'Romania', flag: '🇷🇴' },
    { code: '+7', name: 'Russia', flag: '🇷🇺' },
    { code: '+86', name: 'China', flag: '🇨🇳' },
    { code: '+81', name: 'Japan', flag: '🇯🇵' },
    { code: '+82', name: 'South Korea', flag: '🇰🇷' },
    { code: '+65', name: 'Singapore', flag: '🇸🇬' },
    { code: '+60', name: 'Malaysia', flag: '🇲🇾' },
    { code: '+66', name: 'Thailand', flag: '🇹🇭' },
    { code: '+62', name: 'Indonesia', flag: '🇮🇩' },
    { code: '+91', name: 'India', flag: '🇮🇳' },
    { code: '+92', name: 'Pakistan', flag: '🇵🇰' },
    { code: '+880', name: 'Bangladesh', flag: '🇧🇩' },
    { code: '+94', name: 'Sri Lanka', flag: '🇱🇰' },
    { code: '+61', name: 'Australia', flag: '🇦🇺' },
    { code: '+64', name: 'New Zealand', flag: '🇳🇿' },
    { code: '+27', name: 'South Africa', flag: '🇿🇦' },
    { code: '+20', name: 'Egypt', flag: '🇪🇬' },
    { code: '+212', name: 'Morocco', flag: '🇲🇦' },
    { code: '+213', name: 'Algeria', flag: '🇩🇿' },
    { code: '+216', name: 'Tunisia', flag: '🇹🇳' },
    { code: '+961', name: 'Lebanon', flag: '🇱🇧' },
    { code: '+962', name: 'Jordan', flag: '🇯🇴' },
    { code: '+963', name: 'Syria', flag: '🇸🇾' },
    { code: '+964', name: 'Iraq', flag: '🇮🇶' },
    { code: '+972', name: 'Israel', flag: '🇮🇱' },
    { code: '+90', name: 'Turkey', flag: '🇹🇷' }
  ]

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

  const handleCountryCodeChange = (e) => {
    setFormData({
      ...formData,
      countryCode: e.target.value
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
        body: JSON.stringify({
          ...formData,
          phone: `${formData.countryCode} ${formData.phone}`
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        const successMsg = 'Your form has been submitted Successfully. You will soon be contacted by an agent for further discussions.'
        setStatus({ type: 'success', message: successMsg })
        setSnackbar({ open: true, message: successMsg })
        setFormData({ name: '', email: '', countryCode: '+968', phone: '', message: '' })
        setTimeout(() => setSnackbar({ open: false, message: '' }), 3500)
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
                  <div className={styles.phoneInputGroup}>
                    <CustomCountrySelect
                      countryCodes={countryCodes}
                      value={formData.countryCode}
                      onChange={(e) => handleCountryCodeChange(e)}
                      className={styles.countryCodeSelect}
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className={styles.phoneInput}
                      required
                      aria-label="Phone Number"
                    />
                  </div>
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

              <div className={styles.buttonsRow}>
                <Button
                  type="submit"
                  variant="primary"
                  size="large"
                  disabled={loading}
                  ariaLabel="Submit Contact Form"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>

                <Button
                  type="button"
                  variant="primary"
                  size="large"
                  onClick={handleContactUsClick}
                  ariaLabel="Contact Us"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginRight: 8 }}
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Contact Us
                </Button>
              </div>
            </form>
            {snackbar.open && (
              <div className={styles.snackbar} role="status" aria-live="polite">{snackbar.message}</div>
            )}
          </div>
        </motion.div>
      </div>
      <CallModal isOpen={isCallModalOpen} onClose={() => setIsCallModalOpen(false)} />
    </section>
  )
}


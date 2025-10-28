'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import styles from './Hero.module.css'
import Button from '../Button/Button'
import BrochureModal from './BrochureModal'

export default function Hero({ data }) {
  const [unitsCount, setUnitsCount] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Animated counter for units with easing
  useEffect(() => {
    const targetValue = parseInt(data.units) || 200
    const duration = 3500 // 3.5 seconds for smoother animation
    const frameRate = 60 // 60fps for smoothness
    const totalFrames = (duration / 1000) * frameRate
    const startTime = Date.now()
    
    const easeOutQuart = (x) => {
      return 1 - Math.pow(1 - x, 4)
    }
    
    const animate = () => {
      const currentTime = Date.now()
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Apply easing function
      const easedProgress = easeOutQuart(progress)
      const currentValue = Math.floor(easedProgress * targetValue)
      
      setUnitsCount(currentValue)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setUnitsCount(targetValue)
      }
    }
    
    requestAnimationFrame(animate)
  }, [data.units])
  return (
    <section id="hero" className={styles.hero}>
      {/* Background Video */}
      <video
        className={styles.heroVideo}
        src="/assets/hero/alvia-flythrough.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark Overlay */}
      <div className={styles.overlay}></div>

      {/* CSS Particle Layer */}
      <div className={styles.particles}></div>

      {/* Hero Content */}
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      >
        {/* Title */}
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1.2 }}
        >
          <Image 
            src="/assets/hero/logo2.png"
            alt="Alvia"
            width={230}
            height={110}
            className={styles.logo}
            priority
          />
          {data.subtitle}
        </motion.h1>

        {/* Location */}
        <motion.div
          className={styles.locationWrapper}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.1 }}
        >
          <svg 
            className={styles.locationIcon} 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <span className={styles.location}>{data.location}</span>
        </motion.div>

        {/* Property Details */}
        <motion.div
          className={styles.details}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1.1 }}
        >
          <div className={styles.detailRow}>
            <span className={styles.value}>{data.propertyType}</span>
            <span className={styles.label}>Property Type</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.value}>
              {unitsCount}{data.units.includes('+') ? '+' : ''}
            </span>
            <span className={styles.label}>Units</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.value}>{data.propertyStatus}</span>
            <span className={styles.label}>Property Status</span>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className={styles.buttons}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1.1 }}
        >
          <Button 
            variant="primary" 
            size="download"
            onClick={() => setIsModalOpen(true)}
            ariaLabel="Download Brochures"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download Brochures
          </Button>
        </motion.div>
      </motion.div>

      {/* Bottom Gradient for Smooth Transition */}
      <div className={styles.bottomGradient}></div>

      {/* Brochure Modal */}
      <BrochureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}

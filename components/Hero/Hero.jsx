'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import styles from './Hero.module.css'
import Button from '../Button/Button'
import BrochureModal from './BrochureModal'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Hero({ data }) {
  const { t } = useLanguage()
  const [unitsCount, setUnitsCount] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Animated counter for units with easing
  useEffect(() => {
    const targetValue = parseInt(data.units) || 200
    const duration = 1800 // faster stabilization
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
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/assets/hero/Alvia-AnimatedPng.png"
      >
        {/* Prefer modern codec if available; fallback to MP4 */}
        <source src="/assets/hero/alvia-flythrough.vp9.webm" type="video/webm" />
        <source src="/assets/hero/alvia-flythrough.mp4" type="video/mp4" />
      </video>

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
          transition={{ delay: 0, duration: 0.9 }}
        >
          <Image 
            src="/assets/hero/logo2.webp"
            alt="Alvia"
            width={230}
            height={110}
            className={styles.logo}
            priority
          />
          {t('hero.subtitle')}
        </motion.h1>

        {/* Location */}
        <motion.div
          className={styles.locationWrapper}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
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
          <span className={styles.location}>{t('hero.location')}</span>
        </motion.div>

        {/* Property Details */}
        <motion.div
          className={styles.details}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className={styles.detailRow}>
            <span className={styles.value}>{t('hero.propertyType')}</span>
            <span className={styles.label}>{t('hero.propertyTypeLabel')}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.value}>
              {unitsCount}{t('hero.units').includes('+') ? '+' : ''}
            </span>
            <span className={styles.label}>{t('hero.unitsLabel')}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.value}>{t('hero.propertyStatus')}</span>
            <span className={styles.label}>{t('hero.propertyStatusLabel')}</span>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className={styles.buttons}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Button 
            variant="primary" 
            size="download"
            onClick={() => setIsModalOpen(true)}
            ariaLabel={t('hero.downloadBrochures')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            {t('hero.downloadBrochures')}
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

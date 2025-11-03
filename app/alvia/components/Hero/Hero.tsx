'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import styles from './Hero.module.css'
import Button from '../Button/Button'
import BrochureModal from './BrochureModal'
import { useLanguage } from '@/contexts/LanguageContext'

interface HeroData {
  units: string | number;
  title: string;
  subtitle: string;
  location: string;
  propertyType: string;
  propertyStatus: string;
  [key: string]: any;
}

interface HeroProps {
  data: HeroData;
}

export default function Hero({ data }: HeroProps) {
  const { t } = useLanguage()
  const [unitsCount, setUnitsCount] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Animated counter for units with easing
  useEffect(() => {
    const targetValue = parseInt(String(data.units)) || 200
    const duration = 1800 // faster stabilization
    const frameRate = 60 // 60fps for smoothness
    const totalFrames = (duration / 1000) * frameRate
    const startTime = Date.now()
    
    const easeOutQuart = (x: number) => {
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
        {/* Logo */}
        <motion.div
          className={styles.logo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0, duration: 1.2 }}
        >
          <Image 
            src="/assets/hero/logo3.webp" 
            alt="Alvia Logo" 
            width={240} 
            height={96}
            priority
          />
        </motion.div>

        {/* Title - Main Heading */}
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 1.2 }}
        >
          {t('hero.subtitle')}
        </motion.h1>

        {/* Location */}
        <motion.div
          className={styles.locationWrapper}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1.1 }}
        >
          <svg
            className={styles.locationIcon}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
              fill="currentColor"
            />
          </svg>
          <span className={styles.location}>{t('hero.location')}</span>
        </motion.div>

        {/* Property Details Section - Moved after subtitle and location */}
        <motion.div
          className={styles.details}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1.1 }}
        >
          <div className={styles.detailRow}>
            <span className={styles.value}>{t('hero.propertyType')}</span>
            <span className={styles.label}>{t('hero.propertyTypeLabel')}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.value}>{unitsCount}+</span>
            <span className={styles.label}>{t('hero.unitsLabel')}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.value}>{t('hero.propertyStatus')}</span>
            <span className={styles.label}>{t('hero.propertyStatusLabel')}</span>
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className={styles.buttons}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.1 }}
        >
          <Button
            variant="primary"
            size="large"
            onClick={() => setIsModalOpen(true)}
            ariaLabel={t('hero.downloadBrochures')}
          >
            <svg
              className={styles.buttonIcon}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {t('hero.downloadBrochures')}
          </Button>
        </motion.div>
      </motion.div>

      {/* Brochure Modal */}
      <BrochureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}


'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import styles from './AmenitiesSection.module.css'

// Services data using only available icons
const servicesData = [
  {
    id: 1,
    title: "Swimming Pools",
    subtitle: "Alvia Amenities",
    description: "Elegant public and private pools designed for residents to unwind and relax in serene surroundings.",
    icon: "/assets/amenities/pool.webp"
  },
  {
    id: 2,
    title: "Fitness Center",
    subtitle: "Alvia Amenities", 
    description: "State-of-the-art gym facilities equipped with modern equipment for your health and wellness journey.",
    icon: "/assets/amenities/gym.webp"
  },
  {
    id: 3,
    title: "Children's Play Areas",
    subtitle: "Alvia Amenities",
    description: "Safe and engaging play spaces designed to inspire creativity and active play for young residents.",
    icon: "/assets/amenities/playground.webp"
  },
  {
    id: 4,
    title: "Secure Parking",
    subtitle: "Alvia Amenities",
    description: "Modern covered parking facilities for residents and guests with round-the-clock security.",
    icon: "/assets/amenities/parking.webp"
  },
  {
    id: 5,
    title: "24/7 Security",
    subtitle: "Alvia Amenities",
    description: "Advanced surveillance systems and professional security personnel ensuring your peace of mind.",
    icon: "/assets/amenities/security.webp"
  },
  {
    id: 6,
    title: "Retail & Dining",
    subtitle: "Alvia Amenities",
    description: "Shop premium brands and enjoy curated dining experiences right within the Alvia community.",
    icon: "/assets/amenities/retail.webp"
  },
  {
    id: 7,
    title: "Prayer Facilities",
    subtitle: "Alvia Amenities",
    description: "Dedicated spaces for worship and reflection, accommodating the spiritual needs of residents.",
    icon: "/assets/amenities/mosque.webp"
  },
  {
    id: 8,
    title: "Community Center",
    subtitle: "Alvia Amenities",
    description: "Vibrant social hub for gatherings, events, and building connections within the community.",
    icon: "/assets/amenities/community.webp"
  },
  {
    id: 9,
    title: "Maintenance Services",
    subtitle: "Alvia Amenities",
    description: "Professional maintenance team ensuring your home and community remain in pristine condition.",
    icon: "/assets/amenities/maintenance.webp"
  }
]

export default function AmenitiesSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)
  const autoRotateRef = useRef(null)
  const sectionRef = useRef(null)

  const currentService = servicesData[currentIndex]
  
  // Get current width with fallback
  const currentWidth = windowWidth || (typeof window !== 'undefined' ? window.innerWidth : 1920)

  // Track window size changes
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    // Set initial width
    setWindowWidth(window.innerWidth)
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Calculate orbital positions - active item positioned at middle-left (180 degrees)
  const getOrbitalPosition = (index, total) => {
    // Responsive radius based on screen size
    let radius = 470 // Desktop default
    const width = windowWidth || (typeof window !== 'undefined' ? window.innerWidth : 1920)
    
    if (width <= 480) {
      radius = 190 // Extra small mobile
    } else if (width <= 767) {
      radius = 230 // Mobile
    } else if (width <= 1199) {
      radius = 270 // Tablet
    }
    
    // Calculate the offset to rotate the orbit
    // Desktop: active item at middle-left (180 degrees)
    // Mobile/Tablet: active item at left (90 degrees)
    const orbitOffset = width > 1199 
      ? (360 / total) * currentIndex + 180  // Desktop: middle-left
      : (360 / total) * currentIndex + 90   // Mobile/Tablet: left
    // Each item's angle relative to the current active item
    const relativeAngle = (360 / total) * index - orbitOffset
    
    // Desktop: use original positioning (centered)
    if (width > 1199) {
      const x = radius * Math.cos((relativeAngle * Math.PI) / 180)
      const y = radius * Math.sin((relativeAngle * Math.PI) / 180)
      return { x, y, angle: relativeAngle }
    }
    
    // Mobile/Tablet: position thumbnails to match orbital line exactly
    // Orbital line: left: Xpx, translateX(-50%), no top (defaults to 0)
    // Line center: horizontally at Xpx, vertically at (lineHeight / 2)
    const x = radius * Math.cos((relativeAngle * Math.PI) / 180)
    const y = radius * Math.sin((relativeAngle * Math.PI) / 180)
    return { x, y, angle: relativeAngle }
  }

  // Navigation handlers
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % servicesData.length)
    setProgress(0)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 100)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + servicesData.length) % servicesData.length)
    setProgress(0)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 100)
  }

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index)
    setProgress(0)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 100)
  }

  // Progress animation for circular loading
  useEffect(() => {
    if (isPaused) {
      // Cancel any ongoing animation when paused
      return
    }

    const duration = 4000 // 4 seconds for slower, more natural animation
    const startTime = Date.now()
    let animationFrame
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progressValue = Math.min(elapsed / duration, 1)
      setProgress(progressValue)
      
      if (progressValue < 1 && !isPaused) {
        animationFrame = requestAnimationFrame(animate)
      } else if (!isPaused) {
        // Move to next service after completion
        setTimeout(() => {
          if (!isPaused) {
            setCurrentIndex((prev) => (prev + 1) % servicesData.length)
            setProgress(0)
          }
        }, 200)
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [currentIndex, isPaused])

  // Auto-rotation effect - removed empty effect to prevent glitches

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            setIsPaused(true)
          } else {
            setIsPaused(false)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section 
      id="amenities-services" 
      className={styles.amenitiesSection}
      ref={sectionRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={styles.container}>
        {/* Section Header */}
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className={styles.heading}>Amenities & Services</h3>
            <p className={styles.subtitle}>
              Discover the premium amenities and services that enhance your living experience
            </p>
          </motion.div>

        {/* Main Content - Left Text + Right Circular Orbit */}
        <div className={styles.mainContent}>
          {/* Left Side - Content */}
          <div className={styles.contentSection}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className={styles.content}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
              >
                <h4 className={styles.serviceTitle}>{currentService.title}</h4>
                <p className={styles.serviceSubtitle}>{currentService.subtitle}</p>
                <p className={styles.serviceDescription}>{currentService.description}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side - Circular Orbit */}
          <div className={styles.orbitSection}>
            <div className={styles.orbitContainer}>
              {/* Circular orbital line */}
              <div className={styles.orbitalLine}></div>
              
              {/* Fade gradient overlay */}
              <div className={styles.fadeGradient}></div>
              
              {/* Orbital thumbnails */}
              {servicesData.map((service, index) => {
                const pos = getOrbitalPosition(index, servicesData.length)
                const isActive = index === currentIndex
                
                return (
                  <motion.button
                    key={service.id}
                    className={`${styles.orbitalThumbnail} ${isActive ? styles.orbitalThumbnailActive : ''}`}
                    style={{
                      // Desktop: use transform-based positioning (original)
                      // Mobile/Tablet: use absolute positioning to match orbital line
                      ...(currentWidth > 1199 ? {
                        left: '50%',
                        top: '50%',
                        transform: isActive 
                          ? `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px)) scale(1.186)` 
                          : `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`
                      } : {
                        // Position thumbnails to match orbital line
                        // Orbital line: left: Xpx, no top (defaults to 0), translateX(-50%)
                        // Line center: horizontally at Xpx, vertically at (line height / 2)
                        left: `calc(${currentWidth <= 480 ? '190px' : currentWidth <= 767 ? '230px' : '270px'} + ${pos.x}px)`,
                        top: `calc(${currentWidth <= 480 ? '190px' : currentWidth <= 767 ? '230px' : '270px'} + ${pos.y}px + 195px)`,
                        transform: isActive 
                          ? `translate(-50%, -50%) scale(${currentWidth <= 480 ? '1.15' : currentWidth <= 767 ? '1.1' : '1.1'})` 
                          : `translate(-50%, -50%)`
                      })
                    }}
                    onClick={() => handleThumbnailClick(index)}
                    aria-label={`View ${service.title}`}
                    aria-current={isActive}
                    tabIndex={0}
                    transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
                  >
                    {/* Circular progress indicator */}
                    <div className={styles.progressCircle}>
                      <svg className={styles.progressSvg} viewBox="0 0 100 100">
                        <circle
                          className={styles.progressBackground}
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="rgba(0,0,0,0.1)"
                          strokeWidth="2"
                        />
                        <circle
                          className={styles.progressBar}
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="var(--color-primary)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 45}`}
                          strokeDashoffset={`${2 * Math.PI * 45 * (1 - (isActive ? progress : 0))}`}
                          style={{ 
                            transition: isActive ? 'none' : 'stroke-dashoffset 0.3s ease'
                          }}
                        />
                      </svg>
                    </div>
                    
                    {/* Thumbnail content */}
                    <div className={styles.thumbnailContent}>
                      <Image 
                        src={service.icon}
                        alt={service.title}
                        width={130}
                        height={130}
                        className={styles.thumbnailIcon}
                      />
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Navigation Controls - Bottom Left */}
        <div className={styles.paginationControls}>
          <div className={styles.navigationButtons}>
            <button 
              className={styles.navButton}
              onClick={handlePrev}
              aria-label="Previous service"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button 
              className={styles.navButton}
              onClick={handleNext}
              aria-label="Next service"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div className={styles.paginationInfo}>
            <span className={styles.paginationText}>
              {String(currentIndex + 1).padStart(2, '0')} / {String(servicesData.length).padStart(2, '0')}
            </span>
            <div className={styles.progressLine} style={{ '--progress': `${((currentIndex + 1) / servicesData.length) * 100}%` }}></div>
          </div>
        </div>
      </div>
    </section>
  )
}
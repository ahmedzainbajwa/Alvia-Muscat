'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Chip from '../Chip/Chip'
import styles from './Offerings.module.css'
import clsx from 'clsx'

export default function Offerings({ data }) {
  const [activeTab, setActiveTab] = useState('residential')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const carouselRef = useRef(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const currentOfferings = activeTab === 'residential' ? data.residential : data.commercial

  // Reset to first page when switching tabs
  useEffect(() => {
    setCurrentPage(1)
  }, [activeTab])

  // Calculate total pages based on visible cards
  useEffect(() => {
    const calculatePages = () => {
      if (carouselRef.current) {
        const containerWidth = carouselRef.current.offsetWidth
        const cardWidth = 400 + 16 // Updated card width + gap
        const visibleCards = Math.floor(containerWidth / cardWidth)
        const pages = Math.ceil(currentOfferings.length / visibleCards)
        setTotalPages(pages)
      }
    }

    calculatePages()
    window.addEventListener('resize', calculatePages)
    return () => window.removeEventListener('resize', calculatePages)
  }, [currentOfferings.length])

  // Navigation functions
  const scrollToPage = (page) => {
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.offsetWidth
      const cardWidth = 400 + 16 // Updated card width + gap
      const visibleCards = Math.floor(containerWidth / cardWidth)
      const scrollPosition = (page - 1) * visibleCards * cardWidth
      
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      })
    }
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1
      setCurrentPage(newPage) // Update state immediately
      scrollToPage(newPage)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1
      setCurrentPage(newPage) // Update state immediately
      scrollToPage(newPage)
    }
  }

  // Handle scroll to update current page with debouncing
  const handleScroll = () => {
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.offsetWidth
      const cardWidth = 400 + 16 // Updated card width + gap
      const visibleCards = Math.floor(containerWidth / cardWidth)
      const scrollLeft = carouselRef.current.scrollLeft
      const newPage = Math.round(scrollLeft / (visibleCards * cardWidth)) + 1
      const clampedPage = Math.min(Math.max(newPage, 1), totalPages)
      
      // Only update if the page actually changed
      if (clampedPage !== currentPage) {
        setCurrentPage(clampedPage)
      }
    }
  }

  // Scroll handler removed - horizontal scrolling disabled on web
  // Only button navigation is used for web, touch scrolling enabled for mobile

  return (
    <section id="offerings" className={styles.section}>
      <div className={styles.container}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Heading */}
          <h3 className={styles.heading}>Offerings & Virtual Tour</h3>
          <p className={styles.subtitle}>
            Explore our diverse range of residential and commercial properties
          </p>

          {/* Tabs */}
          <div className={styles.tabs}>
            <Chip 
              active={activeTab === 'residential'}
              onClick={() => setActiveTab('residential')}
              ariaLabel="View Residential Offerings"
            >
              Residential
            </Chip>
            <Chip 
              active={activeTab === 'commercial'}
              onClick={() => setActiveTab('commercial')}
              ariaLabel="View Commercial Offerings"
            >
              Commercial
            </Chip>
          </div>

          {/* Carousel */}
          <div className={styles.carouselWrapper}>
            <div 
              className={styles.carousel}
              ref={carouselRef}
            >
              {currentOfferings.map((offering) => (
                <motion.div
                  key={offering.id}
                  className={styles.card}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -4, boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
                >
                  <div className={styles.imageWrapper}>
                    <Image
                      src={offering.image}
                      alt={offering.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 384px"
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <h4 className={styles.cardTitle}>{offering.title}</h4>
                    <p className={styles.cardSubtitle}>{offering.subtitle}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pagination and Navigation Controls */}
          <div className={styles.paginationControls}>
            <div className={styles.paginationInfo}>
              <span className={styles.paginationText}>
                {String(currentPage).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
              </span>
              <div className={styles.progressLine} style={{ '--progress': `${(currentPage / totalPages) * 100}%` }}></div>
            </div>
            <div className={styles.navigationButtons}>
              <button 
                className={styles.navButton}
                onClick={handlePrev}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                className={styles.navButton}
                onClick={handleNext}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* About Alvia */}
          <div className={styles.aboutSection}>
            <h3 className={styles.aboutHeading}>Our Offerings</h3>
            <p className={styles.aboutDescription}>
              Alvia offers over 300 meticulously designed apartments, catering to families and individuals with a variety of layouts and sizes. 
              Our residential units include one-bedroom apartments with elegant living areas, two-bedroom apartments featuring living rooms and maid's rooms, and three-bedroom apartments with private pools. 
              For commercial opportunities, we provide retail outlets built to drive business success, modern office suites designed for the evolving work environment, and restaurant outlets in high foot traffic zones. 
              Each unit is crafted to perfection, boasting luxurious finishes, state-of-the-art air conditioning systems, and panoramic windows with stunning views.
            </p>
          </div>

          {/* 3D Tour */}
          <div className={styles.tourSection}>
            <h4 className={styles.tourHeading}>Explore in 3D</h4>
            <div className={styles.tourContainer}>
              <iframe
                src={data.tourUrl}
                className={styles.tourIframe}
                allowFullScreen
                title="3D Virtual Tour of Alvia"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


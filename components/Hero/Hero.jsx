'use client'

import { motion } from 'framer-motion'
import styles from './Hero.module.css'
import Button from '../Button/Button'

export default function Hero({ data }) {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.container}>
        {/* Left Column - Title */}
        <motion.div 
          className={styles.leftColumn}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className={styles.title}>
            <span className={styles.dash}>-</span> {data.title}
            <br />
            {data.subtitle}
          </h1>
        </motion.div>

        {/* Right Column - Info Block */}
        <motion.div 
          className={styles.rightColumn}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className={styles.infoBlock}>
            <div className={styles.locationWrapper}>
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
              <h3 className={styles.location}>{data.location}</h3>
            </div>
            
            <div className={styles.details}>
              <div className={styles.detailRow}>
                <span className={styles.value}>{data.propertyType}</span>
                <span className={styles.label}>Property Type</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.value}>{data.propertyStatus}</span>
                <span className={styles.label}>Property Status</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.value}>{data.units}</span>
                <span className={styles.label}>Units</span>
              </div>
            </div>

            <div className={styles.about}>
              <p className={styles.aboutText}>{data.heroAbout}</p>
            </div>

            <div className={styles.buttons}>
              <Button 
                variant="primary" 
                size="download"
                href={data.brochures.commercial}
                download
                ariaLabel="Download Commercial Brochure"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Commercial Brochure
              </Button>
              <Button 
                variant="primary" 
                size="download"
                href={data.brochures.residential}
                download
                ariaLabel="Download Residential Brochure"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Residential Brochure
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


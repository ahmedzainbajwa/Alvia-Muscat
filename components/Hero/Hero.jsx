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
            <h3 className={styles.location}>{data.location}</h3>
            
            <div className={styles.details}>
              <div className={styles.detailRow}>
                <span className={styles.label}>Property Type</span>
                <span className={styles.arrow}>→</span>
                <span className={styles.value}>{data.propertyType}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.label}>Property Status</span>
                <span className={styles.arrow}>→</span>
                <span className={styles.value}>{data.propertyStatus}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.label}>Units</span>
                <span className={styles.arrow}>→</span>
                <span className={styles.value}>{data.units}</span>
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
                Commercial Brochure
              </Button>
              <Button 
                variant="primary" 
                size="download"
                href={data.brochures.residential}
                download
                ariaLabel="Download Residential Brochure"
              >
                Residential Brochure
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import styles from './Locality.module.css'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Locality() {
  const { t } = useLanguage()
  
  const connectivityData = [
    {
      time: t('locality.connectivity.mosque.time'),
      destination: t('locality.connectivity.mosque.destination')
    },
    {
      time: t('locality.connectivity.airport.time'),
      destination: t('locality.connectivity.airport.destination')
    },
    {
      time: t('locality.connectivity.expressway.time'),
      destination: t('locality.connectivity.expressway.destination')
    }
  ]
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  })

  return (
    <section id="locality" className={styles.section}>
      <div className={styles.container}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className={styles.heading}>{t('locality.heading')}</h3>
          <p className={styles.subtitle}>
            {t('locality.subtitle')}
          </p>

          {/* Connectivity Info Blocks */}
          <div className={styles.connectivityGrid}>
            {connectivityData.map((item, index) => (
              <div key={index} className={styles.infoBlock}>
                <div className={styles.time}>{item.time}</div>
                <div className={styles.destination}>{item.destination}</div>
              </div>
            ))}
          </div>

          {/* Map Embed */}
          <div className={styles.mapSection}>
            <div className={styles.mapContainer}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.4!2d58.4!3d23.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDM2JzAwLjAiTiA1OMKwMjQnMDAuMCJF!5e0!3m2!1sen!2som!4v1234567890"
                className={styles.mapIframe}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Alvia Location Map"
              />
              <div className={styles.mapOverlay}>
                <a 
                  href="https://maps.app.goo.gl/6ekafdMhVKRCSRNZA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.mapLink}
                  aria-label={t('locality.mapAria')}
                >
                  {t('locality.mapLink')}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import styles from './PropertyDetails.module.css'
import { useLanguage } from '@/contexts/LanguageContext'

export default function PropertyDetails({ data }) {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section id="property-details" className={styles.section}>
      <div className={styles.container}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Property Details */}
          <div className={styles.details}>
            <div className={styles.detailRow}>
              <span className={styles.value}>{data.propertyType}</span>
              <span className={styles.label}>{t('hero.propertyTypeLabel')}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.value}>{data.propertyStatus}</span>
              <span className={styles.label}>{t('hero.propertyStatusLabel')}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.value}>{data.units}</span>
              <span className={styles.label}>{t('hero.unitsLabel')}</span>
            </div>
          </div>

          {/* About Text */}
          <div className={styles.about}>
            <p className={styles.aboutText}>{data.heroAbout}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


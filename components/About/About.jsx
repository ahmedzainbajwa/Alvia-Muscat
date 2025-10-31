'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import styles from './About.module.css'
import { useLanguage } from '@/contexts/LanguageContext'

export default function About({ content }) {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  })

  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className={styles.content}
        >
          {/* Edge-to-edge Image with Overlay */}
          <div className={styles.imageContainer}>
            <Image
              src="/assets/whyinvest/image-1.webp"
              alt="Alvia development"
              fill
              style={{ objectFit: 'cover' }}
              sizes="100vw"
            />
            <div className={styles.gradientOverlay}></div>
            <div className={styles.textOverlay}>
              <h3 className={styles.heading}>{t('about.heading')}</h3>
              <p className={styles.subtitle}>
                {t('about.subtitle')}
              </p>
              <p className={styles.paragraph}>
                <strong>{t('about.vision.title')}</strong> - {t('about.vision.description')}
              </p>
              <p className={styles.paragraph}>
                <strong>{t('about.legacy.title')}</strong> - {t('about.legacy.description')}
              </p>
              <p className={styles.paragraph}>
                <strong>{t('about.innovation.title')}</strong> - {t('about.innovation.description')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Chip from '../Chip/Chip'
import styles from './Offerings.module.css'
import clsx from 'clsx'

export default function Offerings({ data }) {
  const [activeTab, setActiveTab] = useState('residential')
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const currentOfferings = activeTab === 'residential' ? data.residential : data.commercial

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
            <div className={styles.carousel}>
              {currentOfferings.map((offering) => (
                <motion.div
                  key={offering.id}
                  className={clsx(
                    styles.card,
                    offering.heightClass === 'tall' ? styles.tall : styles.short
                  )}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -8, boxShadow: '0 12px 24px rgba(0,0,0,0.15)' }}
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

          {/* Premium Features */}
          <div className={styles.features}>
            <h3 className={styles.featuresHeading}>Premium Features in Every Unit</h3>
            <ul className={styles.featuresList}>
              {data.premiumFeatures.map((feature, index) => (
                <li key={index} className={styles.featureItem}>
                  {feature}
                </li>
              ))}
            </ul>
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


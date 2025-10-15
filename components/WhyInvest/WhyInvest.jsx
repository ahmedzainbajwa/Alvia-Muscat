'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import styles from './WhyInvest.module.css'

const investmentAdvantages = [
  'Prime location in Al Hail, one of Muscat&apos;s fastest-growing districts',
  'High ROI potential with competitive rental yields',
  'Flexible payment plans tailored to investor needs',
  'Freehold ownership opportunities for foreign investors'
]

const investmentHighlights = [
  'Strategic Location',
  'Modern Infrastructure',
  'High Rental Demand',
  'Capital Appreciation',
  'World-Class Amenities'
]

export default function WhyInvest({ images = [] }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  })

  return (
    <section id="whyinvest" className={styles.section}>
      <div className={styles.container}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Top Section */}
          <div className={styles.topSection}>
            <h3 className={styles.heading}>Why Invest?</h3>
            <p className={styles.description}>
              Alvia represents a unique opportunity to invest in one of Muscat&apos;s most promising developments. 
              Situated in the thriving Al Hail district, the project benefits from robust infrastructure, 
              growing demand for quality housing and commercial spaces, and Oman&apos;s favorable investment climate.
            </p>
          </div>

          {/* Image Gallery */}
          <div className={styles.imageGrid}>
            {/* Top full-width image */}
            {images[0] && (
              <div className={styles.imageTop}>
                <Image
                  src={images[0]}
                  alt="Alvia development overview"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
              </div>
            )}
            {/* Bottom two images side by side */}
            <div className={styles.imageBottom}>
              {images[1] && (
                <div className={styles.imageHalf}>
                  <Image
                    src={images[1]}
                    alt="Alvia amenities"
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                </div>
              )}
              {images[2] && (
                <div className={styles.imageHalf}>
                  <Image
                    src={images[2]}
                    alt="Alvia location"
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Key Investment Advantages */}
          <div className={styles.advantages}>
            <h3 className={styles.advantagesHeading}>Key Investment Advantages</h3>
            <ul className={styles.advantagesList}>
              {investmentAdvantages.map((advantage, index) => (
                <li key={index} className={styles.advantageItem}>
                  {advantage}
                </li>
              ))}
            </ul>
          </div>

          {/* Investment Highlights Boxes */}
          <div className={styles.highlights}>
            {investmentHighlights.map((highlight, index) => (
              <div key={index} className={styles.highlightBox}>
                {highlight}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}


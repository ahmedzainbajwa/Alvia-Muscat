'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import styles from './Amenities.module.css'

export default function Amenities({ amenities = [] }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section id="amenities" className={styles.section}>
      <div className={styles.container}>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className={styles.content}
        >
          {/* Left Column - Heading */}
          <div className={styles.leftColumn}>
            <motion.h3 variants={itemVariants} className={styles.heading}>
              Amenities & Services
            </motion.h3>
            <motion.div variants={itemVariants} className={styles.accent}>
              <p className={styles.accentText}>Designed for Modern Living</p>
              <p className={styles.subtext}>
                Experience a lifestyle of comfort and convenience
              </p>
            </motion.div>
          </div>

          {/* Right Column - Amenities Grid */}
          <motion.div variants={itemVariants} className={styles.rightColumn}>
            <div className={styles.grid}>
              {amenities.map((amenity, index) => (
                <div 
                  key={amenity.id} 
                  className={styles.amenityRow}
                  style={{ 
                    borderTop: index === 0 || index === 1 ? 'none' : `1px solid var(--color-grey-border)`
                  }}
                >
                  <div className={styles.iconWrapper}>
                    <Image 
                      src={amenity.icon} 
                      alt={amenity.name}
                      width={24}
                      height={24}
                    />
                  </div>
                  <span className={styles.amenityName}>{amenity.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}


'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import styles from './About.module.css'

export default function About({ content }) {
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
              src="/assets/whyinvest/image-1.jpg"
              alt="Alvia development"
              fill
              style={{ objectFit: 'cover' }}
              sizes="100vw"
            />
            <div className={styles.gradientOverlay}></div>
            <div className={styles.textOverlay}>
              <h3 className={styles.heading}>About Us</h3>
              <p className={styles.subtitle}>
                Learn about our vision and commitment to Oman's future
              </p>
              <p className={styles.paragraph}>
                <strong>Oman&apos;s Vision 2040</strong> - We align with Oman's Vision 2040, 
                creating distinctive investment opportunities and contributing to making Oman 
                an ideal place to live, work, and explore.
              </p>
              <p className={styles.paragraph}>
                <strong>Legacy of Excellence</strong> - Founded in 2019, Sohar Real Estate 
                Development builds on two decades of experience, establishing quality and 
                sustainability through visionary concepts.
              </p>
              <p className={styles.paragraph}>
                <strong>Modern Innovation</strong> - We create innovative, accessible projects 
                that maximize investment returns while responding to Oman's evolving real estate 
                market aspirations.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


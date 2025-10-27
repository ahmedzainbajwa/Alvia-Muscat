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
                <strong>Oman&apos;s Vision 2040 and Our Commitment</strong> - We are deeply aligned with 
                Oman's Vision 2040, positioning the Sultanate as a dynamic global destination with distinctive 
                investment opportunities. Through our projects, we actively contribute to making Oman an ideal 
                place to live, work, and explore.
              </p>
              <p className={styles.paragraph}>
                <strong>A Legacy of Excellence</strong> - Founded in 2019, Sohar Real Estate Development builds 
                on more than two decades of experience. By blending visionary concepts with meticulous execution, 
                we have established a strong reputation for quality and sustainability.
              </p>
              <p className={styles.paragraph}>
                <strong>Innovation for the Modern Market</strong> - We respond directly to the evolving aspirations 
                of Oman's real estate market. Our mission is to create projects that are innovative, accessible, 
                and competitively priced while maximizing investment returns for today's buyers.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


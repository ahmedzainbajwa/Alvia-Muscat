'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
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
          {/* Left Column */}
          <div className={styles.leftColumn}>
            <h3 className={styles.heading}>About Us</h3>
            <p className={styles.paragraph}>
              <strong>Oman&apos;s Vision 2040</strong> lays the foundation for sustainable economic growth, 
              social development, and environmental stewardship, with the real estate sector serving 
              as a cornerstone of this ambitious framework. The initiative seeks to diversify the economy 
              by reducing dependency on oil revenues while fostering innovation, infrastructure development, 
              and community well-being.
            </p>
          </div>

          {/* Right Column */}
          <div className={styles.rightColumn}>
            <div className={styles.block}>
              <h4 className={styles.subheading}>A Legacy of Excellence</h4>
              <p className={styles.paragraph}>
                With over two decades of expertise, we have established ourselves as a trusted name in 
                Oman&apos;s real estate sector. Our portfolio includes prestigious residential complexes, 
                commercial hubs, and mixed-use developments that redefine urban living. We pride ourselves 
                on creating spaces that not only meet contemporary needs but also anticipate future demands, 
                blending timeless design with cutting-edge functionality.
              </p>
            </div>

            <div className={styles.block}>
              <h4 className={styles.subheading}>Innovation for the Modern Market</h4>
              <p className={styles.paragraph}>
                Understanding the evolving expectations of today&apos;s buyers and investors, we integrate 
                smart technologies, sustainable building practices, and customer-centric design principles 
                into every project. From energy-efficient systems to thoughtfully curated amenities, our 
                developments are engineered to enhance quality of life while delivering long-term value.
              </p>
            </div>

            <div className={styles.block}>
              <h4 className={styles.subheading}>Our Strategic Objectives</h4>
              <ul className={styles.list}>
                <li><strong>Economic Contribution:</strong> Driving local economic growth by creating jobs, 
                supporting local businesses, and attracting foreign investment.</li>
                <li><strong>Sustainable Development:</strong> Embracing green building standards and 
                environmentally responsible practices to minimize ecological impact.</li>
                <li><strong>Community Building:</strong> Designing vibrant neighborhoods that foster social 
                interaction, cultural enrichment, and a strong sense of belonging.</li>
                <li><strong>Innovation Leadership:</strong> Pioneering new construction methodologies, 
                leveraging digital tools, and setting industry benchmarks for excellence.</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import styles from './WhyInvest.module.css'

const advantageCards = [
  {
    id: 1,
    title: 'Retail Sector Development',
    description: 'Driving growth and sophistication across Oman\'s retail landscape.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2-2z"/>
        <path d="M8 21v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4"/>
        <path d="M12 3v18"/>
      </svg>
    ),
    color: '#3B82F6'
  },
  {
    id: 2,
    title: 'Enhanced Investment Opportunities',
    description: 'Creating attractive new avenues for local and international investors.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 3v18h18"/>
        <path d="M18.5 9.5l-5 5-2-2-5 5"/>
        <path d="M21 3l-6 6"/>
        <path d="M21 3v6h-6"/>
      </svg>
    ),
    color: '#10B981'
  },
  {
    id: 3,
    title: 'Job Creation',
    description: 'Generating valuable employment opportunities for Omani citizens.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    color: '#F59E0B'
  },
  {
    id: 4,
    title: 'Tourism Growth',
    description: 'Contributing to the expansion and vibrancy of Oman\'s tourism sector.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    color: '#8B5CF6'
  }
]

const investmentChips = [
  'Strategic, high-growth location',
  'Over 15% investment return potential',
  '3 years of centralized management',
  'Zero maintenance fees for the first year',
  'Up to 3 years Flexible payment plans',
  'Competitive pricing starting from 32K OMR'
]

export default function WhyInvest({ image }) {
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
            <p className={styles.subtitle}>
              Discover the strategic advantages that make ALVIA the perfect investment choice
            </p>
          </div>

          {/* Desktop Layout - Two-Column with Cards Left, Image Right */}
          <div className={styles.mainLayout}>
            {/* Left Column - Heading, Subtitle, and Advantage Cards */}
            <div className={styles.leftColumn}>
              <h5 className={styles.advantagesHeading}>Economic Impact</h5>
              <p className={styles.advantagesDescription}>
                Choose the plan that fits your lifestyle and investment goals. Flexible payment options designed for your financial comfort.
              </p>
              <div className={styles.advantageCards}>
                {advantageCards.map((card) => (
                  <div key={card.id} className={styles.advantageCard}>
                    <div className={styles.cardIcon} style={{ color: card.color }}>
                      {card.icon}
                    </div>
                    <div className={styles.cardContent}>
                      <h6 className={styles.cardTitle}>{card.title}</h6>
                      <p className={styles.cardDescription}>{card.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Large Image */}
            <div className={styles.rightColumn}>
              {image && (
                <div className={styles.imageContainer}>
                  <Image
                    src={image}
                    alt="Alvia development villa and lifestyle"
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                </div>
              )}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  )
}

// Second Section Component
export function WhyChooseAlvia1({ image }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  })

  const advantageCards2 = [
    {
      id: 1,
      title: 'Strategic, high-growth location',
      description: 'Located in the thriving Al Hail district with exceptional connectivity.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      color: '#3B82F6'
    },
    {
      id: 2,
      title: 'Over 15% investment return potential',
      description: 'High ROI potential with competitive rental yields in a growing market.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 12l2 2 4-4"/>
          <path d="M12 2v4"/>
          <path d="M12 18v4"/>
          <path d="M2 12h4"/>
          <path d="M18 12h4"/>
        </svg>
      ),
      color: '#10B981'
    },
    {
      id: 3,
      title: '3 years of centralized management',
      description: 'Professional property management ensuring optimal returns.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      ),
      color: '#F59E0B'
    },
    {
      id: 4,
      title: 'Zero maintenance fees for the first year',
      description: 'Enjoy your investment without any maintenance costs.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 12l2 2 4-4"/>
        </svg>
      ),
      color: '#8B5CF6'
    }
  ]

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Main Two-Column Layout - Image Left, Cards Right */}
          <div className={styles.mainLayoutReversed}>
            {/* Left Column - Large Image */}
            <div className={styles.leftColumn}>
              {image && (
                <div className={styles.imageContainer}>
                  <Image
                    src={image}
                    alt="Alvia development and lifestyle"
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                </div>
              )}
            </div>

                {/* Right Column - Heading, Subtitle, and Advantage Cards */}
                <div className={styles.rightColumn}>
                  <h5 className={styles.advantagesHeading}>Why Choose Alvia</h5>
                  <p className={styles.advantagesDescription}>
                    Discover the unique advantages that make Alvia the perfect choice for your investment and lifestyle needs.
                  </p>
              <div className={styles.advantageCards}>
                {advantageCards2.map((card) => (
                  <div key={card.id} className={styles.advantageCard}>
                    <div className={styles.cardIcon} style={{ color: card.color }}>
                      {card.icon}
                    </div>
                    <div className={styles.cardContent}>
                      <h6 className={styles.cardTitle}>{card.title}</h6>
                      <p className={styles.cardDescription}>{card.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Third Section Component
export function WhyChooseAlvia2({ image }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  })

  const advantageCards3 = [
    {
      id: 1,
      title: 'Up to 3 years Flexible payment plans',
      description: 'Choose from flexible payment options designed to fit your financial comfort.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
          <line x1="1" y1="10" x2="23" y2="10"/>
        </svg>
      ),
      color: '#3B82F6'
    },
    {
      id: 2,
      title: 'Competitive pricing starting from 32K OMR',
      description: 'Affordable entry point with exceptional value in Muscat\'s most promising developments.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="1" x2="12" y2="23"/>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ),
      color: '#10B981'
    },
    {
      id: 3,
      title: 'Luxury housing, business, and entertainment',
      description: 'A comprehensive real estate product combining luxury living with business opportunities.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9,22 9,12 15,12 15,22"/>
        </svg>
      ),
      color: '#F59E0B'
    },
    {
      id: 4,
      title: 'Smart design that meets future needs',
      description: 'Innovative architecture and planning designed to meet the evolving demands of modern living.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
        </svg>
      ),
      color: '#8B5CF6'
    }
  ]

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Desktop Layout - Two-Column with Cards Left, Image Right */}
          <div className={styles.mainLayout}>
            {/* Left Column - Heading, Subtitle, and Advantage Cards */}
            <div className={styles.leftColumn}>
              <h5 className={styles.advantagesHeading}>Investment Benefits</h5>
              <p className={styles.advantagesDescription}>
                Experience the perfect blend of luxury, convenience, and investment potential in one exceptional development.
              </p>
              <div className={styles.advantageCards}>
                {advantageCards3.map((card) => (
                  <div key={card.id} className={styles.advantageCard}>
                    <div className={styles.cardIcon} style={{ color: card.color }}>
                      {card.icon}
                    </div>
                    <div className={styles.cardContent}>
                      <h6 className={styles.cardTitle}>{card.title}</h6>
                      <p className={styles.cardDescription}>{card.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Large Image */}
            <div className={styles.rightColumn}>
              {image && (
                <div className={styles.imageContainer}>
                  <Image
                    src={image}
                    alt="Alvia luxury development and amenities"
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Button from '../Button/Button'
import styles from './PaymentPlan.module.css'
import { useLanguage } from '@/contexts/LanguageContext'

export default function PaymentPlan({ plans = [] }) {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  })

  return (
    <section id="payment" className={styles.section}>
      <div className={styles.container}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className={styles.heading}>{t('paymentPlan.heading')}</h3>
          <p className={styles.subtitle}>
            {t('paymentPlan.subtitle')}
          </p>

          <div className={styles.planGrid}>
            {plans.map((plan, index) => (
              <div key={index} className={styles.planCard}>
                <div className={styles.planImageWrapper}>
                  <Image
                    src={plan.image}
                    alt={`Payment Plan ${index + 1}`}
                    fill
                    style={{ objectFit: 'contain' }}
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                </div>
                
                <div className={styles.downloadButton}>
                  <Button
                    variant="circular"
                    href={plan.download}
                    download
                    ariaLabel={t('paymentPlan.downloadAria')}
                  >
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}


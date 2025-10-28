'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import styles from './CallModal.module.css'

export default function CallModal({ isOpen, onClose }) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Store current scroll position
      const scrollY = window.scrollY
      // Lock the body
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflowY = 'scroll'

      return () => {
        // Unlock the body when modal closes
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflowY = ''
        // Restore scroll position without scrolling to top first
        window.scrollTo({ top: scrollY, behavior: 'instant' })
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  const phoneNumber = '+96924442682'

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <Image 
            src="/assets/QR/topcover.jpg"
            alt="Header background"
            fill
            className={styles.headerBackground}
            style={{ objectFit: 'cover' }}
          />
          <div className={styles.headerOverlay}></div>
          <div className={styles.headerContent}>
            <div className={styles.headerIconWrapper}>
              <svg 
                className={styles.headerIcon}
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <h2 className={styles.title}>Contact Us</h2>
            
            {/* Close Button */}
            <button className={styles.closeButton} onClick={onClose} aria-label="Close">
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* QR Code */}
          <div className={styles.qrCodeContainer}>
            <Image
              src="/assets/QR/qr-tel-96924442682.png"
              alt="Call Us QR Code"
              width={200}
              height={200}
              className={styles.qrCode}
            />
          </div>

          {/* Instructions */}
          <p className={styles.instructions}>
            Scan this QR code with your phone to call us directly
          </p>

          {/* Phone Number */}
          <a href={`tel:${phoneNumber}`} className={styles.phoneLink}>
            <svg 
              className={styles.phoneIcon}
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {phoneNumber}
          </a>

          {/* Message */}
          <p className={styles.message}>
            We&apos;re here to help. Call us anytime!
          </p>
        </div>
      </div>
    </div>
  )
}


'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import CustomCountrySelect from '../CustomCountrySelect/CustomCountrySelect'
import styles from './BrochureModal.module.css'
import { useLanguage } from '@/contexts/LanguageContext'

export default function BrochureModal({ isOpen, onClose }) {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: '+968',
    phone: ''
  })
  const [loading, setLoading] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  // Carousel images
  const carouselImages = [
    '/assets/brochure-modal/image-1.webp',
    '/assets/brochure-modal/image-2.webp',
    '/assets/brochure-modal/image-3.webp'
  ]

  // Country codes for phone input - All countries
  const countryCodes = [
    { code: '+968', name: 'Oman', flag: '🇴🇲' },
    { code: '+971', name: 'UAE', flag: '🇦🇪' },
    { code: '+966', name: 'Saudi Arabia', flag: '🇸🇦' },
    { code: '+974', name: 'Qatar', flag: '🇶🇦' },
    { code: '+965', name: 'Kuwait', flag: '🇰🇼' },
    { code: '+973', name: 'Bahrain', flag: '🇧🇭' },
    { code: '+1', name: 'United States', flag: '🇺🇸' },
    { code: '+1', name: 'Canada', flag: '🇨🇦' },
    { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
    { code: '+33', name: 'France', flag: '🇫🇷' },
    { code: '+49', name: 'Germany', flag: '🇩🇪' },
    { code: '+39', name: 'Italy', flag: '🇮🇹' },
    { code: '+34', name: 'Spain', flag: '🇪🇸' },
    { code: '+31', name: 'Netherlands', flag: '🇳🇱' },
    { code: '+32', name: 'Belgium', flag: '🇧🇪' },
    { code: '+41', name: 'Switzerland', flag: '🇨🇭' },
    { code: '+43', name: 'Austria', flag: '🇦🇹' },
    { code: '+46', name: 'Sweden', flag: '🇸🇪' },
    { code: '+47', name: 'Norway', flag: '🇳🇴' },
    { code: '+45', name: 'Denmark', flag: '🇩🇰' },
    { code: '+358', name: 'Finland', flag: '🇫🇮' },
    { code: '+353', name: 'Ireland', flag: '🇮🇪' },
    { code: '+351', name: 'Portugal', flag: '🇵🇹' },
    { code: '+30', name: 'Greece', flag: '🇬🇷' },
    { code: '+48', name: 'Poland', flag: '🇵🇱' },
    { code: '+420', name: 'Czech Republic', flag: '🇨🇿' },
    { code: '+36', name: 'Hungary', flag: '🇭🇺' },
    { code: '+40', name: 'Romania', flag: '🇷🇴' },
    { code: '+7', name: 'Russia', flag: '🇷🇺' },
    { code: '+86', name: 'China', flag: '🇨🇳' },
    { code: '+81', name: 'Japan', flag: '🇯🇵' },
    { code: '+82', name: 'South Korea', flag: '🇰🇷' },
    { code: '+65', name: 'Singapore', flag: '🇸🇬' },
    { code: '+60', name: 'Malaysia', flag: '🇲🇾' },
    { code: '+66', name: 'Thailand', flag: '🇹🇭' },
    { code: '+62', name: 'Indonesia', flag: '🇮🇩' },
    { code: '+91', name: 'India', flag: '🇮🇳' },
    { code: '+92', name: 'Pakistan', flag: '🇵🇰' },
    { code: '+880', name: 'Bangladesh', flag: '🇧🇩' },
    { code: '+94', name: 'Sri Lanka', flag: '🇱🇰' },
    { code: '+61', name: 'Australia', flag: '🇦🇺' },
    { code: '+64', name: 'New Zealand', flag: '🇳🇿' },
    { code: '+27', name: 'South Africa', flag: '🇿🇦' },
    { code: '+20', name: 'Egypt', flag: '🇪🇬' },
    { code: '+212', name: 'Morocco', flag: '🇲🇦' },
    { code: '+213', name: 'Algeria', flag: '🇩🇿' },
    { code: '+216', name: 'Tunisia', flag: '🇹🇳' },
    { code: '+961', name: 'Lebanon', flag: '🇱🇧' },
    { code: '+962', name: 'Jordan', flag: '🇯🇴' },
    { code: '+963', name: 'Syria', flag: '🇸🇾' },
    { code: '+964', name: 'Iraq', flag: '🇮🇶' },
    { code: '+972', name: 'Israel', flag: '🇮🇱' },
    { code: '+90', name: 'Turkey', flag: '🇹🇷' },
    { code: '+20', name: 'Egypt', flag: '🇪🇬' }
  ]

  const [isHovering, setIsHovering] = useState(false)

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
        window.scrollTo(0, scrollY)
      }
    }
  }, [isOpen])

  // Auto-advance carousel
  useEffect(() => {
    if (isOpen && !isHovering) {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % carouselImages.length)
      }, 3000) // Change image every 3 seconds

      return () => clearInterval(interval)
    }
  }, [isOpen, isHovering, carouselImages.length])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleCountryCodeChange = (e) => {
    setFormData({
      ...formData,
      countryCode: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Download both brochures
    const commercialLink = document.createElement('a')
    commercialLink.href = '/assets/brochures/commercial-brochure.pdf'
    commercialLink.download = 'Alvia-Commercial-Brochure.pdf'
    commercialLink.click()

    const residentialLink = document.createElement('a')
    residentialLink.href = '/assets/brochures/residential-brochure.pdf'
    residentialLink.download = 'Alvia-Residential-Brochure.pdf'
    residentialLink.click()

    setLoading(false)
    onClose()
    setFormData({ fullName: '', email: '', countryCode: '+968', phone: '' })
  }

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className={styles.closeButton} onClick={onClose} aria-label="Close">
          ×
        </button>

        {/* Left Side - Image Carousel */}
        <div 
          className={styles.leftSection}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className={styles.carouselContainer}>
            <Image
              src={carouselImages[currentImage]}
              alt="Alvia Development"
              fill
              className={styles.carouselImage}
            />
          </div>
          
          {/* Carousel Text Overlay */}
          <div className={styles.carouselText}>
            <p>{t('brochureModal.tagline')}</p>
          </div>

          {/* Carousel Indicators */}
          <div className={styles.carouselIndicators}>
            {carouselImages.map((_, index) => (
              <div
                key={index}
                className={`${styles.indicator} ${index === currentImage ? styles.active : ''}`}
              />
            ))}
          </div>
        </div>

        {/* Right Side - Form */}
        <div className={styles.rightSection}>
          <div className={styles.logoWrapper}>
            <div className={styles.logo}>
              <Image
                src="/assets/hero/logo.webp"
                alt="Alvia Logo"
                width={120}
                height={40}
                className={styles.logoImage}
              />
            </div>
            <div className={styles.logoSeparator}></div>
            <div className={styles.logo}>
              <Image
                src="/assets/hero/logo3.webp"
                alt="Partner Logo"
                width={120}
                height={40}
                className={styles.logoImage}
              />
            </div>
          </div>
          <h2 className={styles.modalHeading}>{t('brochureModal.registerNow')}</h2>
          <p className={styles.modalSubtitle}>{t('brochureModal.registerSubtitle')}</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Full Name */}
            <div className={styles.formGroup}>
              <label htmlFor="fullName" className={styles.label}>
                {t('brochureModal.fullName')} <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder={t('brochureModal.fullNamePlaceholder')}
                className={styles.input}
                required
              />
            </div>

            {/* Email Address */}
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                {t('brochureModal.email')} <span className={styles.required}>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('brochureModal.emailPlaceholder')}
                className={styles.input}
                required
              />
            </div>

            {/* Phone Number with Country Code */}
            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.label}>
                {t('brochureModal.phone')} <span className={styles.required}>*</span>
              </label>
              <div className={styles.phoneInputGroup}>
                <CustomCountrySelect
                  countryCodes={countryCodes}
                  value={formData.countryCode}
                  onChange={(e) => handleCountryCodeChange(e)}
                  className={styles.countryCodeSelect}
                />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t('brochureModal.phonePlaceholder')}
                  className={styles.phoneInput}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? t('brochureModal.downloading') : t('brochureModal.registerAndDownload')}
            </button>

            {/* Terms & Conditions */}
            <p className={styles.terms}>
              {t('brochureModal.termsPrefix')}{' '}
              <a href="#" className={styles.link}>{t('common.terms')}</a> {t('common.and')}{' '}
              <a href="#" className={styles.link}>{t('common.privacy')}</a>.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}


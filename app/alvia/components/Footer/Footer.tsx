'use client'

import Image from 'next/image'
import styles from './Footer.module.css'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { t, language } = useLanguage()

  // Links that change based on language
  const links = {
    helpSupport: {
      en: 'https://help.bayut.om/hc/en-us',
      ar: 'https://help.bayut.om/hc/ar'
    },
    aboutUs: {
      en: 'https://www.bayut.om/en/about/aboutus.html',
      ar: 'https://www.bayut.om/about/aboutus.html'
    },
    termsPrivacy: {
      en: 'https://www.bayut.om/en/terms.html',
      ar: 'https://www.bayut.om/terms.html'
    },
    appStore: {
      en: 'https://apps.apple.com/sa/app/bayut-oman/id6736895230',
      ar: 'https://apps.apple.com/sa/app/bayut-oman/id6736895230'
    },
    googlePlay: {
      en: 'https://play.google.com/store/apps/details?id=com.bayut.bayutoman&pli=1',
      ar: 'https://play.google.com/store/apps/details?id=com.bayut.bayutoman&pli=1'
    }
  }

  const getLink = (key: keyof typeof links) => {
    return links[key][language === 'ar' ? 'ar' : 'en']
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Top Section - Logos */}
        <div className={styles.logosSection}>
          <div className={styles.logoWrapper}>
            <div className={styles.logo}>
              <Image 
                src="/assets/hero/logo.svg" 
                alt="Bayut Logo" 
                width={120} 
                height={40}
              />
            </div>
            <div className={styles.logoSeparator}></div>
            <div className={styles.logo}>
              <Image 
                src="/assets/hero/logo3.webp" 
                alt="Alvia Logo" 
                width={120} 
                height={40}
              />
            </div>
          </div>
        </div>

        {/* Middle Section - Navigation Links */}
        <div className={styles.navSection}>
          <a 
            href={getLink('helpSupport')} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.navLink}
          >
            {t('footer.helpSupport')}
          </a>
          <div className={styles.navSeparator}></div>
          <a 
            href={getLink('aboutUs')} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.navLink}
          >
            {t('footer.aboutUs')}
          </a>
          <div className={styles.navSeparator}></div>
          <a 
            href={getLink('termsPrivacy')} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.navLink}
          >
            {t('footer.termsPrivacy')}
          </a>
        </div>

        {/* Bottom Section - App Download Buttons */}
        <div className={styles.appButtonsSection}>
          <a
            href={getLink('appStore')}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.appButton}
          >
            <Image
              src="/assets/footer/app-store-badge.png"
              alt="Download on the App Store"
              width={120}
              height={40}
              className={styles.appBadge}
            />
          </a>
          
          <a
            href={getLink('googlePlay')}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.appButton}
          >
            <Image
              src="/assets/footer/Google-Playstore.png"
              alt="GET IT ON Google Play"
              width={135}
              height={40}
              className={styles.appBadge}
            />
          </a>
        </div>
      </div>
    </footer>
  )
}

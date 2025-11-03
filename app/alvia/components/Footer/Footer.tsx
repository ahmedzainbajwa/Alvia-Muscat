'use client'

import styles from './Footer.module.css'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.left}>
            <p className={styles.copyright}>
              © {currentYear} {t('footer.copyright')}
            </p>
          </div>

          <div className={styles.right}>
            <a href="#hero" className={styles.link}>{t('footer.privacyPolicy')}</a>
            <a href="#hero" className={styles.link}>{t('footer.termsOfService')}</a>
            <a href="#contact" className={styles.link}>{t('footer.contact')}</a>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.bottom}>
          <p className={styles.tagline}>
            {t('footer.tagline')}
          </p>
        </div>
      </div>
    </footer>
  )
}


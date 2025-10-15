import styles from './Footer.module.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.left}>
            <p className={styles.copyright}>
              © {currentYear} Alvia. All rights reserved.
            </p>
          </div>

          <div className={styles.right}>
            <a href="#hero" className={styles.link}>Privacy Policy</a>
            <a href="#hero" className={styles.link}>Terms of Service</a>
            <a href="#contact" className={styles.link}>Contact</a>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.bottom}>
          <p className={styles.tagline}>
            Developed with excellence · Designed for modern living
          </p>
        </div>
      </div>
    </footer>
  )
}


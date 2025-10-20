'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './Navbar.module.css'
import Button from '../Button/Button'
import clsx from 'clsx'

const navLinks = [
  { id: 'hero', label: 'Overview' },
  { id: 'amenities', label: 'Amenities' },
  { id: 'offerings', label: 'Offerings' },
  { id: 'whyinvest', label: 'Why Invest' },
  { id: 'locality', label: 'Locality' },
  { id: 'payment', label: 'Payment' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Hide/show navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true)
      } else {
        setHidden(false)
      }

      setLastScrollY(currentScrollY)

      // Update active section
      const sections = navLinks.map(link => link.id)
      const uniqueSections = [...new Set(sections)]
      
      // Check for parallax section first (part of Overview)
      const parallaxElement = document.getElementById('parallax')
      if (parallaxElement) {
        const parallaxRect = parallaxElement.getBoundingClientRect()
        if (parallaxRect.top <= 150 && parallaxRect.bottom >= 150) {
          setActiveSection('hero') // Overview covers both hero and parallax
          return
        }
      }
      
      for (const sectionId of uniqueSections.reverse()) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80 // navbar height
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    setMobileMenuOpen(false)
  }

  return (
    <nav className={clsx(styles.navbar, hidden && styles.hidden)}>
      <div className={styles.container}>
        {/* Logos */}
        <div className={styles.logoWrapper}>
          <div className={styles.logo}>
            <Image 
              src="/assets/hero/logo.png" 
              alt="Alvia Logo" 
              width={120} 
              height={40}
              priority
            />
          </div>
          <div className={styles.logoSeparator}></div>
          <div className={styles.logo}>
            <Image 
              src="/assets/hero/logo2.png" 
              alt="Partner Logo" 
              width={120} 
              height={40}
              priority
            />
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className={styles.navLinks}>
          {navLinks.map((link, index) => (
            <button
              key={`${link.id}-${index}`}
              className={clsx(
                styles.navLink,
                activeSection === link.id && styles.active
              )}
              onClick={() => scrollToSection(link.id)}
              aria-label={`Navigate to ${link.label}`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <div className={styles.cta}>
          <Button 
            variant="primary" 
            size="cta"
            onClick={() => scrollToSection('contact')}
            ariaLabel="Contact Us"
          >
            Contact Us
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={styles.hamburger}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className={clsx(styles.bar, mobileMenuOpen && styles.open)}></span>
          <span className={clsx(styles.bar, mobileMenuOpen && styles.open)}></span>
          <span className={clsx(styles.bar, mobileMenuOpen && styles.open)}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map((link, index) => (
            <button
              key={`mobile-${link.id}-${index}`}
              className={clsx(
                styles.mobileNavLink,
                activeSection === link.id && styles.active
              )}
              onClick={() => scrollToSection(link.id)}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}


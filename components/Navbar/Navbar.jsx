'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './Navbar.module.css'
import Button from '../Button/Button'
import BrochureModal from '../Hero/BrochureModal'
import CallModal from '../CallModal/CallModal'
import clsx from 'clsx'

const navLinks = [
  { id: 'hero', label: 'Overview' },
  { id: 'amenities-services', label: 'Amenities' },
  { id: 'offerings', label: 'Offerings' },
  { id: 'whyinvest', label: 'Why Invest' },
  { id: 'locality', label: 'Locality' },
  { id: 'about', label: 'About' },
]

function Navbar({ onRegisterInterest, onCall }) {
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
              src="/assets/hero/logo3.png" 
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

        {/* CTA Buttons */}
        <div className={styles.cta}>
          <Button 
            variant="primary" 
            size="cta"
            onClick={onRegisterInterest}
            ariaLabel="Register Interest"
          >
            Register Interest
          </Button>
          <button 
            className={styles.callButton}
            onClick={onCall}
            aria-label="Call us"
          >
            <svg 
              className={styles.callIcon}
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </button>
          <button 
            className={styles.languageButton}
            onClick={() => console.log('Switch to Arabic')}
            aria-label="Switch to Arabic"
          >
            <svg 
              className={styles.languageIcon}
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M2 12H22" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <Image 
              src="/assets/hero/Arabic.svg" 
              alt="Arabic" 
              width={50} 
              height={20}
              className={styles.arabicText}
            />
          </button>
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

// Wrapper component to handle modal state outside the nav element
export default function NavbarWrapper() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCallModalOpen, setIsCallModalOpen] = useState(false)

  return (
    <>
      <Navbar 
        onRegisterInterest={() => setIsModalOpen(true)} 
        onCall={() => setIsCallModalOpen(true)}
      />
      <BrochureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <CallModal isOpen={isCallModalOpen} onClose={() => setIsCallModalOpen(false)} />
    </>
  )
}


'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { usePathname } from 'next/navigation'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const { t: i18nT, i18n } = useTranslation()
  const pathname = usePathname()
  const [language, setLanguage] = useState('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    // Detect language from URL pathname - default to Arabic, /en for English
    const detectedLanguage = pathname?.startsWith('/en') ? 'en' : 'ar'
    setLanguage(detectedLanguage)
    
    // Sync i18next with detected language
    if (i18n && i18n.language !== detectedLanguage) {
      i18n.changeLanguage(detectedLanguage)
    }
    
    // Update document direction and lang attribute
    document.documentElement.setAttribute('dir', detectedLanguage === 'ar' ? 'rtl' : 'ltr')
    document.documentElement.setAttribute('lang', detectedLanguage)
    
    // Save to localStorage
    localStorage.setItem('alvia-language', detectedLanguage)
  }, [pathname, i18n, mounted])

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en'
    
    // Change i18n language
    if (i18n) {
      i18n.changeLanguage(newLanguage)
    }
    setLanguage(newLanguage)
    
    // Manipulate pathname to add/remove /en prefix
    let newPath = pathname || '/alvia'
    if (newLanguage === 'en') {
      // Switching to English - add /en prefix
      if (!newPath.startsWith('/en')) {
        newPath = `/en${newPath}`
      }
    } else {
      // Switching to Arabic - remove /en prefix (default)
      if (newPath.startsWith('/en')) {
        newPath = newPath.replace('/en', '') || '/alvia'
      }
    }
    
    // Navigate to new URL
    window.location.href = newPath
  }

  // Wrapper function to use i18next's t with same API as before
  const t = (key) => {
    if (!mounted || !i18nT) return key
    try {
      return i18nT(key)
    } catch (error) {
      console.warn(`Translation error for key: ${key}`, error)
      return key
    }
  }

  if (!mounted) {
    // Return default values during SSR - default to Arabic
    return (
      <LanguageContext.Provider value={{ language: 'ar', toggleLanguage, t, isRTL: true }}>
        {children}
      </LanguageContext.Provider>
    )
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, isRTL: language === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}



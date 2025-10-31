'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import enTranslations from '@/locales/en.json'
import arTranslations from '@/locales/ar.json'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en')
  const [translations, setTranslations] = useState(enTranslations)

  useEffect(() => {
    // Load language from localStorage on mount
    const savedLanguage = localStorage.getItem('alvia-language')
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguage(savedLanguage)
      setTranslations(savedLanguage === 'ar' ? arTranslations : enTranslations)
      
      // Set document direction
      document.documentElement.setAttribute('dir', savedLanguage === 'ar' ? 'rtl' : 'ltr')
      document.documentElement.setAttribute('lang', savedLanguage)
    } else {
      // Default to English
      document.documentElement.setAttribute('dir', 'ltr')
      document.documentElement.setAttribute('lang', 'en')
    }
  }, [])

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en'
    setLanguage(newLanguage)
    setTranslations(newLanguage === 'ar' ? arTranslations : enTranslations)
    
    // Save to localStorage
    localStorage.setItem('alvia-language', newLanguage)
    
    // Update document direction and lang attribute
    document.documentElement.setAttribute('dir', newLanguage === 'ar' ? 'rtl' : 'ltr')
    document.documentElement.setAttribute('lang', newLanguage)
  }

  const t = (key) => {
    const keys = key.split('.')
    let value = translations
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        console.warn(`Translation key not found: ${key}`)
        return key
      }
    }
    
    return value
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


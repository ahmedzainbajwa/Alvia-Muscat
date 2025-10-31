'use client'

import { useEffect, useState } from 'react'
import { I18nextProvider } from 'react-i18next'
import { usePathname } from 'next/navigation'
import i18n from '../app/i18n.client'

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [ready, setReady] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Detect language from URL - default to Arabic, /en for English
    const locale = pathname?.startsWith('/en') ? 'en' : 'ar'

    if (i18n.language !== locale) {
      i18n.changeLanguage(locale)
    }

    // Update HTML attributes
    document.documentElement.lang = locale
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'

    setReady(true)
  }, [pathname])

  if (!ready) return null // Prevent SSR/CSR mismatch

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}


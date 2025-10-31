import { ReactNode } from 'react'
import { Manrope, IBM_Plex_Sans_Arabic } from 'next/font/google'
import './alvia/globals.css'
import I18nProvider from '../components/I18nProvider'
import { LanguageProvider } from '@/contexts/LanguageContext'

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['400','600']
})

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-plex-arabic',
  weight: ['400','600']
})

export const metadata = {
  title: 'Alvia - We Redefine Lifestyle | Muscat, Oman',
  description: 'Discover Alvia - a premier residential and commercial development in Al Hail, Muscat. Experience modern living with world-class amenities and strategic investment opportunities.',
  keywords: 'Alvia, Muscat real estate, Oman property, Al Hail, residential, commercial, investment',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${plexArabic.variable}`}>
      <body className={manrope.className}>
        <I18nProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </I18nProvider>
      </body>
    </html>
  )
}


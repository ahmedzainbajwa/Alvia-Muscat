import { Manrope } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
})

export const metadata = {
  title: 'Alvia - We Redefine Lifestyle | Muscat, Oman',
  description: 'Discover Alvia - a premier residential and commercial development in Al Hail, Muscat. Experience modern living with world-class amenities and strategic investment opportunities.',
  keywords: 'Alvia, Muscat real estate, Oman property, Al Hail, residential, commercial, investment',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className={manrope.className}>
        {children}
      </body>
    </html>
  )
}


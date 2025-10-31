// Root page - redirect to /alvia (English version)
import { redirect } from 'next/navigation'

export default function RootPage() {
  redirect('/alvia')
}


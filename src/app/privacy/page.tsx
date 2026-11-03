import LegalPage from '@/components/legal/LegalPage'
import { PRIVACY } from '@/content/privacy'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: PRIVACY.title,
  description: PRIVACY.description,
  alternates: { canonical: '/privacy' },
}

export default function Page() {
  return <LegalPage doc={PRIVACY} />
}

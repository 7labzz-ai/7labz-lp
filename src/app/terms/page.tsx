import LegalPage from '@/components/legal/LegalPage'
import { TERMS } from '@/content/terms'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: TERMS.title,
  description: TERMS.description,
  alternates: { canonical: '/terms' },
}

export default function Page() {
  return <LegalPage doc={TERMS} />
}

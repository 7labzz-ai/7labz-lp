/**
 * Who answers for the site and for Íris, and the shape the legal pages share. The text of each
 * page lives in privacy.ts and terms.ts.
 */

export const COMPANY = {
  name: 'Property 007, Lda.',
  vat: '516158953',
  address: 'Beco Palmira Bastos 2, 2500-296 Caldas da Rainha, Portugal',
  email: 'info@7labz.ai',
}

export const LEGAL_UPDATED = '3 November 2026'

/** A paragraph, or a list when it is an array. */
export type LegalBlock = string | string[]

export type LegalSection = { heading: string; body: LegalBlock[] }

export type LegalDocument = {
  title: string
  description: string
  intro: string
  sections: LegalSection[]
}

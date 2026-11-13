'use client'

import { COPY, type Lang } from '@/content/i18n'
import { createContext, useContext } from 'react'

const LocaleContext = createContext<Lang>('pt')

/** Which language the page is in, set once by the root layout of each language. */
export function LocaleProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return <LocaleContext.Provider value={lang}>{children}</LocaleContext.Provider>
}

export const useLang = () => useContext(LocaleContext)
export const useCopy = () => COPY[useContext(LocaleContext)]

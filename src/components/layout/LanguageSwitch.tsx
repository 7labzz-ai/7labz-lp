'use client'

import { useCopy, useLang } from '@/components/providers/Locale'
import { COPY } from '@/content/i18n'
import type { MouseEvent } from 'react'

import styles from './Nav.module.scss'

/** The section the reader is in: the last one whose top has passed the middle of the screen. */
function currentSection() {
  const middle = window.innerHeight / 2
  let id = ''
  document.querySelectorAll<HTMLElement>('main section[id]').forEach(section => {
    if (section.getBoundingClientRect().top <= middle) id = section.id
  })
  return id
}

/** Flags drawn small and flat, since flag emoji don't show on Windows. */
const FLAGS = {
  pt: (
    <svg viewBox="0 0 30 20" aria-hidden className={styles.flag}>
      <rect width="12" height="20" fill="#046a38" />
      <rect x="12" width="18" height="20" fill="#da291c" />
      <circle cx="12" cy="10" r="4" fill="#ffe900" />
    </svg>
  ),
  en: (
    <svg viewBox="0 0 60 30" aria-hidden className={styles.flag}>
      <clipPath id="flag-uk">
        <path d="M0 0v30h60V0z" />
      </clipPath>
      <g clipPath="url(#flag-uk)">
        <path d="M0 0v30h60V0z" fill="#012169" />
        <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
        <path d="M0 0l60 30m0-30L0 30" stroke="#c8102e" strokeWidth="2" />
        <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
        <path d="M30 0v30M0 15h60" stroke="#c8102e" strokeWidth="6" />
      </g>
    </svg>
  ),
}

/**
 * Goes to the same page in the other language, landing on the section the reader was in.
 * A plain link: each language has its own root layout, so this is a full page load.
 */
export default function LanguageSwitch() {
  const lang = useLang()
  const { switcher } = useCopy()
  const target = lang === 'pt' ? 'en' : 'pt'
  const href = COPY[target].path

  const keepSection = (event: MouseEvent<HTMLAnchorElement>) => {
    const id = currentSection()
    if (id) event.currentTarget.href = `${href}#${id}`
  }

  return (
    <a href={href} hrefLang={switcher.labelLang} className={styles.lang} onClick={keepSection}>
      {FLAGS[target]}
      <span lang={switcher.labelLang}>{switcher.label}</span>
      <span className={styles.srOnly}>{switcher.aria}</span>
    </a>
  )
}

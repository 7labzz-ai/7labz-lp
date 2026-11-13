import { COPY } from '@/content/i18n'
import { monoFont, primaryFont } from '@/lib/fonts'
import type { Metadata } from 'next'

import '@/styles/globals/normalize.scss'
import '@/styles/globals/globals.scss'
import styles from '@/components/legal/LegalPage.module.scss'

const { pt, en } = COPY

export const metadata: Metadata = {
  title: `${pt.notFound.title} | 7labz`,
}

/**
 * Any URL no route matches, in either language. With one root layout per language there's no
 * layout to build a 404 from, so this is a whole document of its own: server-rendered, styled,
 * Portuguese first with the English underneath. Plain links, since it sits outside the app.
 */
export default function GlobalNotFound() {
  return (
    <html lang={pt.htmlLang} className={`${primaryFont.variable} ${monoFont.variable}`}>
      <body>
        <main className={styles.page}>
          <a href={pt.path} className={styles.back}>
            ← {pt.notFound.back}
          </a>
          <h1 className={styles.title}>{pt.notFound.title}</h1>
          <p className={styles.intro}>{pt.notFound.body}</p>
          <div lang={en.htmlLang} className={styles.section}>
            <h2>{en.notFound.title}</h2>
            <p>
              {en.notFound.body}.{' '}
              <a href={en.path} className={styles.inlineLink}>
                {en.notFound.back}
              </a>
            </p>
          </div>
        </main>
      </body>
    </html>
  )
}

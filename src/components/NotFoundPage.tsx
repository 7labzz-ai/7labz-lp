import Footer from '@/components/layout/Footer'
import TransitionLink from '@/components/ui/TransitionLink'
import { COPY, type Lang } from '@/content/i18n'

import styles from './legal/LegalPage.module.scss'

/** The 404, in the legal pages' plain white and indigo, inside the language's own layout. */
export default function NotFoundPage({ lang }: { lang: Lang }) {
  const { notFound, path } = COPY[lang]
  return (
    <>
      <main className={styles.page}>
        {/* Above the title, where the legal pages put their way back. */}
        <TransitionLink href={path} className={styles.back}>
          ← {notFound.back}
        </TransitionLink>
        <h1 className={styles.title}>{notFound.title}</h1>
        <p className={styles.intro}>{notFound.body}</p>
      </main>
      <Footer lang={lang} />
    </>
  )
}

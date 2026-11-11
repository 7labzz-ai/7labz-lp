import Footer from '@/components/layout/Footer'
import TransitionLink from '@/components/ui/TransitionLink'
import { LEGAL_UPDATED, type LegalBlock, type LegalDocument } from '@/content/legal'

import styles from './LegalPage.module.scss'

const Block = ({ block }: { block: LegalBlock }) =>
  Array.isArray(block) ? (
    <ul className={styles.list}>
      {block.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  ) : (
    <p>{block}</p>
  )

/** Privacy and terms: plain reading pages in the FAQ's white and indigo, no motion. */
export default function LegalPage({ doc }: { doc: LegalDocument }) {
  return (
    <>
      <main className={styles.page}>
        <TransitionLink href="/" className={styles.back}>
          ← 7labz
        </TransitionLink>
        <h1 className={styles.title}>{doc.title}</h1>
        <p className={styles.updated}>Last updated {LEGAL_UPDATED}</p>
        <p className={styles.intro}>{doc.intro}</p>
        {doc.sections.map(section => (
          <section key={section.heading} className={styles.section}>
            <h2>{section.heading}</h2>
            {section.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </section>
        ))}
      </main>
      <Footer lang="en" />
    </>
  )
}

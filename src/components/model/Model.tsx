'use client'

import ApplyButton from '@/components/ui/ApplyButton'
import LiveMark from '@/components/ui/LiveMark'
import { revealSection } from '@/lib/reveal'
import { useCopy } from '@/components/providers/Locale'
import { useEffect, useRef } from 'react'

import styles from './Model.module.scss'

// Draft slot numbers: placeholders until they're real.
const SLOTS = 3
const SLOTS_TAKEN = 2

export default function Model() {
  const { model, cta } = useCopy()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    return revealSection(section)
  }, [])

  return (
    <section ref={sectionRef} id="model" className={styles.model}>
      <header className={styles.header}>
        <p className={styles.eyebrow} data-reveal>
          {model.eyebrow}
        </p>
        <h2 className={styles.title} data-reveal-lines>
          {model.line1}
          <br />
          {model.line2}
        </h2>
      </header>

      <ol className={styles.stages}>
        {model.stages.map((stage, i) => (
          <li key={stage.id} className={styles.stage} data-reveal>
            <LiveMark
              mark={stage.id}
              cols={30}
              rows={16}
              fontSize={10}
              enter
              delay={i * 0.15}
              className={styles.mark}
            />
            <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
            <h3 className={styles.stageTitle}>{stage.title}</h3>
            <p className={styles.body}>{stage.body}</p>
          </li>
        ))}
      </ol>

      <div className={styles.availability} data-reveal>
        <div className={styles.slots}>
          <span className={styles.pips} aria-hidden>
            {Array.from({ length: SLOTS }, (_, i) => (
              <span key={i} className={i < SLOTS_TAKEN ? styles.taken : styles.open} />
            ))}
          </span>
          <span>
            {model.quarter}: {model.slots(SLOTS_TAKEN, SLOTS)}
          </span>
        </div>
        <ApplyButton href="#apply" label={cta} tone="gray" pixelated />
      </div>
    </section>
  )
}

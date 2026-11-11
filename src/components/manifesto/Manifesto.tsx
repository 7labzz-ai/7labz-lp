'use client'

import ApplyButton from '@/components/ui/ApplyButton'
import HighlightText from '@/components/ui/HighlightText'
import { gsap, registerGsap } from '@/lib/gsap'
import { revealSection } from '@/lib/reveal'
import { useCopy } from '@/components/providers/Locale'
import { useEffect, useRef } from 'react'

import styles from './Manifesto.module.scss'
import Signatures from './Signatures'
import TeamStrip from './TeamStrip'

/** How far behind the model section the manifesto starts, as a share of the viewport. */
const RISE = 0.3

export default function Manifesto() {
  const { manifesto, cta } = useCopy()
  const sectionRef = useRef<HTMLElement>(null)

  // The manifesto sits tucked up behind the section above and slides out from under it,
  // settling into place as its top reaches the top of the screen.
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    registerGsap()

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        section,
        { y: () => -window.innerHeight * RISE },
        {
          y: 0,
          ease: 'none',
          // Timed off the section above: the manifesto itself is shifted, so measuring
          // it would put the range in the wrong place.
          scrollTrigger: {
            trigger: section.previousElementSibling ?? section,
            start: 'bottom bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      )
    })
    return () => mm.revert()
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    return revealSection(section)
  }, [])

  return (
    <section ref={sectionRef} id="manifesto" className={styles.manifesto}>
      <TeamStrip />
      <div className={styles.inner}>
        <h2 className={styles.title} data-reveal-lines>
          {manifesto.title}
        </h2>

        {manifesto.paragraphs.map(text => (
          <HighlightText key={text.slice(0, 24)} className={styles.paragraph}>
            {text}
          </HighlightText>
        ))}

        <div className={styles.cta}>
          <ApplyButton href="#apply" label={cta} pixelated />
        </div>

        <Signatures />
      </div>
    </section>
  )
}

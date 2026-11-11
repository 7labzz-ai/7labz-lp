import PixelPortrait from '@/components/ui/PixelPortrait'
import RollText from '@/components/ui/RollText'
import TransitionLink from '@/components/ui/TransitionLink'
import { COPY, type Lang } from '@/content/i18n'
import { LOGO_BOUNDS, LOGO_GLYPHS } from '@/lib/logo'

import styles from './Footer.module.scss'

const PAD = 4
const VIEWBOX = `${LOGO_BOUNDS.x - PAD} ${LOGO_BOUNDS.y - PAD} ${LOGO_BOUNDS.width + PAD * 2} ${LOGO_BOUNDS.height + PAD * 2}`

export default function Footer({ lang }: { lang: Lang }) {
  const { nav, footer, path } = COPY[lang]
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <nav aria-label={nav.footer} className={styles.links}>
        {nav.links.map(link => (
          <TransitionLink key={link.href} href={link.href} className={styles.link}>
            <RollText>{link.label}</RollText>
          </TransitionLink>
        ))}
      </nav>

      <div className={styles.brand}>
        {/* The hero's horse again, small, running above the logo. */}
        <PixelPortrait
          className={styles.horse}
          src="/hero/horse.jpg"
          video="/hero/horse-loop.mp4"
          color={[22, 199, 132]}
          fontSize={6}
          topShare={0}
          speed={2}
        />
        <TransitionLink href={path} className={styles.home} aria-label={nav.home}>
          <svg viewBox={VIEWBOX} className={styles.logo} aria-hidden="true">
            {LOGO_GLYPHS.map(glyph => (
              <path key={glyph.id} d={glyph.d} />
            ))}
          </svg>
        </TransitionLink>
      </div>

      <div className={styles.legal}>
        <p>© {year} property7</p>
        <p>{footer.rights}</p>
        <p>
          <TransitionLink href="/privacy" className={styles.legalLink}>
            {footer.privacy}
          </TransitionLink>
          {' · '}
          <TransitionLink href="/terms" className={styles.legalLink}>
            {footer.terms}
          </TransitionLink>
        </p>
      </div>
    </footer>
  )
}

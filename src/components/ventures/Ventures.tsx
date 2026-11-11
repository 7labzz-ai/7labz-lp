'use client'

import { useCopy, useLang } from '@/components/providers/Locale'
import ApplyButton from '@/components/ui/ApplyButton'
import TransitionLink from '@/components/ui/TransitionLink'
import { COMPANY } from '@/content/legal'
import { CONTACT_TYPES, HONEYPOT, type ContactType } from '@/lib/contact'
import { revealSection } from '@/lib/reveal'
import { useEffect, useRef, useState, type FormEvent, type SyntheticEvent } from 'react'

import styles from './Ventures.module.scss'

/** Where people can write if the form fails. [TBC] which inbox the team wants here. */
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || COMPANY.email

type Status = 'idle' | 'sending' | 'sent' | 'error'

type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

export default function Ventures() {
  const lang = useLang()
  const { ventures, form: t } = useCopy()
  const sectionRef = useRef<HTMLElement>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [type, setType] = useState<ContactType | null>(null)
  /** When the form became usable, so a send a split second later can be told apart. */
  const openedAt = useRef(0)

  useEffect(() => {
    openedAt.current = Date.now()
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    return revealSection(section)
  }, [])

  // The browser's own messages come in the browser's language; these follow the page's.
  const explain = (event: SyntheticEvent<HTMLFormElement>) => {
    const field = event.target as Field
    const v = field.validity
    field.setCustomValidity(
      v.valueMissing
        ? field.type === 'radio'
          ? t.pickOne
          : t.required
        : v.typeMismatch && field.type === 'email'
          ? t.invalidEmail
          : '',
    )
  }
  // Cleared as soon as the field changes, or it would stay invalid forever.
  const clear = (event: SyntheticEvent<HTMLFormElement>) => {
    const field = event.target as Field
    const group = field.type === 'radio' ? event.currentTarget.elements.namedItem(field.name) : null
    if (group instanceof RadioNodeList) {
      group.forEach(radio => (radio as HTMLInputElement).setCustomValidity(''))
    } else field.setCustomValidity('')
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = {
      ...Object.fromEntries(new FormData(form)),
      lang,
      elapsed: Date.now() - openedAt.current,
    }
    setStatus('sending')
    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error(String(response.status))
      setStatus('sent')
      form.reset()
      setType(null)
    } catch {
      setStatus('error')
    }
  }

  return (
    <section ref={sectionRef} id="apply" className={styles.ventures}>
      <div className={styles.body}>
        <div className={styles.pitch}>
          <header className={styles.header}>
            <p className={styles.eyebrow} data-reveal>
              {ventures.eyebrow}
            </p>
            <h2 className={styles.title} data-reveal-lines>
              {ventures.title}
            </h2>
          </header>

          <p className={styles.lede} data-reveal>
            {ventures.lede}
          </p>

          <ul className={styles.terms} data-reveal>
            {ventures.terms.map(term => (
              <li key={term}>{term}</li>
            ))}
          </ul>
        </div>

        <form
          className={styles.form}
          onSubmit={submit}
          onInvalidCapture={explain}
          onInputCapture={clear}
          onChangeCapture={clear}
          aria-labelledby="contact-title"
          data-reveal
        >
          <header className={styles.formHead}>
            <h3 id="contact-title" className={styles.formTitle}>
              {t.title}
            </h3>
            <p className={styles.formLede}>{t.lede}</p>
          </header>

          {/* First who's asking; the fields for that case appear once it's picked. */}
          <fieldset className={styles.types}>
            <legend className={styles.label}>{t.type}</legend>
            <div className={styles.typeOptions}>
              {CONTACT_TYPES.map(option => (
                <label key={option} className={styles.typeOption}>
                  <input
                    type="radio"
                    name="type"
                    value={option}
                    required
                    checked={type === option}
                    onChange={() => setType(option)}
                  />
                  <span>{t.types[option]}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {type && (
            <div className={styles.grid}>
              <label className={styles.field}>
                <span className={styles.label}>{t.name}</span>
                <input name="name" type="text" autoComplete="name" maxLength={120} required />
              </label>
              <label className={styles.field}>
                <span className={styles.label}>{t.email}</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={t.emailPlaceholder}
                  maxLength={200}
                  required
                />
              </label>
              <label className={styles.field}>
                <span className={styles.label}>{t.company[type]}</span>
                <input
                  name="company"
                  type="text"
                  autoComplete="organization"
                  maxLength={160}
                  required
                />
              </label>
              <label className={styles.field}>
                <span className={styles.label}>{t.website}</span>
                <input
                  name="website"
                  type="text"
                  inputMode="url"
                  autoComplete="url"
                  maxLength={300}
                />
              </label>

              {type === 'business' && (
                <label className={`${styles.field} ${styles.wide}`}>
                  <span className={styles.label}>{t.phone}</span>
                  <input name="phone" type="tel" autoComplete="tel" maxLength={40} />
                </label>
              )}

              {type !== 'founder' && (
                <label className={`${styles.field} ${styles.wide}`}>
                  <span className={styles.label}>{t.need[type]}</span>
                  <textarea
                    name="need"
                    rows={3}
                    placeholder={t.needPlaceholder[type]}
                    maxLength={4000}
                    required
                  />
                </label>
              )}

              {type === 'founder' && (
                <>
                  <label className={styles.field}>
                    <span className={styles.label}>{t.stage}</span>
                    <select name="stage" defaultValue={t.stages[1]}>
                      {t.stages.map(stage => (
                        <option key={stage}>{stage}</option>
                      ))}
                    </select>
                  </label>
                  <label className={styles.field}>
                    <span className={styles.label}>{t.team}</span>
                    <select name="team" defaultValue={t.teams[0]}>
                      {t.teams.map(size => (
                        <option key={size}>{size}</option>
                      ))}
                    </select>
                  </label>
                  <label className={`${styles.field} ${styles.wide}`}>
                    <span className={styles.label}>{t.building}</span>
                    <textarea name="building" rows={3} maxLength={4000} required />
                  </label>
                  <label className={`${styles.field} ${styles.wide}`}>
                    <span className={styles.label}>{t.ask}</span>
                    <textarea name="ask" rows={2} maxLength={4000} />
                  </label>
                </>
              )}
            </div>
          )}

          {/* Bots fill this; people never see it. */}
          <input
            name={HONEYPOT}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className={styles.trap}
          />

          <div className={styles.submit}>
            <ApplyButton
              label={status === 'sending' ? t.sending : t.send}
              disabled={status === 'sending'}
              tone="gray"
              pixelated
            />
            <p className={styles.note} role="status" data-status={status}>
              {status === 'sent' && t.sent}
              {status === 'error' && t.error(CONTACT_EMAIL)}
              {(status === 'idle' || status === 'sending') && t.note}
            </p>
          </div>
          <p className={styles.privacy}>
            {t.privacy}{' '}
            <TransitionLink href="/privacy" className={styles.privacyLink}>
              {t.privacyLink}
            </TransitionLink>
          </p>
        </form>
      </div>
    </section>
  )
}

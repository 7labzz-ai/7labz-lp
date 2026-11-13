import Faq from '@/components/faq/Faq'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/hero/Hero'
import Manifesto from '@/components/manifesto/Manifesto'
import Model from '@/components/model/Model'
import Services from '@/components/services/Services'
import TimeBack from '@/components/timeback/TimeBack'
import Ventures from '@/components/ventures/Ventures'
import { type Lang } from '@/content/i18n'
import { homeStructuredData } from '@/content/structuredData'

/** The home page, the same in every language; the words come from the locale context. */
export default function HomePage({ lang }: { lang: Lang }) {
  return (
    <>
      <script
        type="application/ld+json"
        // Escaped so the JSON can never close the script tag early.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeStructuredData(lang)).replace(/</g, '\\u003c'),
        }}
      />
      <main>
        <Hero />
        <Model />
        <TimeBack />
        <Services />
        <Manifesto />
        <Faq />
        <Ventures />
      </main>
      <Footer lang={lang} />
    </>
  )
}

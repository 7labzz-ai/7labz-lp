import Nav from '@/components/layout/Nav'
import Preloader from '@/components/preloader/Preloader'
import { LocaleProvider } from '@/components/providers/Locale'
import PageTransition from '@/components/providers/PageTransition'
import SmoothScroll from '@/components/providers/SmoothScroll'
import { COPY, type Lang } from '@/content/i18n'
import { SITE_NAME, SITE_URL } from '@/content/site'
import { monoFont, primaryFont } from '@/lib/fonts'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'

import '@/styles/globals/normalize.scss'
import '@/styles/globals/globals.scss'

/** What every page shares, whatever its language. Pages add their own title and links. */
export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  applicationName: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  category: 'business',
}

/**
 * The home page's metadata in one language: canonical to itself, hreflang to both, and
 * x-default to Portuguese. The share image is listed by hand: with one root layout per
 * language there's none at src/app for Next to attach it from. Icons, manifest, robots and
 * the sitemap still come from files in src/app.
 */
export function homeMetadata(lang: Lang): Metadata {
  const copy = COPY[lang]
  const other = COPY[lang === 'pt' ? 'en' : 'pt']
  const image = { url: '/opengraph-image.png', width: 1200, height: 630, alt: copy.meta.shareAlt }
  return {
    title: { absolute: copy.meta.title },
    description: copy.meta.description,
    alternates: {
      canonical: copy.path,
      languages: { 'pt-PT': COPY.pt.path, en: COPY.en.path, 'x-default': COPY.pt.path },
    },
    openGraph: {
      type: 'website',
      url: copy.path,
      siteName: SITE_NAME,
      title: copy.meta.title,
      description: copy.meta.description,
      locale: copy.ogLocale,
      alternateLocale: other.ogLocale,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.meta.title,
      description: copy.meta.description,
      images: [image],
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
}

/**
 * The document for one language. Each language has its own root layout, so `<html lang>` is
 * right in the static HTML without reading the request.
 */
export default function RootShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={COPY[lang].htmlLang} className={`${primaryFont.variable} ${monoFont.variable}`}>
      <body>
        <Script id="scroll-reset" strategy="beforeInteractive">
          {`if('scrollRestoration' in history){history.scrollRestoration='manual';}window.scrollTo(0,0);`}
        </Script>
        <Script
          defer
          src="https://analytics.7labz.ai/script.js"
          data-website-id="70c06cec-f8db-4958-9bfa-e03b10389df5"
        />
        <LocaleProvider lang={lang}>
          <SmoothScroll>
            <PageTransition aside={<Nav />}>{children}</PageTransition>
            <Preloader />
          </SmoothScroll>
        </LocaleProvider>
      </body>
    </html>
  )
}

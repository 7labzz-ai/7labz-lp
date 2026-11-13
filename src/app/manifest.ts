import { COPY } from '@/content/i18n'
import { SITE_NAME } from '@/content/site'
import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    lang: 'pt-PT',
    name: COPY.pt.meta.title,
    short_name: SITE_NAME,
    description: COPY.pt.meta.description,
    start_url: '/',
    display: 'browser',
    background_color: '#ffffff',
    theme_color: '#2b16a0',
    icons: [
      { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
      { src: '/apple-icon.png', type: 'image/png', sizes: '180x180' },
    ],
  }
}

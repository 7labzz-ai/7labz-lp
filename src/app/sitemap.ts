import { SITE_URL } from '@/content/site'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Both languages of the home page, each listing the other as its alternate.
    ...['', '/en'].map(path => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
      images: [`${SITE_URL}/opengraph-image.png`],
      alternates: { languages: { 'pt-PT': SITE_URL, en: `${SITE_URL}/en` } },
    })),
    ...['/privacy', '/terms'].map(path => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.2,
    })),
  ]
}

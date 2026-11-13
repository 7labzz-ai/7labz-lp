import { COPY, type Lang } from './i18n'
import { SITE_NAME, SITE_URL } from './site'

/**
 * Schema.org graph for the home page: the studio as an organisation and a professional
 * service with its catalogue, the site, and the page. Search engines read it for rich
 * results; AI answer engines read it to say accurately what 7labz is and does. Only facts
 * shown on the page go in here.
 */
export function homeStructuredData(lang: Lang) {
  const { meta, founders, services, faq, htmlLang, path } = COPY[lang]
  const SERVICES = services.list
  const SITE_DESCRIPTION = meta.description
  // The organisation and site are one entity in both languages; the page is per language.
  const org = `${SITE_URL}/#organization`
  const page = `${SITE_URL}${path === '/' ? '' : path}`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': org,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/icon.svg`,
        image: `${SITE_URL}/opengraph-image.png`,
        slogan: meta.slogan,
        description: SITE_DESCRIPTION,
        founder: founders.map(founder => ({
          '@type': 'Person',
          name: founder.name,
          jobTitle: founder.role,
        })),
        knowsAbout: SERVICES.flatMap(service => [service.title, ...service.items]),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: meta.catalog,
          itemListElement: SERVICES.map(service => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: service.title,
              description: service.body,
              provider: { '@id': org },
            },
          })),
        },
        subOrganization: {
          '@type': 'Organization',
          name: '7labz Ventures',
          description: meta.ventures,
          url: `${page}#apply`,
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        publisher: { '@id': org },
        inLanguage: ['pt-PT', 'en'],
      },
      {
        '@type': 'WebPage',
        '@id': `${page}#webpage`,
        url: page,
        name: meta.title,
        description: SITE_DESCRIPTION,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': org },
        primaryImageOfPage: `${SITE_URL}/opengraph-image.png`,
        inLanguage: htmlLang,
      },
      {
        '@type': 'FAQPage',
        '@id': `${page}#faq`,
        url: `${page}#faq`,
        isPartOf: { '@id': `${page}#webpage` },
        about: { '@id': org },
        inLanguage: htmlLang,
        mainEntity: faq.list.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
    ],
  }
}

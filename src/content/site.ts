/**
 * Where the site lives and what it's called. The words, in each language, are in
 * src/content/i18n.
 */

/**
 * The public origin. Set `NEXT_PUBLIC_SITE_URL` once there's a domain; until then Vercel's
 * production URL is used, and localhost in development.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')
).replace(/\/$/, '')

export const SITE_NAME = '7labz'

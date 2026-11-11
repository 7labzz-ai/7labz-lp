import { en, type Copy } from './en'
import { pt } from './pt'

export type Lang = 'pt' | 'en'

/** Portuguese at `/`, English at `/en`. */
export const COPY: Record<Lang, Copy> = { pt, en }

export const LANGS = Object.keys(COPY) as Lang[]

export type { Copy }

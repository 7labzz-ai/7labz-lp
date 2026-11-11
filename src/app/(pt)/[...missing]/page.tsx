import { notFound } from 'next/navigation'

// Any path nothing else matches lands here, so the 404 renders inside this language's own
// root layout (styles, nav, <html lang>) instead of Next's bare default.
export default function Missing() {
  notFound()
}

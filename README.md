# 7labz.ai

The 7labz home page: Next.js (App Router), SCSS modules, GSAP and Lenis.

```bash
pnpm install
pnpm dev                 # http://localhost:3000
pnpm lint && pnpm build
pnpm test:contact        # after pnpm build: the contact form API against a fake CRM and inbox
```

Pushing to `main` deploys to production (`.github/workflows/deploy.yml`). Work on a branch.

## Languages

| URL                  | Language                        | Root layout               |
| -------------------- | ------------------------------- | ------------------------- |
| `/`                  | Portuguese (pt-PT), the default | `src/app/(pt)/layout.tsx` |
| `/en`                | English                         | `src/app/(en)/layout.tsx` |
| `/privacy`, `/terms` | English only                    | `src/app/(en)/layout.tsx` |

Each language has its own root layout, so `<html lang>` is right in the static HTML. Moving
between them is a full page load. Every visible string is in `src/content/i18n/en.ts` and
`pt.ts` (same shape); client components read them with `useCopy()`. Canonical, hreflang
(pt-PT, en, x-default → `/`) and `og:locale` come from `homeMetadata()` in
`src/components/layout/RootShell.tsx`. The language switch keeps the section the reader was in.

## Contact form

Every "Fala connosco" / "Talk to us" button leads to `#apply`, one form for businesses,
startups and founders. `POST /api/apply` (`src/lib/contact.ts`):

- validates the fields for the chosen case, drops the honeypot (`leave_empty`) quietly and
  refuses sends made faster than 1.5 s after the page opened;
- sends to the CRM (`CRM_FORM_URL`) and to an inbox through Resend (`RESEND_*`, `LEADS_*`) at
  the same time;
- answers `ok` only once at least one of them has the request. With neither configured, or both
  down, the page shows an error with the contact email instead of a false success.

Environment variables are listed, with comments, in `.env.example`.

The CRM side expects a JSON endpoint that takes the CRM's public-form field ids (`nome`,
`email`, `telefone`, `empresa`, `mensagem`, `negocio.tipo`). The CRM's public forms are at
`/f/<slug>` and only accept a server action today, so that endpoint has to be added there
before `CRM_FORM_URL` can be set. Until then, email alone works.

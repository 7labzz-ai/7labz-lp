import RootShell, { baseMetadata } from '@/components/layout/RootShell'

export { viewport } from '@/components/layout/RootShell'
export const metadata = baseMetadata

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>
}

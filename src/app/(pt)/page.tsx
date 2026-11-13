import HomePage from '@/components/HomePage'
import { homeMetadata } from '@/components/layout/RootShell'

export const metadata = homeMetadata('pt')

export default function Page() {
  return <HomePage lang="pt" />
}

import HomePage from '@/components/HomePage'
import { homeMetadata } from '@/components/layout/RootShell'

export const metadata = homeMetadata('en')

export default function Page() {
  return <HomePage lang="en" />
}

import { NextUIProvider } from '@nextui-org/react'
import Layout from './Layout'

type Props = {
  children: React.ReactNode
}

export default function Root({ children }: Props) {
  return (
    <NextUIProvider>
      <Layout>{children}</Layout>
    </NextUIProvider>
  )
}

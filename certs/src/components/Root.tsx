import { NextUIProvider } from '@nextui-org/react'
import Content from './Content'
import Footer from './Footer'
import Header from './Header'
import Layout from './Layout'

type Props = {
  children: React.ReactNode
}

export default function Root({ children }: Props) {
  return (
    <NextUIProvider>
      <Layout>
        <Header />
        <Content>{children}</Content>
        <Footer />
      </Layout>
    </NextUIProvider>
  )
}

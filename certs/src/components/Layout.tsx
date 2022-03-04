import Content from './Content'
import Footer from './Footer'
import Header from './Header'


type Props = {
  children: React.ReactNode
  className?: string
}

export default function PageLayout({ children }: Props) {
  return (
    <div style={{ background: '#e6e7ee' }}>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </div>
  )
}

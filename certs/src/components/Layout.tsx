import { Layout } from 'antd'

type Props = {
  children: React.ReactNode
  className?: string
}
export default function PageLayout({ children }: Props) {
  return <Layout className="layout">{children}</Layout>
}

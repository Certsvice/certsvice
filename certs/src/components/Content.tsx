import { Layout, Breadcrumb } from 'antd'

const { Content } = Layout

type Props = {
  children: React.ReactNode
  className?: string
}

export default function PageContent({ children }: Props) {
  return (
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-content">{children}</div>
    </Content>
  )
}

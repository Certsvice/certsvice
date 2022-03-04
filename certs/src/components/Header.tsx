import { Layout, Menu } from 'antd'

const { Header } = Layout

export default function PageHeader() {
  return (
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        {new Array(5).fill(null).map((_, index) => {
          const key = index + 1
          return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>
        })}
      </Menu>
    </Header>
  )
}

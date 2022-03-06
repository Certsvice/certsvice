import { Layout, Menu, Breadcrumb, Typography } from 'antd'
import { useGuardContext } from './GuardRoute'
const { Title } = Typography
const { Header, Content, Footer } = Layout
import { useRouter } from 'next/router'

const LayoutPage: React.FC = ({ children }) => {
  const router = useRouter()
  const { logout } = useGuardContext()
  return (
    <Layout className="layout">
      <Header>
        <div className="flex flex-row items-center justify-center">
          <Title className=" !text-white !mr-auto" onClick={() => router.push('/')}>
            Certsvice BackOffice
          </Title>
          <div className="flex items-center text-base text-white" onClick={logout}>
            <button>ออกจากระบบ</button>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </div>
        </div>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  )
}

export default LayoutPage

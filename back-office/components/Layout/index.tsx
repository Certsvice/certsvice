import { Header } from 'components/Header'

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <div className="bg-white">
        <Header />
      </div>
      <div className="px-0 py-8 mx-auto xl:px-5 2xl:px-10">{children}</div>
    </div>
  )
}

export default Layout

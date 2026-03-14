import Header from './Header'
import Footer from './Footer'
import { useLocation } from 'react-router-dom'
import { CertsRoute } from 'src/consts'

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  const location = useLocation()
  const isResult = location.pathname === CertsRoute.Result

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #4338ca 100%)',
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-3xl" />
      </div>

      <Header showBack={isResult} />

      <main className="flex-1 pt-16 relative z-10">
        {children}
      </main>

      <Footer />
    </div>
  )
}

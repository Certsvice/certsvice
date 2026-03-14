import { useGuardContext } from './GuardRoute'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {
  HomeIcon,
  PlusCircleIcon,
  AcademicCapIcon,
  ArrowUpTrayIcon,
  ArrowRightOnRectangleIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline'

const navOwner = [
  { href: '/', label: 'Registered Wallets', icon: HomeIcon },
  { href: '/register', label: 'Add University', icon: PlusCircleIcon },
]

const navUniversity = [
  { href: '/university', label: 'Certificates', icon: AcademicCapIcon },
  { href: '/university/register', label: 'Upload Certificate', icon: ArrowUpTrayIcon },
]

const LayoutPage: React.FC = ({ children }) => {
  const router = useRouter()
  const { logout } = useGuardContext()
  const isUniversity = router.pathname.startsWith('/university')
  const links = isUniversity ? navUniversity : navOwner

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-slate-900 flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <ShieldCheckIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-tight">Certsvice</p>
              <p className="text-slate-400 text-xs leading-tight">Back Office</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {links.map(({ href, label, icon: Icon }) => {
            const active = router.pathname === href
            return (
              <Link key={href} href={href}>
                <a
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {label}
                </a>
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-slate-700/50">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-100 transition-colors w-full"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5 flex-shrink-0" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 flex-shrink-0">
          <h1
            className="text-slate-900 font-semibold text-lg cursor-pointer"
            onClick={() => router.push(isUniversity ? '/university' : '/')}
          >
            {isUniversity ? 'University Portal' : 'Admin Dashboard'}
          </h1>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default LayoutPage

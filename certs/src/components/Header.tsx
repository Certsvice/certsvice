import { useNavigate } from 'react-router-dom'
import { CertsRoute } from 'src/consts'

type Props = {
  showBack?: boolean
}

export default function Header({ showBack }: Props) {
  const navigate = useNavigate()

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
          {showBack ? (
            <button
              onClick={() => navigate(CertsRoute.Index)}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          ) : (
            <div
              className="flex items-center gap-2.5 cursor-pointer"
              onClick={() => navigate(CertsRoute.Index)}
            >
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-white font-bold text-lg tracking-tight">Certsvice</span>
            </div>
          )}

          <div className="ml-auto">
            <span className="text-white/60 text-xs font-medium bg-white/10 px-3 py-1 rounded-full">
              Blockchain Verified
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

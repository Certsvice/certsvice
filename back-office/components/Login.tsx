import { ShieldCheckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Role } from 'consts'
import { useWeb3 } from 'hooks/useWeb3'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useGuardContext } from './GuardRoute'

export default function Login() {
  const router = useRouter()
  const { login, isAuthorized } = useGuardContext()
  const { getChain, getAccountInject, getOwner, getUniversity, changeChain, getToken, eth } = useWeb3()
  const [connecting, setConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [noMetaMask, setNoMetaMask] = useState(false)

  useEffect(() => {
    if (eth && !eth.isMetaMask) {
      setNoMetaMask(true)
    }
  }, [eth])

  async function handleAuth() {
    setConnecting(true)
    setError(null)
    try {
      const chainId = await getChain()
      const isCorrectChain = chainId === 11155111 || chainId === 31337
      if (!isCorrectChain) {
        await changeChain()
        await handleAuth()
        return
      }
      if (!isAuthorized) {
        const account = await getAccountInject()
        if (account === (await getOwner())) {
          await login(await getToken(Role.OWNER))
          router.push('/')
        } else if (await getUniversity()) {
          await login(await getToken(Role.UNIVERSITY))
          router.push('/university')
        } else {
          setError('This wallet is not registered. Please contact the administrator.')
        }
      }
    } catch (e: any) {
      if (e?.code === 4001) {
        setError('Connection request rejected. Please try again.')
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setConnecting(false)
    }
  }

  if (noMetaMask) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ExclamationTriangleIcon className="w-8 h-8 text-amber-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">MetaMask Required</h2>
          <p className="text-slate-500 text-sm mb-8">
            Please install the MetaMask browser extension to use Certsvice Back Office.
          </p>
          <a
            href="https://metamask.io/download/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-xl transition-colors"
          >
            Install MetaMask
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fadeIn">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
            <ShieldCheckIcon className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-2xl">Certsvice</h1>
            <p className="text-slate-400 text-sm">Back Office</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-slate-900 font-bold text-2xl mb-2">Connect Wallet</h2>
            <p className="text-slate-500 text-sm">
              Sign in with your MetaMask wallet to access the admin dashboard.
            </p>
          </div>

          {/* MetaMask branding */}
          <div className="bg-slate-50 rounded-xl p-6 flex items-center gap-4 mb-8 border border-slate-100">
            <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0 border border-slate-100">
              <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
                <path d="M37.5 2.5L22.5 13.5L25 7.5L37.5 2.5Z" fill="#E2761B" stroke="#E2761B" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2.5 2.5L17.5 13.5L15 7.5L2.5 2.5Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M32 27L28 33L37 35.5L39.5 27.5L32 27Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M0.5 27.5L3 35.5L12 33L8 27L0.5 27.5Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.5 17.5L9 21L18 21.5L17.5 12L11.5 17.5Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M28.5 17.5L22.5 12L22 21.5L31 21L28.5 17.5Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 33L17.5 30L12.5 27.5L12 33Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22.5 30L28 33L27.5 27.5L22.5 30Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="font-semibold text-slate-900 text-sm">MetaMask</p>
              <p className="text-slate-500 text-xs mt-0.5">Connect using browser wallet</p>
              <p className="text-blue-600 text-xs mt-1 font-medium">Sepolia Testnet</p>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
              <ExclamationTriangleIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Connect button */}
          <button
            onClick={handleAuth}
            disabled={connecting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3.5 px-6 rounded-xl transition-colors flex items-center justify-center gap-3"
          >
            {connecting ? (
              <>
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Connecting...
              </>
            ) : (
              'Connect Wallet'
            )}
          </button>

          <p className="text-center text-slate-400 text-xs mt-6">
            A MetaMask popup will appear to confirm the connection.
          </p>
        </div>
      </div>
    </div>
  )
}

import { useApi } from 'hooks/useApi'
import { useWeb3 } from 'hooks/useWeb3'
import { useEffect, useState } from 'react'
import { Regis, University } from 'types'
import { CheckCircleIcon, XCircleIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline'

type Status = 'idle' | 'step1' | 'step2' | 'done' | 'error'

const STEPS = [
  { label: 'Register on Contract', desc: 'Add university to smart contract' },
  { label: 'Save to Database', desc: 'Create wallet record' },
  { label: 'Complete', desc: 'Everything is done' },
]

export default function AddUniversity() {
  const [universities, setUniversities] = useState<University[]>([])
  const [address, setAddress] = useState('')
  const [owner, setOwner] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [step, setStep] = useState(0)
  const [errorMsg, setErrorMsg] = useState('')
  const { getUniversitys, signUp } = useApi()
  const { addUniversity } = useWeb3()
  const showModal = status !== 'idle'

  async function fetchUniversities() {
    try {
      const res = await getUniversitys()
      if (res) setUniversities(res)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchUniversities()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!address || !owner) return
    setStatus('step1')
    setStep(0)
    try {
      const res = await addUniversity({ address, owner })
      if (res.status) {
        setStep(1)
        setStatus('step2')
        await signUp({ address, owner })
        setStep(2)
        setStatus('done')
      } else {
        setStatus('error')
        setErrorMsg('Unable to register on smart contract.')
      }
    } catch (e: any) {
      setStatus('error')
      setErrorMsg(e?.message || 'Something went wrong. Please try again.')
    }
  }

  const reset = () => {
    setStatus('idle')
    setAddress('')
    setOwner('')
    setStep(0)
  }

  return (
    <div className="w-full max-w-lg">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Wallet address */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Wallet Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="0x..."
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-mono placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* University select */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            University
          </label>
          <div className="relative">
            <BuildingLibraryIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="">Select a university</option>
              {universities.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name} ({u.code})
                </option>
              ))}
            </select>
            <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={showModal}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Register
          </button>
          <button
            type="button"
            onClick={reset}
            disabled={showModal}
            className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-sm transition-colors"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Progress modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg animate-fadeIn">
            {status === 'error' ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <XCircleIcon className="w-10 h-10 text-red-500" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Registration Failed</h3>
                <p className="text-slate-500 text-sm mb-6">{errorMsg}</p>
                <button
                  onClick={reset}
                  className="bg-slate-900 text-white font-medium py-2.5 px-8 rounded-xl hover:bg-slate-800 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : status === 'done' ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircleIcon className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">University Registered!</h3>
                <p className="text-slate-500 text-sm mb-6">The university has been successfully registered on the blockchain and database.</p>
                <button
                  onClick={reset}
                  className="bg-blue-600 text-white font-medium py-2.5 px-8 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Register Another
                </button>
              </div>
            ) : (
              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Processing...</h3>
                <p className="text-slate-500 text-sm mb-8">Please wait and keep MetaMask open.</p>
                <div className="space-y-4">
                  {STEPS.map((s, i) => {
                    const isDone = step > i || status === 'done'
                    const isActive = step === i
                    return (
                      <div key={i} className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isDone ? 'bg-emerald-100' : isActive ? 'bg-blue-100' : 'bg-slate-100'
                        }`}>
                          {isDone ? (
                            <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                          ) : isActive ? (
                            <svg className="animate-spin w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                          ) : (
                            <span className="text-xs font-bold text-slate-400">{i + 1}</span>
                          )}
                        </div>
                        <div>
                          <p className={`text-sm font-semibold ${isActive ? 'text-blue-600' : isDone ? 'text-emerald-600' : 'text-slate-400'}`}>
                            {s.label}
                          </p>
                          <p className="text-xs text-slate-400">{s.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

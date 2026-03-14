import { useApi } from 'hooks/useApi'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Wallet } from 'types'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

const WalletPage: NextPage = () => {
  const router = useRouter()
  const [wallet, setWallet] = useState<Wallet>()
  const [loading, setLoading] = useState(true)
  const { getWallet } = useApi()
  const { id } = router.query

  async function fetchWallet() {
    try {
      if (typeof id === 'string') {
        const res = await getWallet(id)
        if (res) setWallet(res)
      }
    } catch (e) {
      console.error(e)
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWallet()
  }, [id])

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push('/')}
          className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5 text-slate-600" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Wallet Details</h2>
          <p className="text-slate-500 text-sm mt-0.5">View wallet registration information</p>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center h-64">
          <svg className="animate-spin w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      ) : wallet ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <p className="font-semibold text-slate-900">Wallet Information</p>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
              wallet.verify ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${wallet.verify ? 'bg-emerald-500' : 'bg-red-500'}`} />
              {wallet.verify ? 'Verified' : 'Not Verified'}
            </span>
          </div>

          <dl className="divide-y divide-slate-100">
            {[
              { label: 'ID', value: wallet._id, mono: true },
              { label: 'Wallet Address', value: wallet.address, mono: true },
              { label: 'University', value: wallet.owner.name },
              { label: 'University Code', value: wallet.owner.code },
              { label: 'Created At', value: wallet.createdAt ?? '—' },
              { label: 'Updated At', value: wallet.updatedAt ?? '—' },
            ].map(({ label, value, mono }) => (
              <div key={label} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-1">
                <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider sm:w-40 flex-shrink-0">
                  {label}
                </dt>
                <dd className={`text-sm text-slate-900 break-all ${mono ? 'font-mono' : 'font-medium'}`}>
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center h-64">
          <p className="text-slate-400">Wallet not found</p>
        </div>
      )}
    </div>
  )
}

export default WalletPage

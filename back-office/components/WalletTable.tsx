import { useApi } from 'hooks/useApi'
import { useEffect, useState } from 'react'
import { WalletColumn } from 'types'
import { useRouter } from 'next/router'
import { ChevronRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function WalletTable() {
  const [data, setData] = useState<WalletColumn[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const router = useRouter()
  const { getWallets } = useApi()

  async function fetchWallet() {
    try {
      const res = await getWallets()
      if (res) {
        const mapped = res.map((item: any) => ({
          ...item,
          owner: item.owner.name,
          verify: item.verify ? 'verified' : 'not verified',
        }))
        setData(mapped)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWallet()
  }, [])

  const filtered = data.filter(
    (w) =>
      w.address.toLowerCase().includes(search.toLowerCase()) ||
      w.owner.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Search bar */}
      <div className="p-4 border-b border-slate-100 flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by address or university..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <span className="text-sm text-slate-400">{filtered.length} records</span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <svg className="animate-spin w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">University</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    No registered wallets found.
                  </td>
                </tr>
              ) : (
                filtered.map((row) => (
                  <tr
                    key={row._id}
                    className="hover:bg-slate-50 cursor-pointer transition-colors"
                    onClick={() => router.push(`/wallet/${row._id}`)}
                  >
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">
                      {row._id.slice(0, 8)}...
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-700 max-w-xs truncate">
                      {row.address}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">{row.owner}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          row.verify === 'verified'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${row.verify === 'verified' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                        {row.verify === 'verified' ? 'Verified' : 'Not Verified'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ChevronRightIcon className="w-4 h-4 text-slate-400 ml-auto" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

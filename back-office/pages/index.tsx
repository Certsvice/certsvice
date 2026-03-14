import WalletTable from 'components/WalletTable'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { PlusIcon } from '@heroicons/react/24/outline'

const Home: NextPage = () => {
  const router = useRouter()
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Registered Wallets</h2>
          <p className="text-slate-500 text-sm mt-1">Manage university wallet registrations</p>
        </div>
        <button
          onClick={() => router.push('/register')}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-5 rounded-xl transition-colors text-sm"
        >
          <PlusIcon className="w-4 h-4" />
          Add University
        </button>
      </div>
      <WalletTable />
    </div>
  )
}

export default Home

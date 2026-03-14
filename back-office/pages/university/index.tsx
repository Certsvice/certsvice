import StudentTable from 'components/StudentTable'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { PlusIcon } from '@heroicons/react/24/outline'

const UniversityPage: NextPage = () => {
  const router = useRouter()
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Certificates</h2>
          <p className="text-slate-500 text-sm mt-1">Manage student certificates registered on the blockchain</p>
        </div>
        <button
          onClick={() => router.push('/university/register')}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-5 rounded-xl transition-colors text-sm"
        >
          <PlusIcon className="w-4 h-4" />
          Upload Certificate
        </button>
      </div>
      <StudentTable />
    </div>
  )
}

export default UniversityPage

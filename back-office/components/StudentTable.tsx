import { useApi } from 'hooks/useApi'
import { useWeb3 } from 'hooks/useWeb3'
import { useEffect, useState } from 'react'
import { Certificate, Data, Issuer } from 'types'
import hash from 'object-hash'
import { TrashIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'

const YEARS = [2022, 2023, 2024, 2025, 2026]

export default function StudentTable() {
  const [data, setData] = useState<any[]>([])
  const [year, setYear] = useState(new Date().getFullYear())
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const { deleteStudent, getUniversity } = useWeb3()
  const { getStudents, getWallet, deleteStudentApi } = useApi()

  async function fetchData() {
    setLoading(true)
    try {
      const university = await getUniversity()
      const wallet = await getWallet(university)
      const res = await getStudents(wallet._id, year.toString())
      if (res) {
        const mapped = res.map((item: Certificate) => ({
          _id: item._id,
          name: item.data.name,
          sid: item.data.studentId,
          addmissionDate: item.data.addmissionDate,
          graduationDate: item.data.graduationDate,
          program: item.data.program,
          deleteData: {
            certificateId: item.certificateId,
            _id: item._id,
            data: item.data,
            issuer: {
              name: (item.issuer as any).owner.name,
              certificateStore: (item.issuer as any).address,
              certificateId: item.certificateId,
            },
          },
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
    fetchData()
  }, [year])

  const handleDelete = async (item: any) => {
    setDeleting(item._id)
    try {
      await deleteStudent(item.deleteData.certificateId)
      await deleteStudentApi(item.deleteData._id)
      setData((prev) => prev.filter((d) => d._id !== item._id))
    } catch (e) {
      console.error(e)
    } finally {
      setDeleting(null)
    }
  }

  const handleDownload = async (item: any) => {
    const json = JSON.stringify({ data: item.deleteData.data, issuer: item.deleteData.issuer })
    const blob = new Blob([json], { type: 'application/json' })
    const href = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = href
    link.download = 'certsvice.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(href)
  }

  return (
    <div className="space-y-4">
      {/* Year filter */}
      <div className="flex items-center gap-2">
        {YEARS.map((y) => (
          <button
            key={y}
            onClick={() => setYear(y)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              year === y
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            {y}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
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
                  {['Name', 'Student ID', 'Admission Date', 'Graduation Date', 'Program', 'Actions'].map((h) => (
                    <th key={h} className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                      No certificates found for {year}.
                    </td>
                  </tr>
                ) : (
                  data.map((row) => (
                    <tr key={row._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">{row.name}</td>
                      <td className="px-6 py-4 text-slate-600 font-mono text-xs">{row.sid}</td>
                      <td className="px-6 py-4 text-slate-600">{row.addmissionDate}</td>
                      <td className="px-6 py-4 text-slate-600">{row.graduationDate}</td>
                      <td className="px-6 py-4 text-slate-600">{row.program}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDownload(row)}
                            className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors"
                            title="Download certificate"
                          >
                            <ArrowDownTrayIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(row)}
                            disabled={deleting === row._id}
                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                            title="Delete certificate"
                          >
                            {deleting === row._id ? (
                              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                            ) : (
                              <TrashIcon className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

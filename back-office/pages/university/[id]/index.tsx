import { useApi } from 'hooks/useApi'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Certificate } from 'types'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

const CertificateDetailPage: NextPage = () => {
  const router = useRouter()
  const [certificate, setCertificate] = useState<Certificate>()
  const [loading, setLoading] = useState(true)
  const { getStudent } = useApi()
  const { id } = router.query

  async function fetchCertificate() {
    try {
      if (typeof id === 'string') {
        const res = await getStudent(id)
        if (res) setCertificate(res)
      }
    } catch (e) {
      console.error(e)
      router.push('/university')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCertificate()
  }, [id])

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push('/university')}
          className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5 text-slate-600" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Certificate Details</h2>
          <p className="text-slate-500 text-sm mt-0.5">View student certificate information</p>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center h-64">
          <svg className="animate-spin w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      ) : certificate ? (
        <div className="space-y-6">
          {/* Student info */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <p className="font-semibold text-slate-900">Student Information</p>
            </div>
            <dl className="divide-y divide-slate-100">
              {[
                { label: 'Full Name', value: certificate.data.name },
                { label: 'Student ID', value: certificate.data.studentId },
                { label: 'Identification No.', value: certificate.data.identificationNumber },
                { label: 'University', value: certificate.data.university },
                { label: 'Faculty', value: certificate.data.faculty },
                { label: 'Program', value: certificate.data.program },
                { label: 'Degree', value: certificate.data.degree },
                { label: 'Degree Name', value: certificate.data.degreeName },
                { label: 'Admission Date', value: certificate.data.addmissionDate },
                { label: 'Graduation Date', value: certificate.data.graduationDate },
                { label: 'Issued On', value: certificate.data.issuedOn },
              ].map(({ label, value }) => (
                <div key={label} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-1">
                  <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider sm:w-48 flex-shrink-0">
                    {label}
                  </dt>
                  <dd className="text-sm font-medium text-slate-900">{value || '—'}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Certificate metadata */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <p className="font-semibold text-slate-900">Certificate Metadata</p>
            </div>
            <dl className="divide-y divide-slate-100">
              {[
                { label: 'Certificate ID', value: certificate.certificateId, mono: true },
                { label: 'Record ID', value: certificate._id, mono: true },
                { label: 'Created At', value: certificate.createdAt },
                { label: 'Updated At', value: certificate.updatedAt },
              ].map(({ label, value, mono }) => (
                <div key={label} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-1">
                  <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider sm:w-48 flex-shrink-0">
                    {label}
                  </dt>
                  <dd className={`text-sm text-slate-900 break-all ${mono ? 'font-mono' : 'font-medium'}`}>{value || '—'}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center h-64">
          <p className="text-slate-400">Certificate not found</p>
        </div>
      )}
    </div>
  )
}

export default CertificateDetailPage

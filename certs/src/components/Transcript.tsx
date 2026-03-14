import { Certificate } from 'src/types'
import Terms from './Terms'

type Props = {
  certificate: Certificate
}

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-1 py-2.5 border-b border-slate-100 last:border-0">
    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider sm:w-48 flex-shrink-0">{label}</span>
    <span className="text-sm text-slate-800">{value}</span>
  </div>
)

export default function Transcript({ certificate }: Props) {
  const { data, issuer } = certificate
  const { transcript } = data

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="pb-4 border-b-2 border-slate-200">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Academic Transcript</p>
        <h2 className="text-xl font-bold text-slate-900">{data.name}</h2>
        <p className="text-sm text-slate-500">{data.university}</p>
      </div>

      {/* Student info grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-0">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Student Information</p>
          <div className="bg-slate-50 rounded-xl p-4">
            <InfoRow label="Student ID" value={data.studentId} />
            <InfoRow label="ID Number" value={data.identificationNumber} />
            <InfoRow label="Admission Date" value={data.addmissionDate} />
            <InfoRow label="Graduation Date" value={data.graduationDate} />
          </div>
        </div>
        <div className="space-y-0">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Program Information</p>
          <div className="bg-slate-50 rounded-xl p-4">
            <InfoRow label="Faculty" value={data.faculty} />
            <InfoRow label="Program" value={data.program} />
            <InfoRow label="Degree" value={data.degree} />
            <InfoRow label="Degree Name" value={data.degreeName} />
          </div>
        </div>
      </div>

      {/* Issuer info */}
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Certificate Authority</p>
        <div className="bg-slate-50 rounded-xl p-4">
          <InfoRow label="Issued By" value={issuer.name} />
          <InfoRow label="Issued On" value={data.issuedOn} />
          <InfoRow label="Certificate ID" value={issuer.certificateId} />
        </div>
      </div>

      {/* Transcript terms */}
      {transcript && transcript.length > 0 && (
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Academic Record</p>
          <Terms terms={transcript} />
        </div>
      )}
    </div>
  )
}

import hash from 'object-hash'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UploadButton from 'src/components/UploadBtn'
import { CertsRoute, UploadMsg, UploadStatus } from 'src/consts'
import { useWeb3 } from 'src/hooks/useWeb3'
import { Certificate } from 'src/types'

type Props = {
  onSet: (certificate: Certificate) => void
}

export default function Home({ onSet }: Props) {
  const navigate = useNavigate()
  const [dragOver, setDragOver] = useState(false)
  const [loading, setLoading] = useState(false)
  const [match, setMatch] = useState<UploadStatus>(UploadStatus.Match)
  const { getStudent } = useWeb3()

  const getInput = async (file: FileList | null) => {
    try {
      setLoading(true)
      setMatch(UploadStatus.Match)
      const reader = new FileReader()
      if (file && file.length === 1) {
        reader.readAsText(file[0])
        reader.addEventListener('load', async () => {
          try {
            if (typeof reader.result === 'string') {
              const obj: Certificate = JSON.parse(reader.result)
              const { issuer, data } = obj
              const { certificateId, name, certificateStore } = issuer
              const certificateHash = await getStudent(certificateId)
              if (!data && !certificateId && !name && !certificateStore && !certificateHash.hash) {
                setLoading(false)
                setMatch(UploadStatus.Tempered)
                return
              }
              const certificateDataHash: string = hash(obj) ?? ''
              if (certificateDataHash === certificateHash.hash) {
                onSet(obj)
                setMatch(UploadStatus.Match)
                navigate(CertsRoute.Result)
              } else {
                setLoading(false)
                setMatch(UploadStatus.Tempered)
              }
            } else {
              setLoading(false)
              setMatch(UploadStatus.Error)
            }
          } catch {
            setLoading(false)
            setMatch(UploadStatus.Error)
          }
        })
      } else {
        setLoading(false)
        setMatch(UploadStatus.Error)
      }
    } catch (e) {
      setLoading(false)
      setMatch(UploadStatus.Error)
    }
  }

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)
    await getInput(e.dataTransfer.files)
  }

  const hasError = match !== UploadStatus.Match

  return (
    <div className="min-h-full flex flex-col items-center justify-center px-4 py-16">
      {/* Hero text */}
      <div className="text-center mb-12 animate-fadeIn">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-slow" />
          <span className="text-white/80 text-xs font-medium">Powered by Blockchain</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight thaiFont">
          ตรวจสอบ Certificate
        </h1>
        <p className="text-white/60 text-lg max-w-md mx-auto thaiFont">
          อัพโหลดไฟล์ Certificate ของคุณเพื่อตรวจสอบความถูกต้อง
          ผ่านระบบ Blockchain ที่ปลอดภัย
        </p>
      </div>

      {/* Upload card */}
      <div className="w-full max-w-lg animate-fadeIn">
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          className={`bg-white rounded-3xl shadow-2xl p-10 transition-all duration-200 ${
            dragOver ? 'scale-105 shadow-blue-500/20' : ''
          }`}
        >
          {loading ? (
            /* Loading state */
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="font-semibold text-slate-700">Verifying Certificate...</p>
              <p className="text-sm text-slate-400">Checking blockchain records</p>
            </div>
          ) : hasError ? (
            /* Error state */
            <div className="flex flex-col items-center gap-4 text-center py-4">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">
                  {match === UploadStatus.Tempered ? UploadMsg.Tampered : UploadMsg.Error}
                </h3>
                <p className="text-slate-500 text-sm mt-1">
                  {match === UploadStatus.Tempered ? UploadMsg.TamperedDetail : UploadMsg.ErrorDetail}
                </p>
              </div>
              <UploadButton match={match} getFile={getInput} />
            </div>
          ) : (
            /* Default upload state */
            <div className="flex flex-col items-center gap-6">
              <div
                className={`w-full rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-3 py-10 px-6 transition-colors ${
                  dragOver
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${dragOver ? 'bg-blue-100' : 'bg-white shadow-sm'}`}>
                  <svg className={`w-7 h-7 animate-bounce-gentle ${dragOver ? 'text-blue-500' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-slate-700">
                    {dragOver ? 'Release to verify' : 'Drag & drop your certificate'}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">Supports .json files only</p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full">
                <div className="flex-1 h-px bg-slate-100" />
                <span className="text-xs text-slate-400 font-medium">or</span>
                <div className="flex-1 h-px bg-slate-100" />
              </div>

              <UploadButton match={match} getFile={getInput} />

              {/* Demo download */}
              <a
                href="/demoCertificate.json"
                download="demoCertificate"
                className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download demo certificate
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

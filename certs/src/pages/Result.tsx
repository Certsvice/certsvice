import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import CertificatePage from 'src/components/Certificate'
import Transcript from 'src/components/Transcript'
import { CertsRoute } from 'src/consts'
import { Certificate } from 'src/types'

type Props = {
  certificate: Certificate
}

export default function Result({ certificate }: Props) {
  const navigate = useNavigate()
  const componentRef = useRef<HTMLDivElement>(null)
  const [toggle, setToggle] = useState(true)

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  useEffect(() => {
    if (!certificate.issuer.certificateId) {
      navigate(CertsRoute.Index)
    }
  }, [certificate])

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Verified badge */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 animate-fadeIn">
        <div className="flex items-center gap-3 bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 rounded-2xl px-5 py-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-emerald-300 font-medium">Certificate issued by</p>
            <p className="text-white font-bold text-sm">{certificate.issuer.name}</p>
          </div>
        </div>

        <div className="sm:ml-auto flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium py-2 px-4 rounded-xl hover:bg-white/20 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium py-2 px-4 rounded-xl hover:bg-white/20 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Save
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-0">
        {['Certificate', 'Transcript'].map((tab, i) => (
          <button
            key={tab}
            onClick={() => setToggle(i === 0)}
            className={`px-6 py-3 font-semibold text-sm rounded-t-xl transition-colors ${
              toggle === (i === 0)
                ? 'bg-white text-slate-900'
                : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content card */}
      <div className="bg-white rounded-b-3xl rounded-tr-3xl shadow-2xl p-6 min-h-96 animate-fadeIn">
        <div ref={componentRef}>
          {toggle ? (
            <CertificatePage certificate={certificate} />
          ) : (
            <Transcript certificate={certificate} />
          )}
        </div>
      </div>
    </div>
  )
}

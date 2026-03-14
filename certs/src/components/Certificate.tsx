import { Certificate } from 'src/types'

type Props = {
  certificate: Certificate
}

export default function CertificatePage({ certificate }: Props) {
  const { data, issuer } = certificate
  return (
    <div className="relative w-full min-h-96 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #fafbff 100%)' }}>
      {/* Decorative border */}
      <div className="absolute inset-3 rounded-xl border-2 border-blue-200/50 pointer-events-none" />
      <div className="absolute inset-4 rounded-xl border border-blue-100/80 pointer-events-none" />

      {/* Corner ornaments */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-blue-400 rounded-tl-lg" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-blue-400 rounded-tr-lg" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-blue-400 rounded-bl-lg" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-blue-400 rounded-br-lg" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-16 py-16 min-h-96">
        {/* Title */}
        <div className="mb-6">
          <p className="text-blue-400 text-xs font-bold tracking-[0.3em] uppercase mb-2">Certificate of Verification</p>
          <h1 className="text-5xl font-bold tracking-widest text-slate-800" style={{ letterSpacing: '0.2em' }}>
            CERTSVICE
          </h1>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 w-64 mb-8">
          <div className="flex-1 h-px bg-blue-200" />
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <div className="flex-1 h-px bg-blue-200" />
        </div>

        {/* Content */}
        <div className="space-y-3 thaiFont max-w-lg">
          <p className="text-slate-500 text-sm">ขอมอบประกาศนียบัตรฉบับนี้เพื่อแสดงว่า</p>
          <p className="text-slate-900 font-bold text-3xl">{data.name}</p>
          <p className="text-slate-500 text-sm leading-relaxed mt-4">
            ได้รับการตรวจสอบยืนยันว่าไฟล์ผลการเรียนที่นำมาตรวจสอบนั้น
            <br />มีความถูกต้องสมบูรณ์และไม่ได้ผ่านการแก้ไขแต่อย่างใด
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 w-64 my-8">
          <div className="flex-1 h-px bg-blue-200" />
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <div className="flex-1 h-px bg-blue-200" />
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between w-full max-w-sm thaiFont">
          <div className="text-center">
            <div className="w-24 h-px bg-slate-300 mb-1 mx-auto" />
            <p className="text-xs text-slate-400">ผู้รับรอง</p>
            <p className="text-xs font-medium text-slate-600 mt-0.5">{issuer.name}</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-px bg-slate-300 mb-1 mx-auto" />
            <p className="text-xs text-slate-400">วันที่ออก</p>
            <p className="text-xs font-medium text-slate-600 mt-0.5">{data.issuedOn}</p>
          </div>
        </div>

        {/* Verified badge */}
        <div className="mt-8 flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-1.5">
          <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-emerald-700 text-xs font-semibold">Blockchain Verified</span>
        </div>
      </div>
    </div>
  )
}

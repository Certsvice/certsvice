import { useApi } from 'hooks/useApi'
import { useWeb3 } from 'hooks/useWeb3'
import hash from 'object-hash'
import { useState } from 'react'
import { Certificate, Data, Issuer } from 'types'
import { CloudArrowUpIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

type Step = 'idle' | 'uploading' | 'step1' | 'step2' | 'done' | 'error'

const STEPS = [
  { label: 'Upload to Contract', desc: 'Register student on blockchain' },
  { label: 'Store to Database', desc: 'Save certificate data' },
  { label: 'Complete', desc: 'Everything is done' },
]

export default function AddStudent() {
  const { getUniversity, addStudent } = useWeb3()
  const { createStudent, getWallet } = useApi()
  const [step, setStep] = useState<number>(0)
  const [status, setStatus] = useState<Step>('idle')
  const [dragOver, setDragOver] = useState(false)

  const currentStep = status === 'step1' ? 0 : status === 'step2' ? 1 : status === 'done' ? 2 : 0
  const showModal = status !== 'idle'

  const getInput = async (file: FileList | Blob[] | null) => {
    if (!file || !file[0]) return
    setStatus('step1')
    setStep(0)
    const reader = new FileReader()
    reader.readAsText(file[0])
    reader.addEventListener('load', async () => {
      try {
        if (typeof reader.result === 'string') {
          const obj: Certificate = JSON.parse(reader.result)
          const university = await getUniversity()
          const wallet = await getWallet(university)
          const certificateId = Date.now()
          const DataToHash: { data: Data; issuer: Issuer } = {
            data: obj.data,
            issuer: {
              name: wallet.owner.name,
              certificateStore: wallet.address,
              certificateId: certificateId.toString(),
            },
          }
          const parsedata = JSON.parse(JSON.stringify(DataToHash))
          const certificateDataHash = hash(parsedata)
          setStep(0)
          await addStudent(certificateDataHash, certificateId.toString())
          setStep(1)
          setStatus('step2')
          await createStudent(obj.data, certificateId.toString(), wallet._id)
          setStep(2)
          setStatus('done')
        } else {
          setStatus('error')
        }
      } catch {
        setStatus('error')
      }
    })
  }

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)
    await getInput(e.dataTransfer.files)
  }

  const reset = () => setStatus('idle')

  return (
    <div className="w-full max-w-2xl">
      {/* Upload zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        className={`relative flex flex-col items-center justify-center gap-4 p-12 rounded-2xl border-2 border-dashed transition-all ${
          dragOver
            ? 'border-blue-500 bg-blue-50'
            : 'border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/30'
        }`}
      >
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${
          dragOver ? 'bg-blue-100' : 'bg-white shadow-sm border border-slate-100'
        }`}>
          <CloudArrowUpIcon className={`w-8 h-8 ${dragOver ? 'text-blue-500' : 'text-slate-400'}`} />
        </div>
        <div className="text-center">
          <p className="font-semibold text-slate-900 mb-1">
            {dragOver ? 'Release to upload' : 'Drag & drop your certificate file'}
          </p>
          <p className="text-sm text-slate-500">Only .json files are supported</p>
        </div>
        <label className="relative cursor-pointer">
          <input
            type="file"
            accept=".json"
            multiple={false}
            className="sr-only"
            onChange={(e) => getInput(e.target.files)}
            onClick={(e) => ((e.target as HTMLInputElement).value = '')}
          />
          <span className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-xl text-sm transition-colors">
            Choose File
          </span>
        </label>
      </div>

      {/* Progress modal overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg animate-fadeIn">
            {status === 'error' ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <XCircleIcon className="w-10 h-10 text-red-500" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Upload Failed</h3>
                <p className="text-slate-500 text-sm mb-6">Unable to register certificate. Please contact Admin.</p>
                <button
                  onClick={reset}
                  className="bg-slate-900 text-white font-medium py-2.5 px-8 rounded-xl hover:bg-slate-800 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : status === 'done' ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircleIcon className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Certificate Registered!</h3>
                <p className="text-slate-500 text-sm mb-6">The certificate has been successfully stored on the blockchain and in the database.</p>
                <button
                  onClick={reset}
                  className="bg-blue-600 text-white font-medium py-2.5 px-8 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Upload Another
                </button>
              </div>
            ) : (
              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Processing...</h3>
                <p className="text-slate-500 text-sm mb-8">Please wait and keep MetaMask open.</p>
                <div className="space-y-4">
                  {STEPS.map((s, i) => {
                    const isDone = step > i || status === 'done'
                    const isActive = step === i
                    return (
                      <div key={i} className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isDone ? 'bg-emerald-100' : isActive ? 'bg-blue-100' : 'bg-slate-100'
                        }`}>
                          {isDone ? (
                            <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                          ) : isActive ? (
                            <svg className="animate-spin w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                          ) : (
                            <span className="text-xs font-bold text-slate-400">{i + 1}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-semibold ${isActive ? 'text-blue-600' : isDone ? 'text-emerald-600' : 'text-slate-400'}`}>
                            {s.label}
                          </p>
                          <p className="text-xs text-slate-400">{s.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

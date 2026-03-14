import { UploadStatus, UploadBtnMsg } from 'src/consts'

type Props = {
  match: UploadStatus
  getFile: (file: FileList | null) => Promise<void>
}

export default function UploadBtn({ match, getFile }: Props) {
  const hasError = match !== UploadStatus.Match

  return (
    <label className="relative cursor-pointer">
      <input
        type="file"
        accept=".json"
        multiple={false}
        className="sr-only"
        onChange={(e) => getFile(e.target.files)}
        onClick={(e) => ((e.target as HTMLInputElement).value = '')}
      />
      <span
        className={`inline-flex items-center gap-2 font-semibold py-3 px-7 rounded-2xl text-sm transition-all shadow-lg hover:shadow-xl active:scale-95 ${
          hasError
            ? 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            : 'bg-white text-blue-700 hover:bg-blue-50'
        }`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        {hasError ? UploadBtnMsg.TryAnother : UploadBtnMsg.ChooseFile}
      </span>
    </label>
  )
}

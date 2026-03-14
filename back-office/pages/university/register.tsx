import AddStudent from 'components/AddStudent'
import type { NextPage } from 'next'

const UniversityRegister: NextPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Upload Certificate</h2>
        <p className="text-slate-500 text-sm mt-1">
          Upload a student certificate JSON file to register it on the blockchain
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
        <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-sm text-blue-700 font-medium">Requirements</p>
          <ul className="mt-2 text-sm text-blue-600 space-y-1 list-disc list-inside">
            <li>File must be in .json format</li>
            <li>Only one file at a time</li>
            <li>MetaMask must be unlocked and connected</li>
          </ul>
        </div>
        <AddStudent />
      </div>
    </div>
  )
}

export default UniversityRegister

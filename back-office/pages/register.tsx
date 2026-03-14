import AddUniversity from 'components/AddUniversity'
import type { NextPage } from 'next'

const Register: NextPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Register University</h2>
        <p className="text-slate-500 text-sm mt-1">Add a new university wallet to the blockchain and database</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
        <AddUniversity />
      </div>
    </div>
  )
}

export default Register

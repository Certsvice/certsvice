import { PageHeader } from 'antd'
import StudentTable from 'components/StudentTable'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const University: NextPage = () => {
  const router = useRouter()
  return (
    <div className="container mx-auto">
      <PageHeader className="site-page-header" title="รายการลงทะเบียน" />
      <StudentTable />
      <div className="w-full flex justify-center">
        <button className="px-6 mx-4 text-white bg-blue-500 border rounded-lg h-8" onClick={() => router.push('/university/register')}>
          ลงทะเบียน
        </button>
      </div>
    </div>
  )
}

export default University

import { PageHeader } from 'antd'
import AddStudent from 'components/AddStudent'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Register: NextPage = () => {
  const router = useRouter()
  return (
    <div className="container mx-auto flex flex-col items-center ">
      <div className="flex flex-row items-center justify-center w-full">
        <PageHeader ghost={false} onBack={() => router.replace('/university')} title="อัพโหลดไฟล์ Certificate ของนักศึกษา"></PageHeader>
        <div className="flex flex-row ml-auto">
          {/* <Button className=" pr-4" key="2">
            Operation
          </Button>
          <div className="mx-3"></div>
          <Button key="1" type="primary">
            Primary
          </Button> */}
        </div>
      </div>

      <AddStudent />
    </div>
  )
}

export default Register

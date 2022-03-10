import { Button, PageHeader } from 'antd'
import AddUniversity from 'components/AddUniversity'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Register: NextPage = () => {
  const router = useRouter()
  return (
    <div className="container mx-auto flex flex-col items-center ">
      <div className="flex flex-row items-center justify-center w-full">
        <PageHeader ghost={false} onBack={() => router.push('/')} title="ลงทะเบียนมหาวิทยาลัย"></PageHeader>
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

      <AddUniversity />
    </div>
  )
}

export default Register

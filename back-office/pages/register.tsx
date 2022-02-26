import AddUniversity from 'components/AddUniversity'
import Title from 'components/Title'
import type { NextPage } from 'next'
import router from 'next/router'

const Register: NextPage = () => {
  return (
    <div className="container mx-auto">
      <button className="return-button" onClick={() => router.replace('/')}>
        {'< '}ย้อนกลับ
      </button>
      <Title>ลงทะเบียน</Title>
      <AddUniversity />
      <div className="w-full flex justify-center">
        <button className="px-6 mx-4 text-white bg-blue-500 border rounded-lg h-8" onClick={() => {}}>
          ลงทะเบียน
        </button>
      </div>
    </div>
  )
}

export default Register

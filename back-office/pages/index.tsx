import Title from 'components/Title'
import WalletTable from 'components/WalletTable'
import type { NextPage } from 'next'
import router from 'next/router'

const Home: NextPage = () => {
  return (
    <div className="container mx-auto">
      <Title>รายการลงทะเบียน</Title>
      <WalletTable />
      <div className="w-full flex justify-center">
        <button className="px-6 mx-4 text-white bg-blue-500 border rounded-lg h-8" onClick={() => router.replace('/register')}>
          ลงทะเบียน
        </button>
      </div>
    </div>
  )
}

export default Home

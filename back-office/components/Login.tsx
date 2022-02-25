import { useWeb3 } from 'hooks/useWeb3'
import { useState } from 'react'
import { useGuardContext } from '../components/GuardRoute'
import LoginBtn from './LoginBtn'
import ModalCard from './ModalCard'

export default function Login() {
  const [openCancel, setOpenCancel] = useState(false)
  const { getAccountInject, getChain, getOwner, changeChain } = useWeb3()
  const { checkPermission } = useGuardContext()

  async function handleAuth() {
    if ((await getChain()) !== 3) {
      alert('wrong chain')
      await changeChain()
    } else {
      alert('right chain')
      const account = await getAccountInject()
      const owner = await getOwner()
      console.log(account, 'account')
      console.log(owner, 'owner')
      if (account === owner) {
        checkPermission()
      } else {
        alert('not owner or university')
      }
    }
  }

  return (
    <>
      <div className="max-w-screen-sm m-auto mt-24">
        <h1 className="text-2xl font-bold">เข้าสู่ระบบ</h1>
        <div className="py-3 text-sm font-light">กดปุ่ม "CONNECT WALLET" เพื่อเข้าสู่ระบบ</div>
        <div className="p-20 mt-4 bg-gray-200 rounded-lg shadow-md">
          <img src="wallet.jpg" alt="Wallet" style={{ marginBottom: '30px', borderRadius: '10px' }}></img>
          <LoginBtn onConnect={handleAuth}></LoginBtn>
        </div>
      </div>
    </>
  )
}

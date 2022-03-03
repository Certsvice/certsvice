import { Role } from 'consts'
import { useWeb3 } from 'hooks/useWeb3'
import { dayjs } from 'helpers/datetime'

import { useGuardContext } from '../components/GuardRoute'
import LoginBtn from './LoginBtn'
import router from 'next/router'

export default function Login() {
  const { login } = useGuardContext()
  const { getChain, getAccountInject, getOwner, getUniversity, changeChain, getToken } = useWeb3()

  async function handleAuth() {
    const chainId = (await getChain()) === 3

    if (chainId) {
      const account = await getAccountInject()
      if (account === (await getOwner())) {
        login(await getToken(account, Role.OWNER))
        router.push('/')
      } else if (await getUniversity()) {
        login(await getToken(account, Role.UNIVERSITY))
        router.push('/register')
      }
    } else {
      try {
        await changeChain()
        await handleAuth()
      } catch (e) {
        console.log(e)
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

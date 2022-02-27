import { Role } from 'consts'
import { useWeb3 } from 'hooks/useWeb3'
import { useGuardContext } from '../components/GuardRoute'
import LoginBtn from './LoginBtn'

export default function Login() {
  const { checkPermission } = useGuardContext()
  const { getChain, getAccountInject, getOwner, getUniversity, changeChain } = useWeb3()

  async function handleAuth() {
    const chainId = (await getChain()) === 3

    if (chainId) {
      const account = await getAccountInject()
      console.log(account)
      if (account === (await getOwner())) {
        checkPermission(chainId, Role.OWNER)
      } else if (account === (await getUniversity())) {
        checkPermission(chainId, Role.UNIVERSITY)
      } else {
        checkPermission(chainId, Role.UNDEFINED)
      }
    } else {
      await changeChain()
      handleAuth()
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

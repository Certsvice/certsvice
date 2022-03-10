import { Button, Modal, notification } from 'antd'
import { Role } from 'consts'
import { useWeb3 } from 'hooks/useWeb3'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useGuardContext } from '../components/GuardRoute'
import LoginBtn from './LoginBtn'

export default function Login() {
  const router = useRouter()
  const { login, isAuthorized } = useGuardContext()
  const { getChain, getAccountInject, getOwner, getUniversity, changeChain, getToken, eth } = useWeb3()
  const [api, contextHolder] = notification.useNotification()
  const openNotification = (placement: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight') => {
    api.info({
      message: (
        <div className="flex flex-col items-start">
          <h3 className=" font-bold">Metamask popup not show?</h3>
          <div className="flex flex-col mt-2">
            <span>Try to find an icon like this</span>
            <span>On your tab bar.</span>
            <img src="tabbar.png"></img>
          </div>
        </div>
      ),
      placement,
      style: {
        width: 'auto',
      },
    })
  }

  async function handleAuth() {
    const chainId = (await getChain()) === 3
    if (chainId) {
      if (!isAuthorized) {
        const account = await getAccountInject()
        if (account === (await getOwner())) {
          login(await getToken(Role.OWNER))
          router.push('/')
        } else if (await getUniversity()) {
          login(await getToken(Role.UNIVERSITY))
          router.push('/university')
        }
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

  function warning() {
    Modal.warning({
      title: 'Please install MetaMask!',
      content: (
        <div className="flex flex-col items-center ">
          <div className=" mt-4">
            <img src="/mm-logo.svg"></img>
          </div>
          <div className=" mt-4">
            <Button type="primary" href="https://metamask.io/download/">
              Install Metamask
            </Button>
          </div>
        </div>
      ),
      autoFocusButton: null,
      keyboard: false,
      okButtonProps: {
        href: 'https://metamask.io/download/',
        style: {
          opacity: 0,
        },
      },
      centered: true,
    })
  }

  useEffect(() => {
    if (!eth.isMetaMask) {
      warning()
    }
  })
  return (
    <>
      {contextHolder}
      <div className="max-w-screen-sm m-auto mt-24">
        <h1 className="text-2xl font-bold">เข้าสู่ระบบ</h1>
        <div className="py-3 text-sm font-light">กดปุ่ม "CONNECT WALLET" เพื่อเข้าสู่ระบบ</div>
        <div className="p-20 mt-4 bg-gray-200 rounded-lg shadow-md flex flex-col items-center">
          <img src="mm-logo.svg" alt="Metamask" style={{ marginBottom: '30px', borderRadius: '10px' }}></img>
          <img src="wallet.jpg" alt="Wallet" style={{ marginBottom: '30px', borderRadius: '10px' }}></img>
          <LoginBtn
            onConnect={() => {
              openNotification('topRight')
              handleAuth()
            }}
          ></LoginBtn>
        </div>
      </div>
    </>
  )
}

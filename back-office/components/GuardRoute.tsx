import Login from 'components/Login'
import { Role } from 'consts'
import { useLocalStorage } from 'hooks/useLocalStorage'
import { useWeb3 } from 'hooks/useWeb3'
import { useRouter } from 'next/router'
import { createContext, useCallback, useContext, useState } from 'react'
import Layout from './Layout'

interface GuardContextProps {
  isAuthorized?: boolean
  login: (token: string) => Promise<boolean>
  logout: () => void
}

const GuardContext = createContext<GuardContextProps>({} as GuardContextProps)

const GuardRoute: React.FC = ({ children }) => {
  const router = useRouter()
  const [accessToken, setAccessToken, clearAccessToken] = useLocalStorage('accessToken', '')
  const { recoverToken, getAccount } = useWeb3()
  if (accessToken) {
    checkPermission(accessToken)
  }
  async function checkPermission(accessToken: string) {
    const account = await getAccount()
    const { address, body } = await recoverToken(accessToken)
    if (account === address) {
      if (body.statement === Role.UNIVERSITY) {
        if (!router.pathname.startsWith('/university')) {
          router.push('/university')
        }
      }
    } else {
      router.push('/')
      clearAccessToken()
    }
  }

  const isAuthorized = !!accessToken

  const login = useCallback(
    async (token: string) => {
      setAccessToken(token)
      return true
    },
    [setAccessToken]
  )

  const logout = useCallback(() => {
    clearAccessToken()
    router.push('/')
  }, [clearAccessToken])

  return (
    <GuardContext.Provider value={{ isAuthorized, login, logout }}>{isAuthorized ? <Layout>{children}</Layout> : <Login />}</GuardContext.Provider>
  )
}

export const useGuardContext = () => useContext(GuardContext)

export default GuardRoute

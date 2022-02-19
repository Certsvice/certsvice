import { useLocalStorage } from 'hooks/useLocalStorage'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import Login from 'components/Login'
import Layout from './Layout'
import { useWeb3 } from 'hooks/useWeb3'

interface GuardContextProps {
  isChain?: boolean
  isOwner?: boolean
  isUniversity?: boolean
  checkPermission: () => void
  Logout: () => void
}

const GuardContext = createContext<GuardContextProps>({} as GuardContextProps)

const GuardRoute: React.FC = ({ children }) => {
  const router = useRouter()
  const [isChain, setIsChain] = useState(false)
  const { getOwner, getChain } = useWeb3()

  async function checkPermission() {
    setIsChain((await getChain()) === 3)
  }

  function Logout() {
    setIsChain(false)
  }

  useEffect(() => {
    checkPermission()
  }, [])

  return (
    <GuardContext.Provider value={{ checkPermission, Logout, isChain }}>
      {isChain ? <Layout>{children}</Layout> : <Login />}
    </GuardContext.Provider>
  )
}

export const useGuardContext = () => useContext(GuardContext)

export default GuardRoute

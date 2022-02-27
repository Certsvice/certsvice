import Login from 'components/Login'
import { Role } from 'consts'
import { createContext, useContext, useState } from 'react'
import Layout from './Layout'

interface GuardContextProps {
  isChain: boolean
  role: Role
  checkPermission: (chain: boolean, role: Role) => void
  Logout: () => void
}

const GuardContext = createContext<GuardContextProps>({} as GuardContextProps)

const GuardRoute: React.FC = ({ children }) => {
  const [isChain, setIsChain] = useState(false)
  const [role, setRole] = useState<Role>(Role.UNDEFINED)

  function checkPermission(chain: boolean, role: Role) {
    setIsChain(chain)
    setRole(role)
  }

  function Logout() {
    setIsChain(false)
    setRole(Role.UNDEFINED)
  }

  return (
    <GuardContext.Provider value={{ checkPermission, Logout, isChain, role }}>
      {isChain && (role === Role.OWNER || role === Role.UNIVERSITY) ? <Layout>{children}</Layout> : <Login />}
    </GuardContext.Provider>
  )
}

export const useGuardContext = () => useContext(GuardContext)

export default GuardRoute

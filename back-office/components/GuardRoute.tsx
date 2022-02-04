import { useLocalStorage } from 'hooks/useLocalStorage'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { createContext, useCallback, useContext } from 'react'

const Login = dynamic(() => import('./Login'))

interface GuardContextProps {
  isAuthorized?: boolean
  login: (token: string) => Promise<boolean>
  logout: () => void
}

const GuardContext = createContext<GuardContextProps>({} as GuardContextProps)

const GuardRoute: React.FC = ({ children }) => {
  const router = useRouter()
  const [accessToken, setAccessToken, clearAccessToken] = useLocalStorage('accessToken', '')

  if (accessToken) {
    // const date = jwt.decode(accessToken) as jwt.JwtPayload
    // if (date?.exp) {
    //   if (dayjs(date.exp * 1000).diff(dayjs()) <= 0) {
    //     clearAccessToken()
    //   }
    // } else {
    //   clearAccessToken()
    // }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearAccessToken])

  if (!process.browser) return <div></div>

  return <GuardContext.Provider value={{ isAuthorized, login, logout }}>{isAuthorized ? <>{children}</> : <Login />}</GuardContext.Provider>
}

export const useGuardContext = () => useContext(GuardContext)

export default GuardRoute

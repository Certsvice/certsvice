import '../styles/globals.css'
import type { AppProps } from 'next/app'
import GuardRoute from 'components/GuardRoute'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GuardRoute>
      <Component {...pageProps} />
    </GuardRoute>
  )
}

export default MyApp

import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import './styles/tailwind.css'
import Root from './components/Root'
import { CertsRoute, initialCertificate } from 'src/consts'
import Home from './pages/Home'
import Result from './pages/Result'
import { Certificate } from './types'

function App() {
  const [certificate, setData] = useState<Certificate>(initialCertificate)
  useEffect(() => {
    console.log(certificate, 'from app tsx')
  }, [certificate])
  return (
    <BrowserRouter>
      <Root>
        <Routes>
          <Route path={CertsRoute.Index} element={<Home onSet={setData} />} />
          <Route path={CertsRoute.Result} element={<Result certificate={certificate} />} />
        </Routes>
      </Root>
    </BrowserRouter>
  )
}

export default App

import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from 'src/components/Layout'
import Home from 'src/pages/Home'
import Result from 'src/pages/Result'
import { CertsRoute } from 'src/consts'
import { Certificate } from 'src/types'
import { initialCertificate } from 'src/consts'

function App() {
  const [certificate, setCertificate] = useState<Certificate>(initialCertificate)

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={CertsRoute.Index} element={<Home onSet={setCertificate} />} />
          <Route path={CertsRoute.Result} element={<Result certificate={certificate} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App

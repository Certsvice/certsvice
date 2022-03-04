import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import './styles/tailwind.css'
import './styles/antd.css'
import Root from './components/Root'
import { CertsRoute } from './consts'
import Home from './pages/Home'
import Result from './pages/Result'

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    console.log(data, 'from app tsx')
  }, [data])
  return (
    <BrowserRouter>
      <Root>
        <Routes>
          <Route path={CertsRoute.Index} element={<Home onSet={setData} />} />
          <Route path={CertsRoute.Result} element={<Result />} />
        </Routes>
      </Root>
    </BrowserRouter>
  )
}

export default App

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Root from './components/Root'
import { CertsRoute } from './consts'
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Root>
        <Routes>
          <Route path={CertsRoute.Index} element={<Home />} />
        </Routes>
      </Root>
    </BrowserRouter>
  )
}

export default App

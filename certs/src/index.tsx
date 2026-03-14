import React from 'react'
import ReactDOM from 'react-dom'
import './styles/tailwind.css'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+Thai:wght@300;400;500;600;700&display=swap');
      `}</style>
      <App />
    </>
  </React.StrictMode>,
  document.getElementById('root')
)

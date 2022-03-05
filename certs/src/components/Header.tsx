import { useNavigate } from 'react-router-dom'
import { CertsRoute } from 'src/consts'

export default function PageHeader() {
  const navigate = useNavigate()
  return (
    <div className=" h-20 flex items-center px-4" style={{ background: '#44476a' }}>
      <button onClick={() => navigate(CertsRoute.Index)}>
        <h1 style={{ color: '#e6e7ee', marginLeft: '0.5rem' }}>Certsvise</h1>
      </button>
    </div>
  )
}

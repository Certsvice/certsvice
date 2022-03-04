import Logo from './Logo'

export default function PageHeader() {
  return (
    <div className=" h-20 flex items-center px-4" style={{ background: '#44476a' }}>
      <Logo image="/Logo.svg"></Logo>
    </div>
  )
}

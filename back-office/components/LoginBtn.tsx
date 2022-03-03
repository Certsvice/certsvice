import { Loading } from '@nextui-org/react'
import { useState } from 'react'
import styled from 'styled-components'

type Props = {
  onConnect: () => void
}

export default function LoginBtn({ onConnect }: Props) {
  const [loading, setLoading] = useState(false)

  async function handle() {
    onConnect()
  }

  return (
    <Login>
      <Address onClick={onConnect} className={'items-center'}>
        {loading ? <Loading type="points" /> : <span>CONNECT WALLET</span>}
        <img src="metamask.svg" alt="Metamask"></img>
      </Address>
    </Login>
  )
}

const Login = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  letter-spacing: 1.5px;
  color: #31344b;
  transition: all 0.2s ease 0s;
  border-radius: 7px;
  span {
    margin: 0px 10px;
    letter-spacing: 0px;
    font-weight: bold;
  }
`
const Address = styled.div`
  display: flex;
  justify-content: center;
  letter-spacing: 1.5px;
  cursor: pointer;
  color: #31344b;
  background: #e6e7ee;
  transition: all 0.2s ease 0s;
  border-radius: 7px;
  padding: 8px 8px;
  height: 100%;
  width: auto;
  box-shadow: 3px 3px 6px #b8b9be, -3px -3px 6px #fff;
  &:hover {
    border-radius: 7px;
    background: #e6e7ee;
    box-shadow: inset 3px 3px 6px #b8b9be, inset -3px -3px 6px #fff;
  }
  img {
    height: 20px;
    min-width: 20px;
    width: 20px;
    margin-right: 0px 0px 8px 0px;
    z-index: auto;
  }
  span {
    border-width: 0 !important;
    margin: 0px 10px;
    letter-spacing: 0px;
    font-weight: bold;
  }
`

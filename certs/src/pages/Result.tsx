import { Button } from '@nextui-org/react'
import { useState } from 'react'
import { Data } from 'src/types'
import styled from 'styled-components'

type Props = {
  data: Data | undefined
}

export default function Result({ data }: Props) {
  const [toggle, setToggle] = useState(true)
  console.log(data)
  return (
    <Content>
      <div className="flex w-full">
        <div
          className=" w-80 h-auto flex items-center align-middle p-3 rounded-lg mr-auto"
          style={{
            backgroundColor: '#e6f1ee',
            boxShadow: ` 5px 5px 10px #c4c4ca, -5px -5px 10px #ffffff `,
          }}
        >
          <span className="material-icons-round mr-2" style={{ color: '#09a63b' }}>
            verified_user
          </span>
          <div className="flex flex-col" style={{ color: '#28a745' }}>
            <h5 className="my-0">Certificate issued by</h5>
            <h5 className="my-0">{}</h5>
          </div>
        </div>
        <div className="ml-auto h-4 w-4"></div>
      </div>

      <div className="flex w-full ">
        <Button.Group className="!mt-8">
          <Button className={`!rounded-b-none ${toggle ? '' : 'togle'}`} onClick={() => setToggle(true)}>
            CERTIFICATE
          </Button>
          <Button className={`!rounded-b-none ${toggle ? 'togle' : ''}`} onClick={() => setToggle(false)}>
            TRANSCRIPT
          </Button>
        </Button.Group>
        <div className="ml-auto h-4 w-4"></div>
      </div>

      <div
        className="flex w-full h-auto rounded-b-3xl rounded-tr-3xl"
        style={{
          minHeight: '500px',
          backgroundColor: '#e6e7ee',
          boxShadow: ` 5px 5px 10px #c4c4ca, -5px -5px 10px #ffffff `,
        }}
      ></div>
    </Content>
  )
}

const Content = styled.section`
  margin: 0px 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media (min-width: 1280px) {
    max-width: 1280px;
  }
  @media (min-width: 1024px) and (max-width: 1280px) {
    max-width: 1024px;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    max-width: 768px;
  }
  @media (max-width: 640px) {
    max-width: 640px;
  }
`

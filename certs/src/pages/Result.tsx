import { Button, Card, Col, Row, Spacer, Text } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CertificatePage from 'src/components/Certificate'
import Transcript from 'src/components/Transcript'
import { CertsRoute } from 'src/consts'
import { Certificate } from 'src/types'
import styled from 'styled-components'

type Props = {
  certificate: Certificate
}

export default function Result({ certificate }: Props) {
  const navigate = useNavigate()
  const [toggle, setToggle] = useState(true)
  useEffect(() => {
    console.log(certificate)
    if (!certificate.issuer.certificateId) {
      //navigate(CertsRoute.Index)
    }
  }, [certificate])

  return (
    <Content>
      <div className="flex w-full flex-row items-center align-middle">
        <div
          className=" w-auto h-auto flex items-center align-middle p-3 rounded-lg mr-auto"
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
            <h5 className="my-0">{certificate.issuer.name}</h5>
          </div>
        </div>
        <div className="ml-auto flex flex-row items-center justify-center">
          <Button auto ghost className="!border-0 !mr-3 !p-2">
            <span className="material-icons-round rounded-sm" style={{ color: '#e6e7ee', backgroundColor: '#44476a' }}>
              print
            </span>
          </Button>
          <Button auto ghost className="!border-0 !p-2">
            <span className="material-icons-round rounded-sm" style={{ color: '#e6e7ee', backgroundColor: '#44476a' }}>
              get_app
            </span>
          </Button>
        </div>
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

      {toggle ? (
        <CertificatePage certificate={certificate}></CertificatePage>
      ) : (
        <Transcript certificate={certificate}></Transcript>
      )}
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

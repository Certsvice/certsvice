import { Loading } from '@nextui-org/react'
import hash from 'object-hash'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UploadButton from 'src/components/UploadBtn'
import { CertsRoute, UploadMsg, UploadStatus } from 'src/consts'
import { Certificate } from 'src/types'
import styled from 'styled-components'

type Props = {
  onSet: (certificate: Certificate) => void
}

export default function Home({ onSet }: Props) {
  const navigate = useNavigate()
  const [dragOver, setDragOver] = useState(false)
  const [loading, setLoading] = useState(false)
  const [match, setMatch] = useState<UploadStatus>(UploadStatus.Match)
  //const { getStudent } = useWeb3()

  const getInput = async (file: FileList | null) => {
    try {
      const reader = new FileReader()
      setLoading(true)
      setMatch(UploadStatus.Match)
      console.log(file)
      if (file && file.length === 1) {
        reader.readAsText(file[0])
        reader.addEventListener('load', async () => {
          if (typeof reader.result === 'string') {
            const obj: Certificate = JSON.parse(reader.result)
            const certificateId: string = obj?.issuer?.certificateId ?? ''
            const certificateDataHash: string = hash(obj?.data) ?? ''
            //const certificateHash = await getStudent(certificateId)

            console.log(certificateDataHash)
            if (certificateDataHash === '3530dc59beca634a93a03c4c48432018a82b67fe' && certificateId) {
              onSet(obj)
              setMatch(UploadStatus.Match)
              navigate(CertsRoute.Result)
            } else if (!certificateId) {
              //onSet(obj)
              setLoading(false)
              setMatch(UploadStatus.Error)
            } else {
              setLoading(false)
              setMatch(UploadStatus.Tempered)
            }
          } else {
            setLoading(false)
            setMatch(UploadStatus.Error)
            // setData('')
          }
        })
      } else if (file && file.length > 1) {
        setLoading(false)
        setMatch(UploadStatus.Error)
        //alert error
      } else {
        setLoading(false)
        setMatch(UploadStatus.Error)
        //alert error
      }
    } catch (e) {
      setLoading(false)
      setMatch(UploadStatus.Error)
      alert('error')
    }
  }

  async function handleUpload(e: React.DragEvent<HTMLDivElement>, isDragOver: boolean, onDrop?: Promise<void>) {
    setDragOver(isDragOver)
    if (onDrop) {
      await onDrop
    }
  }
  return (
    <Content>
      <Description>
        <h1 className="thaiFont">คุณสามารถตรวจสอบ Certificate ของคุณได้ง่ายๆ ที่นี่</h1>
        <p>
          เพียงแค่นำไฟล์ของวางลงไปในช่อง Upload ด้านข้างนี้, Certsvice ก็จะทำการตรวจสอบ Certificate
          ของคุณว่าถูกต้องหรือไม่
        </p>
        <p style={{ fontWeight: 'bold' }}>ผ่านระบบ Blockchain ที่ปลอดภัยและมีความถูกต้อง</p>
        <p style={{ fontWeight: 'bold' }}>"ง่ายครบจบในที่เดียว".</p>
        <CertBox draggable={true}>
          <a
            href="/demoCertificate.json"
            download="demoCertificate"
            rel="noindex nofollow"
            className="cursor-grab"
            draggable="true"
          >
            <CertLogo src="https://img.icons8.com/ios-filled/100/44476a/certificate.png" alt="DemoCert"></CertLogo>
          </a>
        </CertBox>
      </Description>
      <div className="m-8"></div>
      <UploadBox
        onDragOver={(e) => handleUpload(e, true)}
        onDragLeave={(e) => {
          handleUpload(e, false)
        }}
        onDrop={(e) => handleUpload(e, false, getInput(e.dataTransfer.files))}
        style={{
          backgroundColor: `${loading || match === UploadStatus.Match ? '#e6e7ee' : '#ffe7ee'}`,
          boxShadow: `
          ${dragOver ? 'inset' : ''} 5px 5px 10px #c4c4ca,
          ${dragOver ? 'inset' : ''} -5px -5px 10px #ffffff `,
        }}
      >
        {loading ? (
          <>
            <Loading size="xl" css={{ color: '#44476a' }} />
            <h6 className="mt-4">{'Verifying Certificate...'}</h6>
          </>
        ) : (
          <Upload className={`${dragOver ? '!pointer-events-none' : ' pointer-events-auto'}`}>
            {match === UploadStatus.Match ? (
              <DragDrop>
                <img
                  style={{ pointerEvents: 'none', width: '100px' }}
                  src="https://img.icons8.com/ios/100/44476a/drag-and-drop.png"
                  alt="dragdrop"
                />
                <h6>{dragOver ? UploadMsg.DragOver : UploadMsg.DragLeave}</h6>
              </DragDrop>
            ) : (
              <>
                {match === UploadStatus.Tempered ? (
                  <DragDrop className="text-red-500 text-center ">
                    <div className="flex flex-row items-center mb-2">
                      <span className="material-icons-round text-5x mr-1">highlight_off</span>
                      <h4 className=" text-gray-800 mb-0">{UploadMsg.NotValid}</h4>
                    </div>
                    <h5>{UploadMsg.Tampered}</h5>
                    <h6>{UploadMsg.TamperedDetail}</h6>
                  </DragDrop>
                ) : (
                  <DragDrop className="text-red-500 text-center ">
                    <div className="flex flex-row items-center mb-2">
                      <span className="material-icons-round text-5x mr-1">highlight_off</span>
                      <h4 className=" text-gray-800 mb-0">{UploadMsg.NotValid}</h4>
                    </div>
                    <h5>{UploadMsg.Error}</h5>
                    <h6>{UploadMsg.ErrorDetail}</h6>
                  </DragDrop>
                )}
              </>
            )}

            <Separate className={`${match ? '' : 'text-red-500'}`}>
              <div></div>
              <p>or</p>
              <div></div>
            </Separate>
            <UploadButton match={match} getFile={async (file) => await getInput(file)}></UploadButton>
          </Upload>
        )}
      </UploadBox>
    </Content>
  )
}

const Separate = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 1rem 0;
  div {
    width: 33%;
    height: 1px;
    background-color: #44476a;
    opacity: 0.3;
  }
  p {
    padding: 0 2rem;
    font-size: 1rem;
  }
`

const DragDrop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h6 {
    margin: 0;
  }
`

const Upload = styled.div`
  border: none;
  width: 66%;
  border-radius: 50px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  z-index: 2;
  img {
    min-width: 100px;
    font-size: 10px;
  }
`

const UploadBox = styled.div`
  max-width: 500px;
  height: 500px;
  flex-wrap: wrap;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  cursor: pointer;
  width: 100%;
  border-radius: 50px;
  background: #e6e7ee;
  input {
    position: static;
    width: 100%;
    height: 100%;
    display: none;
  }
`

const CertLogo = styled.img`
  height: 80px;
  animation: pulsing 3s infinite alternate;
  cursor: move;
  @keyframes pulsing {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
`
const CertBox = styled.div`
  margin: 1.5rem 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: center;
  user-select: none;
  -webkit-user-drag: element;
`
const Description = styled.div`
  max-width: 400px;
  text-align: center;
  h1 {
    margin-bottom: 1rem;
    font-family: 'Noto Sans Thai', sans-serif;
  }
  p {
    font-family: 'Noto Sans Thai', sans-serif;
  }
`
const Content = styled.section`
  margin: 3rem 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media (min-width: 1280px) {
    max-width: 1280px;
    flex-direction: row;
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

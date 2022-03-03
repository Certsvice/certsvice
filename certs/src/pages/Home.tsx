import { useState } from 'react'
import styled from 'styled-components'
import hash from 'object-hash'
import { useWeb3 } from '../hooks/useWeb3'

type Props = {
  onSet: (data: []) => void
}

export default function Home({ onSet }: Props) {
  const [dropMsg, setDropMsg] = useState('Drag and drop your certsvice file')
  const [data, setData] = useState(String)
  const [hashData, setHashData] = useState(String)
  const { getStudent } = useWeb3()

  const getInput = async (file: any) => {
    console.log(file[0])
    const reader = new FileReader()
    if (file[0]) {
      reader.readAsText(file[0])
    }
    reader.addEventListener(
      'load',
      async () => {
        // this will then display a text file
        if (typeof reader.result === 'string') {
          const obj = JSON.parse(reader.result)
          setData(obj)
          setHashData(hash(obj.data))
          console.log(await getStudent('1'))
          onSet(await getStudent('1'))
          console.log('Data from file upload = ', hash(obj.data))
        } else {
          setData('')
        }
      },
      false
    )
  }
  return (
    <div className='w-full'>
      <Description>
        <h1>An easy way to check and verify your certificates</h1>
        <p>
          Whether you're a student or an employer, OpenCerts lets you verify the certificates you have of anyone from
          any institution. All in one place.
        </p>
        <CertBox>
          <CertLogo src="https://img.icons8.com/ios-filled/100/44476a/certificate.png" alt="DemoCert"></CertLogo>
        </CertBox>
      </Description>
      <UploadBox
        id="parent"
        onDragOver={(e) => {
          e.preventDefault()
          e.stopPropagation()
          document.getElementById('child')!.style.pointerEvents = 'none'
          document.getElementById('parent')!.style.boxShadow =
            'inset 5px 5px 10px #c4c4ca, inset -5px -5px 10px #ffffff'
          setDropMsg('Release to Upload')
        }}
        onDragLeave={(e) => {
          e.preventDefault()
          e.stopPropagation()
          document.getElementById('child')!.style.pointerEvents = 'auto'
          document.getElementById('parent')!.style.boxShadow = '5px 5px 10px #c4c4ca, -5px -5px 10px #ffffff'
          setDropMsg('Drag and drop your certsvice file')
        }}
        onDrop={(e) => {
          e.preventDefault()
          e.stopPropagation()
          document.getElementById('child')!.style.pointerEvents = 'auto'
          document.getElementById('parent')!.style.boxShadow = '5px 5px 10px #c4c4ca, -5px -5px 10px #ffffff'
          getInput(e.dataTransfer.files)
          setDropMsg('Drag and drop your certsvice file')
        }}
      >
        <input
          id="getUpload"
          type="file"
          onChange={(e) => getInput(e.target.files)}
          onClick={(e) => (e.currentTarget.value = '')}
        ></input>
        <Upload id="child">
          <img src="https://img.icons8.com/ios/100/44476a/drag-and-drop.png" alt="dragdrop" />
          <DragDrop>
            <h6></h6>
          </DragDrop>
          <Separate>
            <div></div>
            <p>or</p>
            <div></div>
          </Separate>
          <UploadBtn htmlFor="getUpload">Choose File</UploadBtn>
        </Upload>
      </UploadBox>
    </div>
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
    margin-bottom: 0;
  }
`

const DragDrop = styled.div`
  h6 {
    margin: 1rem 0 0;
  }
`

const UploadBtn = styled.label`
  border: none;
  color: white;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 7px;
  background: #44476a;
  &:hover {
    background: white;
    color: #44476a;
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

const UploadBox = styled.label`
  max-width: 500px;
  height: 500px;
  flex-wrap: wrap;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;

  width: 100%;
  border-radius: 50px;
  background: #e6e7ee;
  box-shadow: 5px 5px 10px #c4c4ca, -5px -5px 10px #ffffff;

  input {
    position: static;
    width: 100%;
    height: 100%;
    display: none;
  }

  /* &:hover {
    box-shadow: inset 5px 5px 10px #c4c4ca, inset -5px -5px 10px #ffffff;
  } */
`

const CertLogo = styled.img`
  height: 80px;
  animation: pulsing 3s infinite alternate;
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
`
const Description = styled.div`
  max-width: 350px;
  text-align: center;
  h1 {
    margin-bottom: 1rem;
  }
`

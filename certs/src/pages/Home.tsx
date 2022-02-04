import styled from 'styled-components'

export default function Home() {
  return (
    <>
      <Description>
        <h1>An easy way to check and verify your certificates</h1>
        <p>
          Whether you're a student or an employer, OpenCerts lets you verify the certificates you have of anyone from any institution. All
          in one place.
        </p>
        <CertBox>
          <CertLogo src="https://img.icons8.com/ios-filled/100/44476a/certificate.png" alt="DemoCert"></CertLogo>
        </CertBox>
      </Description>
      <UploadBox>
        <input></input>
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
    </>
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

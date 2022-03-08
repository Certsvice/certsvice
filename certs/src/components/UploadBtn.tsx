import { UploadBtnMsg, UploadStatus } from 'src/consts'
import styled from 'styled-components'

type Props = {
  match: UploadStatus
  getFile: (file: FileList | null) => void
}

export default function UploadButton({ match, getFile }: Props) {
  return (
    <UploadBtn
      className="cursor-pointer"
      style={{ backgroundColor: `${match === UploadStatus.Match ? '#44476a' : '#a91e2c'} ` }}
    >
      {match === UploadStatus.Match ? UploadBtnMsg.ChooseFile : UploadBtnMsg.TryAnother}
      <input
        id="getFile"
        type="file"
        accept=".json"
        onChange={(e) => getFile(e.target.files)}
        onClick={(e) => (e.currentTarget.value = '')}
      ></input>
    </UploadBtn>
  )
}

const UploadBtn = styled.label`
  border: none;
  color: white;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 7px;
  background: #44476a;
  &:hover {
    background: white !important;
    color: #44476a;
  }
`

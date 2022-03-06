import { Button, message, Upload } from 'antd'
import { useState } from 'react'
import { Data1 } from 'types'
import hash from 'object-hash'
import { dayjs } from 'helpers/datetime'
import { useWeb3 } from 'hooks/useWeb3'
import { useApi } from 'hooks/useApi'

const { Dragger } = Upload

export default function AddStudent() {
  const { getUniversity, addStudent } = useWeb3()
  const { createStudent } = useApi()
  const [loading, setLoading] = useState(false)

  const success = (msg?: string) => {
    message.success(msg)
  }

  const error = (msg?: string) => {
    message.error(`${msg}`)
  }

  const getInput = async (file: FileList | Blob[] | null) => {
    try {
      const reader = new FileReader()
      setLoading(true)
      if (file && file[0]) {
        reader.readAsText(file[0])
        reader.addEventListener('load', async () => {
          if (typeof reader.result === 'string') {
            const obj: Data1 = JSON.parse(reader.result)
            const certificateDataHash = hash(obj.data)
            const certificateId = Date.now()
            console.log(obj, certificateDataHash, certificateId)
            const university = await getUniversity()
            await addStudent(certificateDataHash, certificateId.toString())
            await createStudent(obj.data, certificateId.toString(), university)
            success('ลงทะเบียนสำเร็จ')
          } else {
            error('ไม่สามารถลงทะเบียนได้ โปรติดต่อ Admin')
          }
        })
        setLoading(false)
      } else {
        setLoading(false)
        error('ไม่สามารถลงทะเบียนได้ โปรติดต่อ Admin')
      }
    } catch {
      setLoading(false)
      error('ไม่สามารถลงทะเบียนได้ โปรติดต่อ Admin')
    }
  }

  async function handleUpload(e: React.DragEvent<HTMLDivElement>, onDrop?: Promise<void>) {
    e.preventDefault()
    e.stopPropagation()
    if (onDrop) {
      await onDrop
    }
  }
  return (
    <div className=" w-3/5">
      <div
        className={`flex flex-col items-center justify-center p-8 rounded-xl `}
        style={{ backgroundColor: '#f5f6f7', border: '2px dashed #5468ff' }}
        onDrop={(e) => {
          handleUpload(e, getInput(e.dataTransfer.files))
        }}
        onDragOver={handleUpload}
        onDragLeave={handleUpload}
      >
        <div>
          <Button type="primary" disabled={loading} className=" w-auto">
            <span className="material-icons-outlined mr-2">upload</span>
            <label>
              <input
                className="hidden"
                type="file"
                accept=".json"
                onChange={(e) => getInput(e.target.files)}
                onClick={(e) => (e.currentTarget.value = '')}
              ></input>
              Choose File
            </label>
          </Button>
        </div>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
      </div>
    </div>
  )
}

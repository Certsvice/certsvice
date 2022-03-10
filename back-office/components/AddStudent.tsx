import { Button, message, Modal, Result, Steps, Upload } from 'antd'
import { useState } from 'react'
import { Data1, Issuer } from 'types'
import hash from 'object-hash'
import { dayjs } from 'helpers/datetime'
import { useWeb3 } from 'hooks/useWeb3'
import { useApi } from 'hooks/useApi'
import { LoadingOutlined } from '@ant-design/icons'

const { Dragger } = Upload

export default function AddStudent() {
  const { getUniversity, addStudent } = useWeb3()
  const { createStudent, getWallet } = useApi()
  const { Step } = Steps
  const [step, setStep] = useState<number>(0)
  const [status, setStatus] = useState<'error' | 'wait' | 'process' | 'finish'>('process')
  const [visible, setVisible] = useState(false)

  const success = (msg?: string) => {
    message.success(msg)
  }

  const error = (msg?: string) => {
    message.error(`${msg}`)
  }

  const getInput = async (file: FileList | Blob[] | null) => {
    try {
      setVisible(true)
      setStatus('process')
      setStep(0)
      const reader = new FileReader()
      if (file && file[0]) {
        reader.readAsText(file[0])
        reader.addEventListener('load', async () => {
          try {
            if (typeof reader.result === 'string') {
              const obj: Data1 = JSON.parse(reader.result)
              const university = await getUniversity()
              const wallet = await getWallet(university)
              const certificateId = Date.now()
              const DataToHash: { data: Data1; issuer: Issuer } = {
                data: obj,
                issuer: { name: wallet.owner.name, certificateStore: wallet.address, certificateId: certificateId.toString() },
              }
              const certificateDataHash = hash(DataToHash)
              setStep(0)
              await addStudent(certificateDataHash, certificateId.toString())
              setStep(1)
              await createStudent(obj.data, certificateId.toString(), wallet._id)
              setStep(2)
              setStatus('finish')
              success('ลงทะเบียนสำเร็จ')
            } else {
              setStatus('error')
              error('ไม่สามารถลงทะเบียนได้ โปรติดต่อ Admin')
            }
          } catch {
            setStatus('error')
            error('ไม่สามารถลงทะเบียนได้ โปรติดต่อ Admin')
          }
        })
      } else {
        setStatus('error')
        error('ไม่สามารถลงทะเบียนได้ โปรติดต่อ Admin')
      }
    } catch {
      setStatus('error')
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
      <Modal
        title={<h5 className=" font-bold">กำลังดำเนินการ โปรดรอซักครู่</h5>}
        centered
        visible={visible}
        closable={false}
        keyboard={false}
        footer={
          step === 2 || status === 'error' ? (
            <Button type="primary" onClick={() => setVisible(false)}>
              OK
            </Button>
          ) : null
        }
        width={1000}
      >
        <div className="flex flex-col items-center mt-6 mb-6">
          {status === 'error' ? (
            <Result status="error" title="มีบางอย่างเกิดขึ้น" subTitle="ไม่สามารถลงทะเบียนได้ โปรติดต่อ Admin"></Result>
          ) : (
            <Steps current={step} status={status}>
              <Step
                status={step === 0 ? status : undefined}
                icon={step === 0 ? <LoadingOutlined /> : undefined}
                title="Upload To Contract"
                description="Regis student to smart contract"
              />
              <Step
                status={step === 1 ? status : undefined}
                icon={step === 1 ? <LoadingOutlined /> : undefined}
                title="Verifying student data"
                description="Store data to database"
              />
              <Step status={step === 2 ? status : undefined} title="Done" description="Everything is done" />
            </Steps>
          )}
        </div>
      </Modal>
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
          <Button type="primary" disabled={visible} className=" w-auto">
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

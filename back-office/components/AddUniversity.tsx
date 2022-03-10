import { Form, Input, Button, Select, message, Modal, Steps, Alert, Result } from 'antd'
import { useApi } from 'hooks/useApi'
import { useWeb3 } from 'hooks/useWeb3'
import { useEffect, useState } from 'react'
import { Regis, University } from 'types'
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons'

export default function AddUniversity() {
  const { Option } = Select
  const [data, setData] = useState<University[]>([])
  const { getUniversitys, signUp } = useApi()
  const { addUniversity } = useWeb3()
  const { Step } = Steps
  const [step, setStep] = useState<number>(0)
  const [status, setStatus] = useState<'error' | 'wait' | 'process' | 'finish'>('process')
  const [visible, setVisible] = useState(false)

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  }

  const [form] = Form.useForm()

  const onFinish = async (values: Regis) => {
    try {
      setVisible(true)
      setStatus('process')
      setStep(0)
      const res = await addUniversity({ address: values.address, owner: values.owner })
      if (res.status) {
        setStep(1)
        await signUp({ address: values.address, owner: values.owner })
        setStep(2)
        setStatus('finish')
        success('ลงทะเบียนสำเร็จ')
      } else {
        setStatus('error')
        error('ไม่สามารถลงทะเบียนได้ โปรติดต่อ Admin')
      }
    } catch {
      error('ไม่สามารถลงทะเบียนได้ โปรติดต่อ Admin')
      setStatus('error')
    }
  }

  const onReset = () => {
    form.resetFields()
  }

  const success = (msg?: string) => {
    message.success(msg)
  }

  const error = (msg?: string) => {
    message.error(`${msg}`)
  }

  async function fetchWallets() {
    try {
      const res = await getUniversitys()
      if (res) {
        setData(res)
      }
    } catch (e) {
      error()
    }
  }
  useEffect(() => {
    fetchWallets()
  }, [])

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
                description="Regis university to smart contract"
              />
              <Step
                status={step === 1 ? status : undefined}
                icon={step === 1 ? <LoadingOutlined /> : undefined}
                title="Verifying user"
                description="Verifying user and add to database"
              />
              <Step status={step === 2 ? status : undefined} title="Done" description="Everything is done" />
            </Steps>
          )}
        </div>
      </Modal>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item name="address" label="Wallet Address" hasFeedback rules={[{ required: true, message: 'Please wallet address!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="owner" label="University Name" hasFeedback rules={[{ required: true, message: 'Please select your university!' }]}>
          <Select placeholder="Select a university" allowClear className="!flex !items-center !justify-center !align-middle">
            {data.map((university) => {
              return (
                <Option value={university._id} key={university.name}>
                  {university.name}
                </Option>
              )
            })}
          </Select>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" disabled={visible}>
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset} disabled={visible}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

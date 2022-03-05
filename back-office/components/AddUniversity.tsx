import { Form, Input, Button, Select } from 'antd'
import { useApi } from 'hooks/useApi'
import { useWeb3 } from 'hooks/useWeb3'
import { useEffect, useState } from 'react'
import { Regis, University } from 'types'

export default function AddUniversity() {
  const { Option } = Select
  const [data, setData] = useState<University[]>([])
  const { getUniversitys, signUp } = useApi()
  const { addUniversity } = useWeb3()

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
      const res = await addUniversity({ address: values.address, owner: values.owner })
      await signUp({ address: values.address, owner: values.owner })
    } catch (e) {
      console.log(e)
    }
  }

  const onReset = () => {
    form.resetFields()
  }
  async function fetchWallets() {
    try {
      const res = await getUniversitys()
      if (res) {
        setData(res)
      }
    } catch (e) {
      console.error(e)
    }
  }
  useEffect(() => {
    fetchWallets()
  }, [])

  return (
    <div className=" w-3/5">
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
        <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}>
          {({ getFieldValue }) =>
            getFieldValue('gender') === 'other' ? (
              <Form.Item name="customizeGender" label="Customize Gender" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            ) : null
          }
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

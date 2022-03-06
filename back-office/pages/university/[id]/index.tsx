import { useApi } from 'hooks/useApi'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Certificate } from 'types'
import { Descriptions, Badge, Tag, PageHeader } from 'antd'
import { dayjs } from 'helpers/datetime'

const EditUniversity: NextPage = () => {
  const router = useRouter()
  const [certificate, setCertificate] = useState<Certificate>()
  const { getStudent } = useApi()
  const { id } = router.query

  async function fetchWallet() {
    try {
      if (typeof id === 'string') {
        const res = await getStudent(id?.toString() ?? '')
        console.log(res, 'wallet')
        if (res) {
          setCertificate(res)
        }
      }
    } catch (e) {
      console.error(e)
      router.replace('/not-found')
    }
  }
  useEffect(() => {
    fetchWallet()
  }, [id])

  return (
    <div className="container mx-auto">
      <PageHeader ghost={false} onBack={() => router.replace('/university')} title="Wallet address"></PageHeader>
      {certificate && (
        <Descriptions bordered>
          <Descriptions.Item label="ID">{}</Descriptions.Item>
          <Descriptions.Item label="ADDRESS" span={2}>
            {}
          </Descriptions.Item>
          <Descriptions.Item label="CREATED AT">{}</Descriptions.Item>
          <Descriptions.Item label="UPDATED AT" span={2}>
            {}
          </Descriptions.Item>
          <Descriptions.Item label="Status" span={3}>
            {}
          </Descriptions.Item>
          <Descriptions.Item label="UNIVERSITY NAME">{}</Descriptions.Item>
          <Descriptions.Item label="UNIVERSITY CODE">{}</Descriptions.Item>
        </Descriptions>
      )}
    </div>
  )
}

export default EditUniversity

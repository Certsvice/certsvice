import { Descriptions, PageHeader, Tag } from 'antd'
import { useApi } from 'hooks/useApi'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Wallet } from 'types'

const WalletPage: NextPage = () => {
  const router = useRouter()
  const [wallet, setWallet] = useState<Wallet>()
  const { getWallet } = useApi()
  const { id } = router.query

  async function fetchWallet() {
    try {
      if (typeof id === 'string') {
        const res = await getWallet(id?.toString() ?? '')
        if (res) {
          setWallet(res)
        }
      }
    } catch (e) {
      console.error(e)
      router.push('/not-found')
    }
  }
  useEffect(() => {
    fetchWallet()
  }, [id])

  return (
    <div className="container mx-auto">
      <PageHeader ghost={false} onBack={() => router.push('/')} title="Wallet address"></PageHeader>
      {wallet && (
        <Descriptions bordered>
          <Descriptions.Item label="ID">{wallet._id}</Descriptions.Item>
          <Descriptions.Item label="ADDRESS" span={2}>
            {wallet.address}
          </Descriptions.Item>
          <Descriptions.Item label="CREATED AT">{wallet.createdAt ?? ''}</Descriptions.Item>
          <Descriptions.Item label="UPDATED AT" span={2}>
            {wallet.updatedAt ?? ''}
          </Descriptions.Item>
          <Descriptions.Item label="Status" span={3}>
            <Tag color={wallet.verify ? 'green' : 'volcano'}>{wallet.verify ? 'verified'.toUpperCase() : 'not verified'.toUpperCase()}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="UNIVERSITY NAME">{wallet.owner.name}</Descriptions.Item>
          <Descriptions.Item label="UNIVERSITY CODE">{wallet.owner.code}</Descriptions.Item>
        </Descriptions>
      )}
    </div>
  )
}

export default WalletPage

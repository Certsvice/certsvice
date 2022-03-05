import { useApi } from 'hooks/useApi'
import { useEffect, useMemo, useState } from 'react'
import { Table, Tag } from 'antd'
import { WalletColumn } from 'types'
import { useRouter } from 'next/router'

export default function WalletTable() {
  const [data, setData] = useState<WalletColumn[]>([])
  const router = useRouter()
  const { getWallets } = useApi()

  async function fetchWallet() {
    try {
      const res = await getWallets()
      if (res) {
        const data = res.map((res: any) => {
          return { ...res, owner: res.owner.name, verify: `${res.verify ? 'verified' : 'not verified'}` }
        })
        setData(data)
      }
    } catch (e) {
      console.error(e)
    }
  }
  useEffect(() => {
    fetchWallet()
  }, [])

  const columns = [
    { title: 'ID', dataIndex: '_id', key: '_id', render: (text: string) => <a onClick={() => router.push(`/wallet/${text}`)}>{text}</a> },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    { title: 'University', dataIndex: 'owner', key: 'owner' },
    {
      title: 'Status',
      dataIndex: 'verify',
      key: 'verify',
      render: (tags: string) => {
        return (
          <Tag color={tags === 'true' ? 'green' : 'volcano'} key={tags}>
            {tags.toUpperCase()}
          </Tag>
        )
      },
    },
  ]

  return <Table columns={columns} dataSource={data} />
}

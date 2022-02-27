import { Table, Tag } from 'antd'
import { useApi } from 'hooks/useApi'
import { useEffect, useState } from 'react'
import { WalletColumn } from 'types'

export default function WalletTable() {
  const [data, setData] = useState<WalletColumn[]>([])
  const { getWallets } = useApi()

  async function fetchWallet() {
    try {
      const res = await getWallets()
      if (res) {
        const data = res.map((res) => {
          return { ...res, owner: res.owner.name, verify: `${res.verify ? 'verified' : 'not verified'}` }
        })
        console.log(data)
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
    { title: 'ID', dataIndex: '_id', key: '_id', render: (text:string) => <a>{text}</a> },
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

  return <Table columns={columns} dataSource={data} size="middle" />
}

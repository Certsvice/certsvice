import { useApi } from 'hooks/useApi'
import { useEffect, useMemo, useState } from 'react'
import { Button, Table, Tag } from 'antd'
import { Certificate, WalletColumn } from 'types'
import { useRouter } from 'next/router'
import { useWeb3 } from 'hooks/useWeb3'

export default function StudentTable() {
  const [data, setData] = useState<Certificate[]>([])
  const router = useRouter()
  const { deleteStudent } = useWeb3()
  const { getStudents } = useApi()

  async function fetchWallet() {
    try {
      const res = await getStudents()
      if (res) {
        const data = res.map((res: Certificate) => {
          return {
            _id: res._id,
            name: res.data.name,
            sid: res.data.studentId,
            addmissionDate: res.data.addmissionDate,
            graduationDate: res.data.graduationDate,
            program: res.data.program,
            delete: { certificateId: res.certificateId, _id: res._id },
          }
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
    { title: 'ID', dataIndex: '_id', key: '_id', render: (text: string) => <a>{text}</a> },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'StudentId', dataIndex: 'sid', key: 'sid' },
    { title: 'AddmissionDate', dataIndex: 'addmissionDate', key: 'addmissionDate' },
    { title: 'GraduationDate', dataIndex: 'graduationDate', key: 'graduationDate' },
    { title: 'Program', dataIndex: 'program', key: 'program' },
    {
      title: 'Option',
      dataIndex: 'delete',
      key: 'delete',
      render: (data: any) => (
        <>
          <span
            className="material-icons-outlined text-red-600 text-2xl cursor-pointer mr-4"
            onClick={async () => {
              await deleteStudent(data.certificateId)
            }}
          >
            delete_forever
          </span>
          <span className="material-icons-outlined text-blue-600 text-2xl cursor-pointer" onClick={() => {}}>
            file_download
          </span>
        </>
      ),
    },
  ]

  return <Table columns={columns} dataSource={data} />
}

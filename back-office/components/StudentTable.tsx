import { useApi } from 'hooks/useApi'
import { SetStateAction, useEffect, useMemo, useState } from 'react'
import { Button, Radio, RadioChangeEvent, Table, Tag } from 'antd'
import { Certificate, WalletColumn } from 'types'
import { useRouter } from 'next/router'
import { useWeb3 } from 'hooks/useWeb3'

export default function StudentTable() {
  const [data, setData] = useState<Certificate[]>([])
  const router = useRouter()
  const [year, setYear] = useState(2022)
  const { deleteStudent, getUniversity } = useWeb3()
  const { getStudents, getWallet } = useApi()

  async function fetchWallet() {
    try {
      const university = await getUniversity()
      const wallet = await getWallet(university)
      const res = await getStudents(wallet._id, year.toString())
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

  const handleYear = (e: RadioChangeEvent) => {
    setYear(e.target.value)
  }

  useEffect(() => {
    fetchWallet()
  }, [year])

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

  return (
    <>
      <Radio.Group value={year} buttonStyle="solid" onChange={handleYear}>
        <Radio.Button value={2022}>2022</Radio.Button>
        <Radio.Button value={2023}>2023</Radio.Button>
        <Radio.Button value={2024}>2024</Radio.Button>
      </Radio.Group>
      <Table columns={columns} dataSource={data} />
    </>
  )
}

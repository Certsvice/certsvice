import { Radio, RadioChangeEvent, Table } from 'antd'
import { useApi } from 'hooks/useApi'
import { useWeb3 } from 'hooks/useWeb3'
import { useEffect, useState } from 'react'
import { Certificate, Data, Issuer } from 'types'
import hash from 'object-hash'

export default function StudentTable() {
  const [data, setData] = useState<Certificate[]>([])
  const [file, setFile] = useState<{ data: Data; issuer: Issuer }>()
  const [year, setYear] = useState(2022)
  const { deleteStudent, getUniversity } = useWeb3()
  const { getStudents, getWallet, deleteStudentApi } = useApi()

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
            delete: {
              certificateId: res.certificateId,
              _id: res._id,
              data: res.data,
              issuer: {
                name: res.issuer.owner.name,
                certificateStore: res.issuer.address,
                certificateId: res.certificateId,
              },
            },
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
              await deleteStudentApi(data._id)
            }}
          >
            delete_forever
          </span>
          <span
            className="material-icons-outlined text-blue-600 text-2xl cursor-pointer"
            onClick={async () => {
              const fileName = 'certsvice'
              const json = JSON.stringify({
                data: data.data,
                issuer: data.issuer,
              })
              const blob = new Blob([json], { type: 'application/json' })
              const href = await URL.createObjectURL(blob)
              const link = document.createElement('a')
              link.href = href
              link.download = fileName + '.json'
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
            }}
          >
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

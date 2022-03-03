import { useApi } from 'hooks/useApi'
import { useEffect, useMemo, useState } from 'react'
import { Column, useTable } from 'react-table'
import { WalletColumn } from 'types'

export default function WalletTable() {
  const [data, setData] = useState<WalletColumn[]>([])
  const { getWallets } = useApi()

  async function fetchWallet() {
    try {
      const res = await getWallets()
      if (res) {
        const data = res.map((res:any) => {
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

  const columns = useMemo<Column<WalletColumn>[]>(
    () => [
      {
        Header: 'ID.',
        accessor: '_id',
        width: '100px',
      },
      {
        Header: 'Address',
        accessor: 'address',
      },
      {
        Header: 'University',
        accessor: 'owner',
      },
      {
        Header: 'Status',
        accessor: 'verify',
        width: '50px',
      },
    ],
    []
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data })

  return (
    <div className="pb-2">
      <div className="flex flex-col p-4 pb-6 bg-white rounded-t">
        <div className="relative w-7/12">
          <input className="w-full search-input" type="text" placeholder="พิมพ์สิ่งที่ต้องการค้นหา" />
          <div className="search-icon">
            <img src="/search.png" alt="" width="20px" height="20px" />
          </div>
        </div>
      </div>
      <table {...getTableProps()} cellSpacing="0" cellPadding="0">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, i) => (
                <th {...column.getHeaderProps({ style: { width: column.width } })}>
                  <div className={`cell cell-header ${i === 0 ? 'rounded-bl' : ''} ${i === headerGroup.headers.length - 1 ? 'rounded-br' : ''}`}>
                    {column.render('Header')}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, i) => {
                  const content = cell.render('Cell')
                  const cellContent = (
                    <div
                      className={`cell cell-content truncate ${i === 0 ? 'rounded-l' : ''} 
                      ${i === row.cells.length - 1 ? `rounded-r ${cell.value === 'true' ? 'text-green-600' : 'text-red-600'}` : ''}`}
                    >
                      {content}
                    </div>
                  )
                  return <td {...cell.getCellProps({ style: { width: cell.column.width } })}>{cellContent}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

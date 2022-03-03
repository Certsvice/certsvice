import { useApi } from 'hooks/useApi'
import { useLocalStorage } from 'hooks/useLocalStorage'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Column, useTable } from 'react-table'
import { Wallet, WalletColumn } from 'types'
import Table from './Table'

export default function AddUniversity() {
  const [data, setData] = useState<WalletColumn[]>([])
  const { getWallets } = useApi()

  async function fetchWallet() {
    try {
      const res = await getWallets()
      if (res) {
        const data = res.map((res: any) => {
          return { ...res, owner: res.owner.name, verify: `${res.verify}` }
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

  return (
    <div className="pb-2">
      <div className="flex flex-col p-4 pb-6 bg-white rounded-t">
        <div className="relative w-7/12"></div>
      </div>
    </div>
  )
}

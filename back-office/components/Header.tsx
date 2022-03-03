import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Menu } from 'antd'
import { MenuState, NavbarState } from 'consts'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useGuardContext } from './GuardRoute'

export function Header() {
  const router = useRouter()
  const { logout } = useGuardContext()

  return (
    <div className="container mx-auto bg-white h-12 flex items-center justify-end">
      <div className="flex justify-between text-base">
        <div className="flex space-x-6 text-gray-400"></div>
        <div className="flex items-center text-base text-blue-600" onClick={logout}>
          <button>ออกจากระบบ</button>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </div>
      </div>
      {/* <div className="flex w-full">
        {window.location.pathname === '/' ? null : <button onClick={() => router.back()}>{'< '}ย้อนกลับ</button>}
        <div className="items-start ml-auto">
          <button onClick={() => router.replace('/history')}>ประวัติการจองรถ</button>
        </div>
        <div className="items-start ml-auto">
          <button onClick={logout}>ออกจากระบบ</button>
        </div>
      </div>
      <style jsx>{`
        button {
          color: #666666;
        }
      `}</style> */}
    </div>
  )
}

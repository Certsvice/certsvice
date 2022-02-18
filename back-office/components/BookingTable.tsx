/* eslint-disable react/jsx-key */
import { useLocalStorage } from 'hooks/useLocalStorage'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Column, useTable } from 'react-table'



export default function BookingTable() {

  return (
    <div className="pb-6">
      <div className="flex p-4 pb-6 bg-white rounded-t">
        <div className="relative w-7/12">
          <input
            className="w-full search-input"
            type="text"
            placeholder="พิมพ์สิ่งที่ต้องการค้นหา"
            value={""}
          />
          <div className="search-icon">
            <img src="/search.png" alt="" width="20px" height="20px" />
          </div>
        </div>
      </div>

    </div>
  )
}

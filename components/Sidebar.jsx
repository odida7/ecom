import Link from 'next/link'
import React from 'react'

export default function Sidebar() {
  return (
    <div className='flex flex-col px-8 py-2 gap-4 bg-blue-500 text-white text-lg h-screen w-1/5'>
      <Link href='/dashboard'>DashBoard</Link>
      <Link href='/categories'>Categories</Link>
      <Link href='/products'>Products</Link>
    </div>
  )
}

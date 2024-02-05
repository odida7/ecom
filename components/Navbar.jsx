import { auth } from '@/app/auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

export default async function Navbar() {

    const session = await auth()

  return (
    <div  className='flex flex-row items-center justify-between px-8 py-3 bg-blue-500 text-white'>

      <Link href='/'>
        <span className=''>
          <span className='text-4xl text-gray-900 font-medium'>e</span>
          <span className='text-2xl text-gray-700 font-bold'>.mark</span>
        </span> 
      </Link>
       
      <div className='flex flex-row items-center gap-3'>
        <span>{session?.user?._doc?.username}</span>

        <button onClick={signOut}>Logout</button>
      </div>
      
      
    </div>
  )
}

'use client'

import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


export default function page({params}) {
    const id = params?.id;
    console.log('catId:', id);
    const router = useRouter()
    
    const {data: session, status} = useSession()
 
     if (status === "unauthenticated") {
    router?.push("/login");
    } 
     
    /////////////delete category
    const handleDelete = async()=>{
        const res = await fetch(`/api/category/${id}`, {
            method: 'DELETE'
        })
        if(res.status === 200){
            router?.push('/categories')
        }
    }

  return (
    <div className='flex flex-col items-center mt-12 w-full'>
      <h1 className='text-xl sm:text-4xl'>Delete this Category</h1>


        <div className='p-12 flex flex-col gap-8 relative justify-between rounded-lg m-4 bg-slate-200'>
            <span className='flex flex-col text-center bg-red-100 text-slate-500 rounded-md p-4'>
                Are you sure you want to delete this category?<br/>
                <span className='text-red-600'> Warning, </span> once you go through with this decision you will<br/> lose this data forever.
            </span>

            <div className='flex flex-row m-4 gap-4 items-center justify-center'>
                <button 
                onClick={handleDelete}
                className='bg-gray-800 text-gray-100 px-4 p-1 rounded hover:bg-red-600'
                >
                    Yes
                </button>

                <Link href='/categories'>
                    <button className='bg-gray-500 hover:bg-blue-500 text-gray-100 p-1 rounded px-4'>
                        Back
                    </button>
                </Link>
            </div>
        </div>
      
    </div>
  )
}
 
'use client'

import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';


export default function page({params}) {
    const {data: session, status} = useSession()
    console.log('session:', session?.user?._doc?._id)
    const currentUserId = session?.user?._doc?._id;
    const router = useRouter()
    const id = params?.id;
    //console.log('id:', id);

    
    if (status === "unauthenticated") {
    router?.push("/login");
    } 

    /////////////delete user
    const handleDelete = async()=>{
        if(id){
            try{
                const res = await fetch(`/api/user/${id}/delete`, {
                    method: 'DELETE'
                })
                if(res.status === 200){
                    if(id !== currentUserId){
                      router?.push('/')
                    }else{
                       router.push('/login')
                    }
                
                }
            }catch(error){
                console.log(error.message)
            }
        } 
      
       
    }

  return (
     <div className='flex flex-col items-center mt-12 w-full'>
      <h1 className='text-xl sm:text-4xl'>Delete this Account</h1>


        <div className='p-12 flex flex-col gap-8 relative justify-between rounded-lg m-4 bg-slate-200'>
            <span className='flex flex-col text-center bg-red-100 text-slate-500 rounded-md p-4'>
                Are you sure you want to delete this account?<br/>
                <span className='text-red-600'> Warning, </span> once you go through with this decision you will<br/> lose this account forever.
            </span>

            <div className='flex flex-row m-4 gap-4 items-center justify-center'>
                <button 
                onClick={handleDelete}
                className='bg-gray-800 text-gray-100 px-4 p-1 rounded hover:bg-red-600'
                >
                    Yes
                </button>

                <Link href='/'>
                    <button className='bg-gray-500 hover:bg-blue-500 text-gray-100 p-1 rounded px-4'>
                        Back
                    </button>
                </Link>
            </div>
        </div>
      
    </div>
  )
}

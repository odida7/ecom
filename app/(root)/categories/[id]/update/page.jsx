'use client'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form';


export default function page({params}) {
    const id = params?.id;
   // console.log('catId:', id);
    const router = useRouter()
    
    const {data: session, status} = useSession()
    const [ categories, setCategories] = useState([]);
  
     if (status === "unauthenticated") {
    router?.push("/login");
    } 

    useEffect(()=>{
       const fetchCategory = async()=>{
            try{
            const res = await fetch(`/api/category/${id}`);
            const data = res.json();
            console.log('categorydata:', data)
            setCategories(data)
        }catch(error){
            console.error('Error fetching products:', error.message);
        }  
       }
        

       fetchCategory();
    }, [])

    const {
    handleSubmit,
    register,
    reset,
    formState: {errors},
  } = useForm();

const onSubmit = async (formData) => {
    try {
        const res = await fetch(`/api/category/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData) // Include updated category data in request body
        });
        if (res.ok) {
            // Category updated successfully
            router.push('/categories');
        } else {
            throw new Error('Failed to update category');
        }
    } catch (error) {
        console.error('Error updating category:', error);
    }
}

     
  return (
    <div className='flex flex-col items-center mt-12 w-full'>
      
        <h2 className='flex flex-row text-lg text-gray-500 text-center'>Update Category</h2>
   
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className='flex flex-col gap-2 w-full m-8 items-center'
        >
            <fieldset className='flex flex-col w-full items-center'>
                <input 
                  type='text' 
                  name='category'
                  defaultValue={categories?.category}
                  placeholder='category name'
                  className='outline-none border border-gray-700 rounded-md w-1/2 p-2'
                  {...register('category', {required: true})}
                />
                {errors.category?.type == 'required' && (
                    <p className='text-xs text-yellow-600'>This field is required</p>
                )}
            </fieldset>

            <div className='w-full flex flex-row items-center justify-center gap-5'>
                <button type="submit" className='bg-blue-400 text-white p-1 rounded hover:bg-blue-300'>
                    Update
                </button>


                <Link href='/categories'>
                    <button className='bg-gray-500 hover:bg-green-500 text-gray-100 p-1 rounded px-4'>
                        Back
                    </button>
                </Link>
            </div>

            

        </form>

   
        
    </div>
  )
}

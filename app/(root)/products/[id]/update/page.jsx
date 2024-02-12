'use client'

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

export default function page({params}) {
    const id = params?.id;
    const { data: session, status } = useSession();
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(false); // State for loading indicator

    if (status === 'unauthenticated') {
    router.push('/login');
    }

    const userId = session?.user?._doc?._id;


    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await fetch('/api/category');
                const data = await response.json();
                 console.log('categoryData:', data);
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }   
            //router.refresh();
        };

        fetchCategory();
    }, []);

    const {
        handleSubmit,
        register,
        reset,
        formState: {errors},
    } = useForm();

    /////////onsubmit
    const onSubmit =async(formData)=>{
      try {
      setLoading(true); // Set loading to true when form is submitted
      const res = await fetch(`/api/product/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ userId, categoryId: selectedCategory, ...formData }),
      });

      if (res.ok) {
        reset();
        router.push('/products')
      } else {
        throw new Error('Failed to create product');
      }
    } catch (error) {
      console.error('Error submitting form:', error.message);
    } finally {
      setLoading(false); // Set loading to false after form submission completes
    }
    }

  return (
    <div className='flex flex-col p-2 gap-4 w-full'>
       <form 
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col items-center m-2 p-4 shadow-xl w-full rounded-sm'>

         

         <fieldset className='flex flex-col m-4 p-2 gap-1 w-full'>
            <input 
              type='text'
              name='name'
              placeholder='product'
              className='border-b-2 bg-transparent outline-none'
              {...register('name', {required: true})}
            />
            {errors.name?.type == 'required' && (
              <p className='text-yellow-600 text-sm font-light'>name required</p>
            )}
         </fieldset>

         <fieldset className='flex flex-col m-4 p-2 gap-1 w-full'>
            <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className='border-b-2 outline-none'>
                <option value=''>Select Category</option>
            {     categories.length > 0 &&
                   categories.map((c) => (
                    <option key={c._id} value={c._id}>
                        {c.category}
                    </option>
                ))}
           </select>
         </fieldset>
        

         <fieldset className='flex flex-col m-4 p-2 gap-1 w-full'>
            <input 
              type='file'
              name='image'
              placeholder='image'
              className='border-b-2 bg-transparent outline-none'
            />
            
         </fieldset>

         <fieldset className='flex flex-col m-4 p-2 gap-1 w-full'>
            <input 
              type='text'
              name='price'
              placeholder='price'
              className='border-b-2 bg-transparent outline-none'
              {...register('price', {required: true})}
            />
            {errors.price?.type == 'required' && (
              <p className='text-yellow-600 text-sm font-light'>price required</p>
            )}
         </fieldset>
         
         <fieldset className='flex flex-col m-4 p-2 gap-1 w-full'>
            <input 
              type='text'
              name='desc'
              placeholder='Descriptions'
              className='border-b-2 bg-transparent outline-none'
              {...register('desc', {required: true})}
            />
            {errors.desc?.type == 'required' && (
              <p className='text-yellow-600 text-sm font-light'>desc required</p>
            )}
         </fieldset>
           <div className='flex flex-row m-4 gap-4 items-center justify-center'>
            {loading ? (
              <p>Loading...</p>
                ) : (
                <button type='submit' className='bg-gray-800 text-white p-1 w-fit rounded hover:bg-blue-500'>
                  Update
                </button>
              )}

              <Link href='/products'>
                        <button className='bg-gray-500 hover:bg-black text-gray-100 p-1 rounded px-4'>
                            Back
                        </button>
              </Link>
           </div>
        
       </form>
    </div>
  )
}

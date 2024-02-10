'use client';
import Category from '@/components/Category';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react'; // Import useState for managing loading state

import { useForm } from 'react-hook-form';

export default function page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false); // State for loading indicator

  if (status === 'unauthenticated') {
    router.push('/login');
  }

  const userId = session?.user?._doc?._id;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      setLoading(true); // Set loading to true when form is submitted
      const res = await fetch(`/api/category`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, ...formData }),
      });

      if (res.ok) {
        reset();
        page.reload();
      } else {
        throw new Error('Failed to create category');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false); // Set loading to false after form submission completes
    }
    window.location.reload();
    //router.refresh();
  };

  return (
    <div className='flex flex-col p-2 gap-4 w-full'>
      <h1 className='flex flex-row text-2xl text-gray-700 font-medium text-center'>Categories</h1>
      <div>
        <h2 className='flex flex-row text-lg text-gray-500 text-center'>Add new Categories</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 w-full'>
          <fieldset className='flex flex-col'>
            <input
              type='text'
              name='category'
              placeholder='category name'
              className='outline-none border border-gray-700 rounded-md w-1/2 p-2'
              {...register('category', { required: true })}
            />
            {errors.category?.type == 'required' && (
              <p className='text-xs text-yellow-600'>This field is required</p>
            )}
          </fieldset>
          {/* Conditionally render loading indicator */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <button type='submit' className='bg-blue-400 text-white p-1 w-fit rounded hover:bg-blue-300'>
              save
            </button>
          )}
        </form>
      </div>
      <Category loading={loading}/>
    </div>
  );
}

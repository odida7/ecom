 'use client' 

import { TiInfoOutline } from "react-icons/ti"; 
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { signupAction } from '@/lib/action/signupAction';
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    reset,
    formState: {errors},
  } = useForm();

  const [errorMessage, setErrorMessage] = useState(null);

 const onSubmit = async (data) => {
    try {
      console.log('Data:', data);
      const res = await signupAction(data);
      setErrorMessage(res?.error);

      // Check if there's no error before resetting the form
      if (!res?.error) {
        reset(); // Reset the form
        router.push('/login');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
   

  return (
    
    <div className='flex flex-col h-screen items-center justify-center'>

      <div className='flex flex-col items-center justify-center m-2 shadow-xl shadow-gray-400 rounded-md'>
        <form
            onSubmit={handleSubmit(onSubmit)}
             className='flex flex-col items-center justify-center m-2 p-4 shadow-xl bg-slate-300 w-full rounded-sm'

        >
          <fieldset className='flex flex-col m-4 p-2 gap-1'>
             <input
                name="username"
                placeholder='username'
                className='border-b-2 bg-transparent outline-none'
                type="text"
                {...register('username', {required: true})}
            />
            {errors.username?.type == 'required' && (
              <p className='text-yellow-600 text-sm font-light'>username required</p>
            )}
          </fieldset>


           <fieldset className='flex flex-col m-4 p-2 gap-1'>
             <input
                name="email"
                placeholder='Email'
                className='border-b-2 bg-transparent outline-none'
                type="text"
                {...register('email', {required: true})}
            />
            {errors.username?.type == 'required' && (
              <p className='text-yellow-600 text-sm font-light'>Email required</p>
            )}
          </fieldset>


          <fieldset className='flex flex-col m-4 p-2 gap-1'>
            <input
                name="password"
                placeholder='Password'
                className='border-b-2 bg-transparent outline-none'
                type="password"
                {...register('password', {required: true})}
            />
            {errors.password?.type == 'required' && (
              <p className='text-yellow-600 text-sm font-light'>password required</p>
            )}
          </fieldset> 

            {errorMessage && <span className='bg-red-400 p-1 mb-4 rounded-lg text-white text-sm font-light w-full flex justify-center items-center gap-1'>
              <TiInfoOutline />
              {errorMessage}
              </span>}

            <button type="submit" className='w-full bg-blue-400 text-white p-2 rounded-lg hover:bg-blue-300'>
                Signup
            </button>
        </form>

            

        <div className='flex flex-col items-center justify-between m-2 p-4'>
          <span className='text-xs font-light text-gray-400'>
            Have an account already?{' '}
            <Link href='/login' className='text-sm font-medium text-blue-400'>
              Login
            </Link>{' '}
          </span>
        </div>

      </div> 
    </div>
  )
}

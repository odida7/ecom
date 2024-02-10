'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

export default function page() {

    const {
        handleSubmit,
        register,
        reset,
        formState: {errors},
    } = useForm();

    const onSubmit = async(data)=> {
        try{
          console.log(data)
        }catch(error){
          console.error('Error submitting form:', error);
        }
    }

  return (
    <div className='flex flex-col p-2 gap-4 w-full'>
      <h1 className='flex flex-row text-2xl text-gray-700 font-medium text-center'>Products</h1> 
     
      <div>
        <h2 className='flex flex-row text-lg text-gray-500 text-center'>Add new Products</h2>

        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className='flex flex-col gap-2 w-full'
        >
            <fieldset className='flex flex-col'>
                <input 
                  type='text' 
                  placeholder='product name'
                  className='outline-none border border-gray-700 rounded-md w-1/2 p-2'
                  {...register('product', {required: true})}
                />
                {errors.product?.type == 'required' && (
                    <p className='text-xs text-yellow-600'>This field is required</p>
                )}
            </fieldset>

            <button type="submit" className='bg-blue-400 text-white p-1 w-fit rounded hover:bg-blue-300'>
                save
            </button>

        </form>
      </div>

      <table className='basic mt-4 w-full'>
        <thead className='border border-x-0 border-t-0 border-gray-600'>
            <tr>
                <td className='text-lg font-semibold text-gray-600'>PRODUCT NAME</td>

                <td className='text-lg font-semibold text-gray-600'>SETTING</td>
            </tr>
        </thead>
        <tbody className='mt-2'>
            <tr className='mt-4'>
                <td className='text-md font-semibold'>
                    Nokia
                </td>

                <td className='gap-4 flex flex-row'>
                    <button className='bg-gray-400 text-sm p-1 text-white rounded-md'>
                        Edit
                    </button>

                    <button className='bg-red-400 text-sm p-1 text-white rounded-md'>
                        Delete
                    </button>
                </td>
            </tr>

            <tr className='mt-4'>
                <td className='text-md font-semibold'>
                   Flat screen
                </td>

                <td className='gap-4 flex flex-row'>
                    <button className='bg-gray-400 text-sm p-1 text-white rounded-md'>
                        Edit
                    </button>

                    <button className='bg-red-400 text-sm p-1 text-white rounded-md'>
                        Delete
                    </button>
                </td>
            </tr>

            <tr className='mt-4'>
                <td className='text-md font-semibold'>
                    Shoes
                </td>

                <td className='gap-4 flex flex-row'>
                    <button className='bg-gray-400 text-sm p-1 text-white rounded-md'>
                        Edit
                    </button>

                    <button className='bg-red-400 text-sm p-1 text-white rounded-md'>
                        Delete
                    </button>
                </td>
            </tr>

            <tr className='mt-4'>
                <td className='text-md font-semibold'>
                    Speakers
                </td>

                <td className='gap-4 flex flex-row'>
                    <button className='bg-gray-400 text-sm p-1 text-white rounded-md'>
                        Edit
                    </button>

                    <button className='bg-red-400 text-sm p-1 text-white rounded-md'>
                        Delete
                    </button>
                </td>
            </tr>
        </tbody>
      </table>
       
      
    </div>
  )
}

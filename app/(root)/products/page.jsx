'use client'

import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function page() {

    const [products, setProducts] = useState([]);

    useEffect(()=>{
        const fetchProducts= async()=>{
            try{
                const res = await fetch('/api/product')
                const data = await res.json();
                console.log(data)
                setProducts(data)
            }catch (error) {
                console.error('Error fetching products:', error.message);
            } 
            
        }
        fetchProducts();
    }, [])

  

  return (
    <div className='flex flex-col p-2 gap-4 w-full'>
       
      <div className='flex flex-row items-center justify-between px-8'>
        <h1 className='flex flex-row text-2xl text-gray-700 font-medium text-center'>Products</h1> 
        
        <Link href={'/products/createProduct'}>
          <span className='flex flex-row text-lg text-white hover:text-slate-500 p-1 rounded-md text-center bg-blue-500 hover:bg-blue-300'>Add new Products</span>
        </Link>
        

      </div>

      <table className='basic mt-4 w-full'>
        <thead className='border border-x-0 border-t-0 border-gray-600'>
            <tr>
                <td className='text-lg font-semibold text-gray-600'>PRODUCT NAME</td>

                <td className='text-lg font-semibold text-gray-600'>SETTING</td>
            </tr>
        </thead>
        <tbody className='mt-2'>
           {products?.map((product)=>(

                <tr className='mt-4' key={product.id}>
                    <td className='text-md font-semibold mt-2'>
                        {product.name}
                    </td>

                    <td className='gap-4 flex flex-row mt-2'>
                         <Link href={`/products/${product?._id}/update`}>
                            <button className='bg-slate-700 hover:bg-slate-500 text-sm p-1 px-2 text-white rounded-md'>
                                Edit
                            </button>
                        </Link>
                        <Link href={`/products/${product?._id}/delete`}>
                            <button className='bg-red-500 hover:bg-gray-800 text-sm p-1 px-2 text-white rounded-md'>
                                Delete
                            </button>
                        </Link>
                    </td>
                </tr>
           ))}


        </tbody>
      </table>
       
      
    </div>
  )
}

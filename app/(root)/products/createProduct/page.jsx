'use client'

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';

export default function page() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(false); // State for loading indicator
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const imageRef = useRef();




    const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      setImage(img);
      setImageUrl(URL.createObjectURL(img)); // Save the URL  
    }
  };


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
    const onSubmit = async (formData) => {
    try {
        setLoading(true); // Set loading to true when form is submitted

        // Create a new FormData object to include both image and other form data
        const imgData = new FormData();
        imgData.append('file', image); // Append the image file to FormData
        imgData.append('upload_preset', 'pinterest'); // Specify upload preset (if needed)

        // Upload the image to Cloudinary
        const cloudinaryResponse = await fetch('https://api.cloudinary.com/v1_1/dfh89obzs/image/upload', {
            method: 'POST',
            body: imgData,
        });

        // Extract the image URL from Cloudinary response
        const cloudinaryData = await cloudinaryResponse.json();
        const imageUrl = cloudinaryData.secure_url;

        // Construct the product data including the image URL
        const productData = {
            userId,
            categoryId: selectedCategory,
            image: imageUrl,
            ...formData, // Include other form data if needed
        };

        // Send the product data to your API endpoint
        const res = await fetch('/api/product', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData),
        });

        if (res.ok) {
            reset();
            router.push('/products');
        } else {
            throw new Error('Failed to create product');
        }
    } catch (error) {
        console.error('Error submitting form:', error.message);
    } finally {
        setLoading(false); // Set loading to false after form submission completes
    }
};


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
                  {categories.length > 0 &&
                   categories.map((c) => (
                    <option key={c._id} value={c._id}>
                        {c.category}
                    </option>
                ))}
           </select>
         </fieldset>
        

         <fieldset className='invisible absolute'>
            <input 
              type='file'
              name='image'
              ref={imageRef}
              onChange={onImageChange}
              placeholder='image'
              accept='image/*'
              className='invisible absolute'
            />
            
         </fieldset>
        
        {/*******image preview  */}

          <div
          onClick={() => {
            imageRef.current.click();
          }}
          className='bg-gray-100 hover:bg-gray-300 p-4 w-full'

        >
          {image ? (
            <img
              src={imageUrl}
              alt=''
              width={200}
              height={200}
              className='object-cover'
            />
          ) : (
            <p className='text-slate-500 text-lg font-bold'>Add Images</p>
          )}
        </div>  

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

        {loading ? (
            <p>Loading...</p>
          ) : (
            <button type='submit' className='bg-blue-400 text-white p-1 w-fit rounded hover:bg-blue-300'>
              Create
            </button>
          )}
       </form>
    </div>
  )
}

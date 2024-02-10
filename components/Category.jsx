'use client';
import Link from 'next/link';
//import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Category({ loading }) {
   // const router = useRouter()
    const [categories, setCategories] = useState([]);

    //////////////////////fetch user
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await fetch('/api/category');
                const data = await response.json();
                // console.log('categoryData:', data);
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
            //router.refresh();
        };

        fetchCategory();
    }, []);

    return (
        <div className='flex flex-col p-2 gap-4 w-full'>
            <table className='basic mt-4'>
                <thead className='border border-x-0 border-t-0 border-gray-600'>
                    <tr>
                        <td className='text-lg font-semibold text-gray-600'>CATEGORY NAME</td>
                        <td className='text-lg font-semibold text-gray-600'>SETTING</td>
                    </tr>
                </thead>
                <tbody className='mt-2'>
                    {loading ? (
                        <tr>
                            <td>Loading...</td>
                        </tr>
                    ) : (
                        categories.map((category) => (
                            <tr key={category.id} className='mt-4'>
                                <td className='text-md font-semibold'>{category.category}</td>
                                <td className='gap-4 flex flex-row'>
                                    <Link href={`/categories/${category?._id}/update`}>
                                        <button className='bg-gray-400 text-sm p-1 text-white rounded-md'>
                                            Edit
                                        </button>
                                    </Link>
                                    <Link href={`/categories/${category?._id}/delete`}>
                                        <button className='bg-red-400 text-sm p-1 text-white rounded-md'>
                                            Delete
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

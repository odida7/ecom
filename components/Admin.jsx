'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  


  /////////////////fetch users////////////////
  const getAllUsers = async () => {
    try {
      
      const response = await fetch(`/api/user`);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      console.log(data)
      setAllUsers(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }




  return (
    <div className="p-2 w-full">

      <h1 className="text-2xl text-gray-700 font-bold">Admin</h1>

    
        <table className="w-full mt-4">
          <thead>
            <tr>
              <td>
                ADMIN
              </td>
              
              <td>
                DELETE
              </td>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
            <tr key={user.id}>
              <td className="w-full mt-4">
                {user.username}
              </td>

              <td className="w-full mt-4">
                  <Link href={`/user/delete/${user?._id}`}>
                    <span className='bg-gray-500 hover:bg-gray-300 text-gray-100 p-2 rounded px-4 hover:text-red-600'>Delete</span>
                  </Link>
               
              </td>
            </tr>
             ))}
          </tbody>
          
        </table>
  
    </div>
  );
};

export default Admin;

import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import axios from 'axios'
export const UserDataContext = createContext()

const UserContext = ({children}) => {
  
  useEffect(() => {
    const token = localStorage.getItem('token'); // Adjust if you're storing it differently
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`, // Assuming Bearer token format
        },
      })
      .then((res) => {
        setUserData(res.data.userDetails)
      })
      .catch((err) => {
        console.error('Error fetching profile data:', err);
      });
  }, []);

    const [userData, setUserData] = useState({})

  return (
    <UserDataContext.Provider value={{userData , setUserData}}>
        {children}
    </UserDataContext.Provider>
  )
}

export default UserContext

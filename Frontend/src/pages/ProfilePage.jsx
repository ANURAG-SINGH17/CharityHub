import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { UserDataContext } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';;

const ProfilePage = () => {

  const [userDonations , setUserDonations] = useState([]);
  const {userData , setUserData} = useContext(UserDataContext)

  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const token = localStorage.getItem('token'); // Adjust if you're storing it differently
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/donations`, {
        headers: {
          Authorization: `Bearer ${token}`, // Assuming Bearer token format
        },
      })
      .then((res) => {
        console.log(res.data.data)
        setUserDonations(res.data.data)
      })
      .catch((err) => {
        console.error('Error fetching profile data:', err);
      });
  }, []);

  const handleLogout = () => {
    const token = localStorage.getItem('token'); // Get token from localStorage

    // Send logout request to backend
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        // Clear the token and user data from localStorage and context
        localStorage.removeItem('token');
        setUserData(null); // Clear user data from context
        navigate('/'); // Navigate to home page
      })
      .catch((err) => {
        console.error('Error logging out:', err);
      });
  };


  return (
    <div className='overflow-hidden w-full h-screen'>
      <Link to='/' className='absolute mt-5 ml-5 text-[1.2vw] font-semibold text-white z-20'>Click here to go back: &#8592;</Link>
    <div className="min-h-screen bg-zinc-950 text-white flex justify-center items-center py-12">
            
      {/* Profile Container */}
      <div className="bg-zinc-900 rounded-lg shadow-2xl w-full max-w-6xl p-8 flex space-x-8 mt-[2vw]">

        {/* Left Section (User Details) */}
        <div className="w-1/3 bg-zinc-800 rounded-lg p-6 flex flex-col items-center text-center space-y-6">
        <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center text-3xl font-bold text-gray-300">
            {userData?.fullname ? userData.fullname.split(' ').map(word => word[0]).join('') : 'JD'}
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{userData ? userData.fullname : 'loading'}</h2>
            <p className="text-gray-400">
              {userData ? userData.email : 'loading'}
            </p>
          </div>
          <button 
              className="w-full bg-white text-black font-semibold py-2 px-6 rounded-md hover:bg-gray-300 transition duration-300"
              onClick={handleLogout} // Call handleLogout when clicked
            >
              Logout
            </button>
        </div>

        {/* Right Section (Donation Details) */}
        <div className="w-2/3 h-[500px] overflow-y-scroll pr-4">
  <h3 className="text-3xl font-semibold mb-6">Donation History</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

  {userDonations.length === 0 ? (
  <p className="text-gray-400">No donations found.</p>
) : (
  userDonations.map((donation, index) => (
    <div
      key={index}
      className="bg-zinc-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <p className="text-lg font-semibold">
        <span className="text-green-400">●</span> {donation.organizationName}
      </p>
      <p className="text-gray-400 mt-2"><strong>Amount:</strong> {donation.amount}</p>
      <p className="text-gray-400"><strong>Date:</strong> {donation.date}</p>
    </div>
  ))
)}


  </div>
</div>
      </div>
    </div>
    </div>
  );
};

export default ProfilePage;

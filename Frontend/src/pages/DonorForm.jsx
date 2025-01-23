import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const DonorForm = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const organization = location.state?.organization || {}; // Get the passed organization data

  const [formData, setFormData] = useState({
    organizationName:organization.name,
    email: "",
    amount: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({...formData})
    const token = localStorage.getItem('token');

    try{
      if (!token) {
        alert("You must be logged in to create a resume.");
        return;
      }

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/donationSubmit` ,{...formData},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            }
      }
      )
      if(response.status === 200){
        const data = response.data;
        console.log(data);
        navigate('/profile')
      }

    }catch(err){
      console.log(err);
    }

    setSubmitted(true);
  };

  return (
    <div className="absolute h-screen w-full bg-black flex items-center justify-center">
      {/* Main Content */}
      <div className="text-white text-center h-screen w-[40vw] pt-[4vw]">
        <h1 className="text-[5vw] font-semibold">Donate To</h1>
        <p className="text-[2vw]">{organization.name || "charityHub"}</p>
      </div>

      {/* Form Section */}
      {!submitted ? (
        <div className="max-w-[30vw] w-full bg-white text-black shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-black">Donor Form</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Organization Name Field */}
            <div>
              <label className="block text-sm font-medium mb-1">Organization Name</label>
              <input
                type="text"
                value={organization.name || ""}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                disabled // Make it non-editable
              />
            </div>
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your email"
                required
              />
            </div>
            {/* Donation Amount */}
            <div>
              <label className="block text-sm font-medium mb-1">Donation Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter donation amount"
                required
              />
            </div>
            {/* Message */}
            <div>
              <label className="block text-sm font-medium mb-1">Message (Optional)</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                rows="4"
                placeholder="Leave a message"
              ></textarea>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
            >
              Submit Donation
            </button>
          </form>
        </div>
      ) : (
        // Thank you message after submission
        <div className="max-w-[30vw] w-full bg-white text-black shadow-lg rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-6 text-black">Thank You!</h2>
          <p className="text-lg">
            Your donation is greatly appreciated. Thank you for supporting {organization.name || "charityHub"}!
          </p>
        </div>
      )}
    </div>
  );
};

export default DonorForm;

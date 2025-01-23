import React, { useContext, useState } from "react";
import { Link } from "react-router";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: " ",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    
    try{

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register` ,formData)
          setFormData({
        fullname: " ",
        email: "",
        password: "",
    });
      if(response.status === 200){
        const data = response.data;
        localStorage.setItem('token' , data.token)
        navigate('/')

      }

    }
    catch(err){
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-950">
      <div className="bg-zinc-900 text-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center mb-6">
          Create an Account
        </h2>
        <p className="text-gray-400 text-center mb-8">
          
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="fullname"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-md bg-transparent border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white transition duration-200"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-md bg-transparent border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white transition duration-200"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-md bg-transparent border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white transition duration-200"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white hover:from-gray-100 text-black font-semibold py-3 rounded-md shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          <Link to="/login" className="text-indigo-400 hover:underline transition duration-200">Already have an account?Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

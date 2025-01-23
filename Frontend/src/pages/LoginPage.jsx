import React, { useContext, useState } from "react";
import { Link } from "react-router";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login` , formData);
      
    setFormData({
      email: "",
      password: "",
    })

      if(response.status === 200){
        const data = response.data;
        localStorage.setItem('token' , data.token)
        navigate('/profile')
      }
    }catch(err){
      console.log(err);
    }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-950">
      <div className="bg-zinc-900 text-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center mb-6">Welcome Back</h2>
        <p className="text-gray-400 text-center mb-8">
          Log in to access your account
        </p>
        <form onSubmit={handleSubmit}>
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
            Log in
          </button>
        </form>
          <Link to='/register' className="text-indigo-400 hover:underline transition duration-200">Don't have an account?Register</Link>
      </div>
    </div>
  );
};

export default LoginPage;

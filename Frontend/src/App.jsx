import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import DonationPage from './pages/DonationPage'
import DonorForm from './pages/DonorForm'
import UserProtectedWraper from './pages/UserProtectedWraper'

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/profile" element={
        <UserProtectedWraper>
          <ProfilePage/>
        </UserProtectedWraper>
        }/>
      <Route path="/donation" element={
       <UserProtectedWraper>
         <DonationPage/>
       </UserProtectedWraper>
        }/>
      <Route path="/donor-form" element={
        <UserProtectedWraper>
          <DonorForm/>
        </UserProtectedWraper>
      }/>
    </Routes>
    </>
  )
}

export default App

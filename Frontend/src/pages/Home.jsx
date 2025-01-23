import React, { useEffect } from 'react';
import LandingPage from '../components/LandingPage';
import About from '../components/About';
import LocomotiveScroll from 'locomotive-scroll'
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import Map from '../components/Map';
import {OrganizationData} from '../data/OrganizationData'

const Home = () => {

  const locomotive = new LocomotiveScroll();

  return (
    <div className="w-full min-h-screen bg-white">
      <LandingPage/>
      <About/>
      <div data-scroll data-scroll-section data-scroll-speed=".3"
       className='bg-gray-100 w-full h-screen flex flex-col items-center justify-center'>
        <h1 className='text-[4vw] text-black p-5'>Donate in any <span className="text-gray-400">Organization</span></h1>
        <div className='w-[60vw] h-[60vh] rounded-lg overflow-hidden '>
          <Map OrganizationData={OrganizationData}/>
        </div>
      </div>
      <Testimonials/>
      <Footer/>
    </div>
  );
};

export default Home;

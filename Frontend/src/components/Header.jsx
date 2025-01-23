import React, { useState, useEffect, useRef , useContext } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { UserDataContext } from '../context/UserContext';

const Header = () => {
    const [darkMode, setDarkMode] = useState(true);
    const {userData , setUserData} = useContext(UserDataContext)

 const headerRef = useRef(null);
    useEffect(()=>{
        gsap.fromTo(
              headerRef.current,
              { y: -50, opacity: 0 },
              { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
            );
    },[])
  return (
    <header
    ref={headerRef}
    className=" w-full top-0 z-50 flex justify-between items-center px-6 py-4 bg-opacity-80 backdrop-blur-md transition-all duration-500"
  >
    <div className="text-2xl font-extrabold text-white">
      <span className="text-blue-500">Charity</span>Hub
    </div>
    <nav className="space-x-6 text-lg text-white font-semibold">
      <a
        href="#"
        className="hover:text-blue-500 transition duration-300 ease-in-out"
      >
        Home
      </a>
      <a
        href="#about"
        className="hover:text-blue-500 transition duration-300 ease-in-out"
      >
        About
      </a>
      <a
        href="#contact"
        className="hover:text-blue-500 transition duration-300 ease-in-out"
      >
        Contact
      </a>
      <a
        href="/profile"
        className="hover:text-blue-500 transition duration-300 ease-in-out"
      >
        Profile
      </a>
    </nav>
    <div className="flex items-center space-x-4">
    {userData && userData.fullname ? (
                    // Show initials when userData and fullname are available
                    <div className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center font-bold text-gray-300">
                        {userData.fullname.split(' ').map(word => word[0]).join('')}
                    </div>
                ) : (
                    // Show sign-in button when userData or fullname is not available
                    <Link to="/login" className="px-4 py-2 font-semibold bg-white text-black rounded-md hover:bg-gray-300 transition-transform transform hover:scale-105">
                        Sign in
                    </Link>
                )}
    </div>
  </header>
  )
}

export default Header

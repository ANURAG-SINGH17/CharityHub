import React, { useState, useEffect, useRef } from "react";
import { Switch } from "@headlessui/react";
import { gsap } from "gsap";
import Header from "./Header";
import { Link } from "react-router";


const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(true);

  // Refs for animations
  const headerRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroTextRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    // GSAP Animations
    gsap.fromTo(
      headerRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
    );
    gsap.fromTo(
      heroTitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power4.out", delay: 0.5 }
    );
    gsap.fromTo(
      heroTextRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power4.out", delay: 0.7 }
    );
    gsap.fromTo(
      buttonsRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: "elastic.out(1, 0.5)", delay: 1.2 }
    );
  }, []);

  return (
    <div  data-scroll data-scroll-section data-scroll-speed="-.7"
      className={`${
        darkMode ? "bg-black text-white" : "bg-white text-gray-900"
      } transition-colors duration-500`}
    >
      <Header/>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-screen text-center px-6">
        <h1
          ref={heroTitleRef}
          className="text-4xl md:text-6xl font-bold leading-tight mb-4"
        >
          Make a Difference with{" "}
          <span className="text-blue-500">Your Donation</span>
        </h1>
        <p
          ref={heroTextRef}
          className="text-lg md:text-xl text-gray-400 max-w-3xl"
        >
          Join us in creating a better future. Help those in need by donating
          money, food, or clothes. Together, we can bring change.
        </p>
        <div ref={buttonsRef} className="mt-6 space-x-4">
          <Link to="/donation" className="px-6 py-3 bg-white text-black font-semibold  rounded-md hover:bg-gray-300 transition-transform transform hover:scale-110">
            Donate Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default LandingPage

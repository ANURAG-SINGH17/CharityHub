import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    // GSAP Animations with ScrollTrigger
    gsap.fromTo(
      ".about-heading",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%", // Trigger animation when section reaches 75% of viewport height
        },
      }
    );

    gsap.fromTo(
      ".about-text",
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 55%",
          scrub:1,
        },
      }
    );

    gsap.fromTo(
      ".about-bg",
      { scale: 1.2, opacity: 0 },
      {
        scale: 1,
        opacity: 0.5,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 55%",
          scrub:1,
        },
      }
    );
  }, []);

  return (
    <section data-scroll data-scroll-section data-scroll-speed=".2"
      id="about"
      ref={sectionRef}
      className="relative min-h-[90vh] bg-white text-black flex items-center justify-center overflow-hidden"
    >
      {/* Background Element */}
      <div className="about-bg absolute inset-0  blur-3xl opacity-30"></div>

      {/* Content */}
      <div className="relative w-full h-full mx-auto text-center flex px-6 z-10">
        <div className="w-1/2">
        <h2 className="about-heading text-[6vw]  mt-[6vw] ">
          About <span className="text-gray-400">Us</span>
        </h2>
        </div>
       <div className="w-1/2">
       <p className="about-text text-[2vw]  text-gray-800 w-[40vw] leading-relaxed mt-[9vw]">
          We are a non-profit organization committed to bringing positive change
          to society. Through our various campaigns, we aim to uplift
          underprivileged communities and create a sustainable future for
          everyone.
        </p>
       </div>
      </div>
    </section>
  );
}

export default About;

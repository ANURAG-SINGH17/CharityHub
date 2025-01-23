import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Testimonials = () => {
  const testimonialsRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, defaults: { duration: 1, ease: 'power2.inOut' } });

    testimonialsRef.current.forEach((testimonial, index) => {
      const nextIndex = (index + 1) % testimonialsRef.current.length;
      tl.to(testimonial, { autoAlpha: 1, y: 0 })
        .to(testimonial, { autoAlpha: 0, y: -20 }, "+=2")
        .set(testimonial, { y: 20, autoAlpha: 0 });
    });

    return () => {
      tl.kill();
    };
  }, []);

  const testimonials = [
    "CharityHub supported my treatment during the toughest times. I'm forever grateful! – Priya Sharma",
    "Thanks to CharityHub, I could focus on recovery without worrying about funds. – Ramesh Kumar",
    "With CharityHub's help, I found hope and support during my darkest days. – Anjali Verma",
  ];

  return (
    <section className="testimonials bg-white h-screen w-full flex justify-center items-center">
      <div className="max-w-4xl w-full text-center">
        <h2 className="text-[5vw] text-black mb-8">What Our Beneficiaries Say</h2>
        <div className="relative h-24">
          {testimonials.map((text, index) => (
            <div
              key={index}
              className="testimonial absolute inset-0 opacity-0 transform translate-y-5 text-[2vw] text-gray-800"
              ref={(el) => (testimonialsRef.current[index] = el)}
            >
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

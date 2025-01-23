import React from 'react';

const Footer = () => {
  return (
    <footer data-scroll data-scroll-section data-scroll-speed=".30"
     className="bg-black text-white py-8 -z-1">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-2xl font-bold">CharityHub</h3>
            <p className="text-gray-400 mt-2">
              Empowering lives through care and compassion.
            </p>
          </div>

          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-gray-300">About Us</a></li>
              <li><a href="#services" className="hover:text-gray-300">Services</a></li>
              <li><a href="#testimonials" className="hover:text-gray-300">Testimonials</a></li>
              <li><a href="#contact" className="hover:text-gray-300">Contact</a></li>
            </ul>
          </div>

          <div className="w-full md:w-1/3">
            <h4 id='contact' className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-400">
              Email: <a href="mailto:info@charityhub.com" className="hover:text-gray-300">info@charityhub.com</a>
            </p>
            <p className="text-gray-400 mt-2">
              Phone: <a href="tel:+919876543210" className="hover:text-gray-300">+91 98765 43210</a>
            </p>
            <p className="text-gray-400 mt-2">
              Address: 123 Charity Lane, Compassion City, India
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} CharityHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

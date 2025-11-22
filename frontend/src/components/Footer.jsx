import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className='w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-20'>
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-16'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mb-10'>
          <div>
            <img className='mb-5 w-24 brightness-150' src={'/custom_logo.png'} onError={(e)=>{e.target.onerror=null; e.target.src=assets.logo}} alt='logo' />
            <p className='w-full md:w-2/3 text-gray-300 leading-relaxed'>
              RentIt helps neighbors lend and borrow items with confidence. Create clear listings, set hourly or daily rates, and handle bookings through the platform—saving money and reducing waste.
            </p>
          </div>
          <div>
            <p className='font-bold text-lg mb-5 text-white'>COMPANY</p>
            <ul className='flex flex-col gap-3 text-gray-400'>
              <li><Link to="/" className='hover:text-white transition font-medium'>Home</Link></li>
              <li><Link to="/about" className='hover:text-white transition font-medium'>About us</Link></li>
              <li><Link to="/contact" className='hover:text-white transition font-medium'>Contact</Link></li>
              <li><Link to="/privacy" className='hover:text-white transition font-medium'>Privacy policy</Link></li>
            </ul>
          </div>
          <div>
            <p className='font-bold text-lg mb-5 text-white'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-3 text-gray-400'>
              <li className='hover:text-white transition'>📱 9795XXXXXX</li>
              <li className='hover:text-white transition'>✉️ contact@rentit.local</li>
            </ul>
          </div>
        </div>
        <hr className='border-gray-700 my-8' />
        <p className='py-5 text-sm text-center text-gray-500 font-medium'>
          Copyright {new Date().getFullYear()} <span className='text-blue-400'>RentIt</span> - All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;

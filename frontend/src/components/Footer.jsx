import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div className=''>
          <img className='mb-5 w-24' src={'/custom_logo.png'} onError={(e)=>{e.target.onerror=null; e.target.src=assets.logo}} alt='logo' />
          <p className='w-full md:w-2/3 text-gray-600'>
            RentIt helps neighbors lend and borrow items with confidence. Create clear listings, set hourly or daily rates, and handle bookings through the platform—saving money and reducing waste.
          </p>
        </div>
        <div>
          <p className='font-medium text-xl mb-5'>COMPANY</p>

          <ul className='flex flex-col gap-1 text-gray-600'>
            <li><Link to="/" className='hover:text-blue-600 transition'>Home</Link></li>
            <li><Link to="/about" className='hover:text-blue-600 transition'>About us</Link></li>
            <li><Link to="/contact" className='hover:text-blue-600 transition'>Contact</Link></li>
            <li><Link to="/privacy" className='hover:text-blue-600 transition'>Privacy policy</Link></li>
          </ul>
        </div>
        <div>
          <p className='font-medium text-xl mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>9795XXXXXX</li>
            <li>contact@rentit.local</li>
          </ul>
        </div>
      </div>
      <div className=''>
        <hr />
        <p className='py-5 text-sm text-center'>
          {" "}
          Copyright {new Date().getFullYear()} RentIt - All Right Reserved.{" "}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

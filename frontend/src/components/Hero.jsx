import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className='bg-gradient-to-r from-blue-500 to-blue-400 rounded-lg overflow-hidden shadow-lg my-10'>
      <div className='flex flex-col sm:flex-row items-center'>
        {/* -------hero left side ---------- */}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-12 sm:py-20 px-6 sm:px-10'>
          <div className='space-y-6'>
            <div className='flex items-center gap-4'>
              <div className='w-12 h-1 bg-white rounded-full'></div>
              <p className='font-bold text-sm md:text-base uppercase tracking-widest text-white'>
                ✨ Featured Items
              </p>
            </div>
            <h1 className='text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight drop-shadow-lg'>
              Rent Anything You Need
            </h1>
            <p className='text-blue-50 text-lg max-w-md leading-relaxed'>
              Save money by renting tools, equipment, and everyday items from your neighbors. Quality items at hourly or daily rates.
            </p>

            <div className='flex items-center gap-4 pt-4'>
              <Link to="/collection" className='bg-white hover:bg-blue-50 text-blue-600 px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition transform hover:scale-105 active:scale-95'>
                🛍️ BROWSE NOW
              </Link>
              <p className='text-sm font-semibold text-white'>Explore thousands of items →</p>
            </div>
          </div>
        </div>
        {/* -------hero right side ---------- */}
        <div className='w-full sm:w-1/2 relative h-96 sm:h-auto overflow-hidden'>
          <img 
            className='w-full h-full object-cover hover:scale-110 transition duration-500' 
            src={assets.hero_img} 
            alt='hero image' 
          />
          <div className='absolute inset-0 bg-gradient-to-l from-transparent to-blue-500/30'></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

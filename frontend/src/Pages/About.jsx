import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <main>
      <div className='text-2xl text-center mt-8 border-t'>
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt='about image' />

        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            RentIt empowers communities to share resources. Whether you need a power tool for an afternoon project or camera gear for a weekend shoot, RentIt helps you find trusted items nearby — quickly and affordably.
          </p>
          <p>
            Lenders create listings with clear photos, location, and flexible pricing (hourly or daily). Borrowers search by proximity, request a rental for specific dates, and manage bookings through an intuitive interface.
          </p>
          <b className='text-gray-800'>Our Mission</b>
          <p>
            To reduce unnecessary consumption, save money, and build stronger local networks by making it simple and safe to borrow and lend everyday items.
          </p>
        </div>
      </div>

      <div className='text-4xl py-4'>
        <Title text1={"HOW"} text2={"RENTIT WORKS"} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20 gap-6'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>List an item:</b>
          <p>Create a new listing, set an hourly or daily price, add photos and location.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Search nearby:</b>
          <p>Find items close to you using location search and filter by price/unit.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Request & rent:</b>
          <p>Send a request for your desired period. Owners can accept or decline requests and manage availability.</p>
        </div>
      </div>

      <NewsletterBox />
    </main>
  );
};

export default About;

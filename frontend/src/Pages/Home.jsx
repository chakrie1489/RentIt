import React from 'react'
import Hero from '../components/Hero';
import ActionCTA from '../components/ActionCTA';
import LatestCollection from '../components/LatestCollection';
import BestSeller from '../components/BestSeller';
import OurPolicy from '../components/OurPolicy';
import NewsletterBox from '../components/NewsletterBox';

const Home = () => {
  return (
    <div className='w-full bg-blue-50'>
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <Hero/>
      </div>
      <ActionCTA/>
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <LatestCollection/>
        <BestSeller/>
        <OurPolicy/>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default Home
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const ActionCTA = () => {
  const navigate = useNavigate()
  const { token } = useContext(ShopContext)

  const handleListClick = () => {
    if (!token) {
      navigate('/login')
    } else {
      navigate('/new-listing')
    }
  }

  const handleRequestClick = () => {
    if (!token) {
      navigate('/login')
    } else {
      navigate('/requests/new')
    }
  }

  return (
    <section className='py-16 px-4 bg-gradient-to-r from-blue-50 to-indigo-50'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold mb-4'>Get Started with RentIt</h2>
          <p className='text-xl text-gray-600'>Start earning or save money by sharing items in your community</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* List Item Card */}
          <div className='bg-white rounded-lg shadow-lg hover:shadow-xl transition p-8 border-t-4 border-blue-600'>
            <div className='text-5xl mb-4'>📦</div>
            <h3 className='text-2xl font-bold mb-3'>List an Item</h3>
            <p className='text-gray-600 mb-4'>
              Have something you want to rent out? Upload photos, set your price, and start earning money from items you already own.
            </p>
            <ul className='space-y-2 text-gray-700 mb-6'>
              <li className='flex items-center gap-2'>
                <span className='text-blue-600 font-bold'>✓</span> Add photos and descriptions
              </li>
              <li className='flex items-center gap-2'>
                <span className='text-blue-600 font-bold'>✓</span> Set hourly or daily rates
              </li>
              <li className='flex items-center gap-2'>
                <span className='text-blue-600 font-bold'>✓</span> Manage rental requests
              </li>
              <li className='flex items-center gap-2'>
                <span className='text-blue-600 font-bold'>✓</span> Track your earnings
              </li>
            </ul>
            <button 
              onClick={handleListClick}
              className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition'
            >
              {token ? 'Start Listing' : 'Login to List'}
            </button>
          </div>

          {/* Request Item Card */}
          <div className='bg-white rounded-lg shadow-lg hover:shadow-xl transition p-8 border-t-4 border-indigo-600'>
            <div className='text-5xl mb-4'>🔍</div>
            <h3 className='text-2xl font-bold mb-3'>Request an Item</h3>
            <p className='text-gray-600 mb-4'>
              Looking for something specific? Browse available items from your neighbors and request rentals at flexible rates.
            </p>
            <ul className='space-y-2 text-gray-700 mb-6'>
              <li className='flex items-center gap-2'>
                <span className='text-indigo-600 font-bold'>✓</span> Search nearby items
              </li>
              <li className='flex items-center gap-2'>
                <span className='text-indigo-600 font-bold'>✓</span> Propose rental dates
              </li>
              <li className='flex items-center gap-2'>
                <span className='text-indigo-600 font-bold'>✓</span> Compare prices
              </li>
              <li className='flex items-center gap-2'>
                <span className='text-indigo-600 font-bold'>✓</span> Connect with lenders
              </li>
            </ul>
            <button 
              onClick={handleRequestClick}
              className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition'
            >
              {token ? 'Post a Request' : 'Login to Request'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ActionCTA

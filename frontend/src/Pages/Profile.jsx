import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { getMyRequests, getMyItems } from '../api'
import client from '../api'
import { toast } from 'react-toastify'

const Profile = () => {
  const { token } = useContext(ShopContext);
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [listings, setListings] = useState([]);
  const [activeTab, setActiveTab] = useState('listings');

  const load = async () => {
    try {
      const r = await getMyRequests();
      if (r.success) setRequests(r.requests || []);
      const li = await getMyItems();
      if (li.success) setListings(li.items || []);
    } catch (err) { 
      console.log(err); 
    }
  }

  useEffect(() => { 
    if (token) load() 
  }, [token]);

  if (!token) return (
    <main className='w-full min-h-screen bg-blue-50 py-16'>
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <div className='bg-white rounded-lg p-12 text-center max-w-md mx-auto border border-gray-200'>
          <p className='text-3xl mb-4'>🔐</p>
          <h2 className='text-2xl font-bold text-gray-800 mb-3'>Login Required</h2>
          <p className='text-gray-600 mb-6'>Please login to view your profile.</p>
          <button
            onClick={() => navigate("/login")}
            className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition'
          >
            Go to Login
          </button>
        </div>
      </div>
    </main>
  )

  return (
    <main className='w-full min-h-screen bg-blue-50 py-16'>
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <div className='mb-12'>
          <h1 className='text-4xl font-bold text-gray-800 mb-3'>👤 Your Profile</h1>
          <p className='text-lg text-gray-600'>Manage your listings and rental activity.</p>
        </div>

        {/* Tabs */}
        <div className='flex gap-4 mb-8 border-b-2 border-gray-300 flex-wrap'>
          <button 
            onClick={() => setActiveTab('listings')} 
            className={`py-3 px-6 font-semibold transition ${activeTab === 'listings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
          >
            My Listings ({listings.length})
          </button>
          <button 
            onClick={() => setActiveTab('rentals')} 
            className={`py-3 px-6 font-semibold transition ${activeTab === 'rentals' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
          >
            My Requests ({requests.length})
          </button>
        </div>

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <div>
            <div className='mb-8 flex justify-between items-center'>
              <div>
                <h2 className='text-2xl font-bold text-gray-800 mb-1'>Your Listings</h2>
                <p className='text-gray-600'>Items you are offering for rent.</p>
              </div>
              <button 
                onClick={() => navigate('/new-listing')} 
                className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap'
              >
                + New Listing
              </button>
            </div>

            {listings.length === 0 ? (
              <div className='bg-white rounded-lg p-12 text-center shadow-md border border-gray-200'>
                <p className='text-4xl mb-4'>📦</p>
                <p className='text-2xl font-bold text-gray-800 mb-2'>No listings yet</p>
                <p className='text-gray-600 mb-6'>Start earning by listing items for rent.</p>
                <button 
                  onClick={() => navigate('/new-listing')} 
                  className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition'
                >
                  Create Your First Listing
                </button>
              </div>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {listings.map(item => (
                  <div key={item._id} className='bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition overflow-hidden'>
                    {item.images && item.images.length > 0 ? (
                      <div className='h-40 bg-gray-200 overflow-hidden'>
                        <img src={item.images[0]} alt={item.title} className='w-full h-full object-cover' />
                      </div>
                    ) : (
                      <div className='h-40 bg-gray-200 flex items-center justify-center'>
                        <span className='text-3xl text-gray-400'>📦</span>
                      </div>
                    )}
                    
                    <div className='p-4'>
                      <h3 className='font-bold text-lg text-gray-800 line-clamp-2 mb-2'>
                        {item.title}
                      </h3>
                      <p className='text-sm text-gray-600 line-clamp-2 mb-3'>
                        {item.description}
                      </p>
                      
                      <div className='flex justify-between items-baseline mb-4'>
                        <span className='text-2xl font-bold text-blue-600'>
                          ₹{item.price}
                        </span>
                        <span className='text-gray-600'>
                          /{item.priceUnit || 'day'}
                        </span>
                      </div>

                      <div className='flex gap-2'>
                        <button 
                          onClick={() => navigate(`/new-listing?edit=${item._id}`)} 
                          className='flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold text-sm transition'
                        >
                          Edit
                        </button>
                        <button 
                          onClick={async () => {
                            if (!confirm('Delete this listing?')) return;
                            try {
                              const token = localStorage.getItem('token');
                              const res = await client.delete(`/api/items/${item._id}`, { headers: { token } });
                              if (res.data && res.data.success) { 
                                setListings(listings.filter(x => x._id !== item._id)); 
                                toast.success('Listing deleted'); 
                              } else {
                                toast.error(res.data?.message || 'Failed to delete');
                              }
                            } catch (err) { 
                              toast.error(err.message); 
                            }
                          }} 
                          className='flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded font-semibold text-sm transition'
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Rentals Tab */}
        {activeTab === 'rentals' && (
          <div>
            <div className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-800 mb-1'>Your Requests</h2>
              <p className='text-gray-600'>Items you have requested to rent.</p>
            </div>

            {requests.length === 0 ? (
              <div className='bg-white rounded-lg p-12 text-center shadow-md border border-gray-200'>
                <p className='text-4xl mb-4'>📋</p>
                <p className='text-2xl font-bold text-gray-800 mb-2'>No requests yet</p>
                <p className='text-gray-600 mb-6'>Browse available items and post requests.</p>
                <button 
                  onClick={() => navigate('/requests')} 
                  className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition'
                >
                  Browse Requests
                </button>
              </div>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {requests.map(req => (
                  <div 
                    key={req._id} 
                    className='bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition overflow-hidden p-5'
                  >
                    <div className='flex justify-between items-start gap-2 mb-4'>
                      <h3 className='font-bold text-lg text-gray-800 line-clamp-2'>
                        {req.title || 'Rental Request'}
                      </h3>
                      <span className={`px-2 py-1 rounded text-xs font-bold whitespace-nowrap ${
                        req.status === 'fulfilled' ? 'bg-green-100 text-green-800' :
                        req.status === 'closed' ? 'bg-gray-100 text-gray-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {req.status}
                      </span>
                    </div>

                    <p className='text-sm text-gray-600 line-clamp-2 mb-3'>
                      {req.description}
                    </p>

                    <div className='space-y-2 text-sm mb-4'>
                      <div className='flex justify-between'>
                        <span className='text-gray-600'>From:</span>
                        <span className='font-semibold text-gray-800'>
                          {new Date(req.desiredStart).toLocaleDateString()}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-gray-600'>To:</span>
                        <span className='font-semibold text-gray-800'>
                          {new Date(req.desiredEnd).toLocaleDateString()}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-gray-600'>Budget:</span>
                        <span className='font-semibold text-green-600'>
                          ${req.maxPrice}/day
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(`/requests/${req._id}`)}
                      className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold text-sm transition'
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}

export default Profile

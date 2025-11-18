import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { getMyRequests, createRequest, getMyItems } from '../api'
import client from '../api'
import { toast } from 'react-toastify'

const Profile = () => {
  const { token } = useContext(ShopContext);
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [listings, setListings] = useState([]);
  const [activeTab, setActiveTab] = useState('listings'); // 'listings' or 'rentals'
  const [listingFilter, setListingFilter] = useState('current'); // 'current' or 'past'
  const [rentalFilter, setRentalFilter] = useState('current'); // 'current' or 'past'

  const load = async () => {
    try {
      const r = await getMyRequests();
      if (r.success) setRequests(r.requests || []);
      const li = await getMyItems();
      if (li.success) setListings(li.items || []);
    } catch (err) { console.log(err); }
  }

  useEffect(()=>{ if (token) load() }, [token]);

  const now = new Date();
  
  const currentListings = listings.filter(it => it.available === true);
  const pastListings = listings.filter(it => it.available === false);
  
  const currentRequests = requests.filter(r => {
    const endDate = new Date(r.end);
    return endDate > now && r.status !== 'declined';
  });
  
  const pastRequests = requests.filter(r => {
    const endDate = new Date(r.end);
    return endDate <= now || r.status === 'declined';
  });

  const displayedListings = listingFilter === 'current' ? currentListings : pastListings;
  const displayedRequests = rentalFilter === 'current' ? currentRequests : pastRequests;

  if (!token) return <div className='mt-20 text-center'><p className='text-lg text-gray-600'>Please login to view your profile</p></div>

  return (
    <div className='min-h-screen bg-gray-50 py-10'>
      <div className='max-w-6xl mx-auto px-4'>
        <h1 className='text-4xl font-bold mb-2'>Your Profile</h1>
        <p className='text-gray-600 mb-10'>Manage your listings and rental requests.</p>

        {/* Tabs */}
        <div className='flex gap-4 mb-8 border-b-2'>
          <button 
            onClick={() => setActiveTab('listings')} 
            className={`py-3 px-6 font-semibold text-lg transition ${activeTab === 'listings' ? 'text-blue-600 border-b-4 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
          >
            My Listings
          </button>
          <button 
            onClick={() => setActiveTab('rentals')} 
            className={`py-3 px-6 font-semibold text-lg transition ${activeTab === 'rentals' ? 'text-blue-600 border-b-4 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
          >
            My Rentals
          </button>
        </div>

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <div>
            <div className='mb-8 bg-white rounded-lg shadow p-6'>
              <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6'>
                <div>
                  <h2 className='text-2xl font-bold mb-2'>Your Listings</h2>
                  <p className='text-gray-600'>Items you are currently offering or have listed in the past.</p>
                </div>
                <button onClick={() => navigate('/new-listing')} className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition'>
                  + Add New Listing
                </button>
              </div>

              {/* Filter Tabs */}
              <div className='flex gap-2 mb-6 border-b'>
                <button 
                  onClick={() => setListingFilter('current')} 
                  className={`py-2 px-4 font-medium transition ${listingFilter === 'current' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                >
                  Current ({currentListings.length})
                </button>
                <button 
                  onClick={() => setListingFilter('past')} 
                  className={`py-2 px-4 font-medium transition ${listingFilter === 'past' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                >
                  Past ({pastListings.length})
                </button>
              </div>

              {displayedListings.length === 0 ? (
                <div className='text-center py-12'>
                  <p className='text-gray-500 mb-4'>
                    {listingFilter === 'current' ? 'No active listings. ' : 'No past listings. '}
                    <button onClick={() => navigate('/new-listing')} className='text-blue-600 hover:underline font-semibold'>Create one</button>
                  </p>
                </div>
              ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                  {displayedListings.map(it => (
                    <div key={it._id} className='bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden'>
                      <div className='h-40 bg-gray-200'>
                        {it.images && it.images.length > 0 && <img src={it.images[0]} alt={it.title} className='w-full h-full object-cover' />}
                      </div>
                      <div className='p-4'>
                        <p className='font-bold text-lg line-clamp-2'>{it.title}</p>
                        <p className='text-gray-600 text-sm line-clamp-2 mb-2'>{it.description}</p>
                        <p className='text-lg font-bold text-blue-600 mb-2'>${it.price} / {it.priceUnit}</p>
                        {it.remarks && <p className='text-xs text-gray-500 italic mb-3 line-clamp-1'>{it.remarks}</p>}
                        <div className='flex gap-2'>
                          <button onClick={() => navigate(`/new-listing?edit=${it._id}`)} className='flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium transition'>Edit</button>
                          <button onClick={async () => {
                            if (!confirm('Delete this listing?')) return;
                            try {
                              const token = localStorage.getItem('token');
                              const res = await client.delete(`/api/items/${it._id}`, { headers: { token } });
                              if (res.data && res.data.success) { setListings(listings.filter(x => x._id !== it._id)); toast.success('Listing deleted'); }
                              else toast.error(res.data && res.data.message ? res.data.message : 'Failed to delete');
                            } catch (err) { toast.error(err.message); }
                          }} className='flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded font-medium transition'>Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Rentals Tab */}
        {activeTab === 'rentals' && (
          <div>
            <div className='bg-white rounded-lg shadow p-6'>
              <div className='mb-6'>
                <h2 className='text-2xl font-bold mb-2'>Your Rental Requests</h2>
                <p className='text-gray-600'>Items you have requested to rent from other members.</p>
              </div>

              {/* Filter Tabs */}
              <div className='flex gap-2 mb-6 border-b'>
                <button 
                  onClick={() => setRentalFilter('current')} 
                  className={`py-2 px-4 font-medium transition ${rentalFilter === 'current' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                >
                  Active ({currentRequests.length})
                </button>
                <button 
                  onClick={() => setRentalFilter('past')} 
                  className={`py-2 px-4 font-medium transition ${rentalFilter === 'past' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                >
                  Past ({pastRequests.length})
                </button>
              </div>

              {displayedRequests.length === 0 ? (
                <div className='text-center py-12'>
                  <p className='text-gray-500 mb-4'>
                    {rentalFilter === 'current' ? 'No active rentals.' : 'No past rentals.'}
                  </p>
                </div>
              ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {displayedRequests.map(r => (
                    <div key={r._id} className={`bg-gradient-to-br rounded-lg shadow p-4 border-l-4 ${
                      r.status === 'accepted' ? 'from-green-50 to-transparent border-green-500' :
                      r.status === 'declined' ? 'from-red-50 to-transparent border-red-500' :
                      'from-yellow-50 to-transparent border-yellow-500'
                    }`}>
                      <p className='font-semibold text-lg'>{r.item && r.item.title}</p>
                      <p className='text-sm text-gray-600 mt-2'>
                        Status: <span className={`font-bold ${
                          r.status === 'accepted' ? 'text-green-600' :
                          r.status === 'declined' ? 'text-red-600' :
                          'text-yellow-600'
                        }`}>{r.status.charAt(0).toUpperCase() + r.status.slice(1)}</span>
                      </p>
                      <p className='text-sm text-gray-600 mt-2'>Lender: <span className='font-medium'>{r.item?.owner?.name || 'Unknown'}</span></p>
                      <p className='text-sm text-gray-500 mt-2'>From: {new Date(r.start).toLocaleString()}</p>
                      <p className='text-sm text-gray-500'>To: {new Date(r.end).toLocaleString()}</p>
                      {r.message && <p className='text-sm text-gray-600 mt-2 italic'>Message: {r.message}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile

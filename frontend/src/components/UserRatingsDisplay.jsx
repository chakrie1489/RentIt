import React, { useEffect, useState } from 'react'
import { getUserRatings } from '../api'
import { toast } from 'react-toastify'

const UserRatingsDisplay = ({ userId }) => {
  const [ratings, setRatings] = useState([])
  const [loading, setLoading] = useState(true)
  const [average, setAverage] = useState(0)

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        setLoading(true)
        const res = await getUserRatings(userId)
        if (res.success) {
          setRatings(res.ratings || [])
          if (res.ratings && res.ratings.length > 0) {
            const avg = (res.ratings.reduce((sum, r) => sum + r.rating, 0) / res.ratings.length).toFixed(1)
            setAverage(avg)
          }
        } else {
          toast.error(res.message || 'Failed to load ratings')
        }
      } catch (err) {
        console.log('Error loading ratings:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchRatings()
  }, [userId])

  if (loading) {
    return (
      <div className='text-center py-4'>
        <p className='text-gray-600'>Loading ratings...</p>
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      {/* Rating Summary */}
      {ratings.length > 0 && (
        <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4'>
          <div className='flex items-center gap-3'>
            <div>
              <div className='text-3xl font-bold text-blue-600'>{average}</div>
              <p className='text-sm text-gray-600'>{ratings.length} review{ratings.length !== 1 ? 's' : ''}</p>
            </div>
            <div className='flex text-xl text-yellow-400'>
              {[1, 2, 3, 4, 5].map(i => (
                <span key={i}>{i <= Math.round(average) ? '★' : '☆'}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Individual Ratings */}
      {ratings.length === 0 ? (
        <p className='text-center text-gray-500 py-4'>No ratings yet</p>
      ) : (
        ratings.map((rating, idx) => (
          <div key={idx} className='bg-white border border-gray-200 rounded-lg p-4'>
            <div className='flex items-start justify-between mb-2'>
              <div className='flex items-center gap-3'>
                {rating.fromUserId?.profileImage && (
                  <img src={rating.fromUserId.profileImage} alt={rating.fromUserId.name} className='w-10 h-10 rounded-full object-cover' />
                )}
                <div>
                  <p className='font-semibold text-gray-800'>{rating.fromUserId?.name || 'Anonymous'}</p>
                  <p className='text-xs text-gray-500'>{new Date(rating.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className='flex text-lg text-yellow-400'>
                {[1, 2, 3, 4, 5].map(i => (
                  <span key={i}>{i <= rating.rating ? '★' : '☆'}</span>
                ))}
              </div>
            </div>

            {rating.comment && (
              <p className='text-gray-700 text-sm'>{rating.comment}</p>
            )}

            <div className='mt-2'>
              <span className={`text-xs px-2 py-1 rounded-full ${
                rating.ratingType === 'lender' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-green-100 text-green-700'
              }`}>
                Rated as {rating.ratingType}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default UserRatingsDisplay

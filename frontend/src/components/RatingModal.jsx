import React, { useState } from 'react'
import { createRating } from '../api'
import { toast } from 'react-toastify'

const RatingModal = ({ orderId, toUserId, ratingType, onClose, onSuccess }) => {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!rating) {
      toast.error('Please select a rating')
      return
    }

    setLoading(true)
    try {
      const res = await createRating({
        toUserId,
        orderId,
        rating: parseInt(rating),
        comment,
        ratingType,
      })

      if (res.success) {
        toast.success('Rating submitted successfully!')
        onSuccess?.()
        onClose()
      } else {
        toast.error(res.message || 'Failed to submit rating')
      }
    } catch (err) {
      toast.error(err.message || 'Error submitting rating')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 max-w-md w-full mx-4'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-bold text-gray-800'>⭐ Rate {ratingType === 'lender' ? 'Lender' : 'Borrower'}</h2>
          <button onClick={onClose} className='text-gray-500 hover:text-gray-700 font-bold text-2xl'>×</button>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Rating Selection */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Rating</label>
            <div className='flex gap-2'>
              {[1, 2, 3, 4, 5].map(val => (
                <button
                  key={val}
                  type='button'
                  onClick={() => setRating(val)}
                  className={`text-3xl transition ${rating >= val ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ★
                </button>
              ))}
            </div>
            <p className='text-sm text-gray-600 mt-1'>{rating} / 5</p>
          </div>

          {/* Comment */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Comment (Optional)</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder='Share your experience...'
              maxLength={500}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none'
              rows={4}
            />
            <p className='text-xs text-gray-500 mt-1'>{comment.length}/500</p>
          </div>

          {/* Buttons */}
          <div className='flex gap-3'>
            <button
              type='button'
              onClick={onClose}
              className='flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold transition'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={loading}
              className='flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-2 rounded-lg font-semibold transition'
            >
              {loading ? 'Submitting...' : 'Submit Rating'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RatingModal

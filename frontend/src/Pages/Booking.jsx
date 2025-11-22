import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { getItem } from '../api'
import { toast } from 'react-toastify'

const Booking = () => {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { token } = useContext(ShopContext)
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [bookingData, setBookingData] = useState({
    startDate: '',
    endDate: '',
    paymentMethod: 'card'
  })

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        const res = await getItem(productId)
        if (res.success) {
          setItem(res.item)
        } else {
          toast.error(res.message || 'Item not found')
          navigate('/collection')
        }
      } catch (err) {
        toast.error(err.message)
        navigate('/collection')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [productId])

  const handleDateChange = (e) => {
    const { name, value } = e.target
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const calculateDays = () => {
    if (!bookingData.startDate || !bookingData.endDate) return 0
    const start = new Date(bookingData.startDate)
    const end = new Date(bookingData.endDate)
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    return diff > 0 ? diff : 0
  }

  const calculateTotal = () => {
    const days = calculateDays()
    const deposit = item?.deposit || 0
    const rentalCost = (item?.price || 0) * days
    const tax = rentalCost * 0.1
    return {
      rentalCost,
      tax,
      deposit,
      total: rentalCost + tax + deposit
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!token) {
      toast.error('Please login to book')
      navigate('/login')
      return
    }

    if (!bookingData.startDate || !bookingData.endDate) {
      toast.error('Please select start and end dates')
      return
    }

    const days = calculateDays()
    if (days <= 0) {
      toast.error('End date must be after start date')
      return
    }

    try {
      // Create order - similar to cart checkout
      const orderData = {
        items: [
          {
            _id: item._id,
            title: item.title,
            price: item.price,
            quantity: days,
            images: item.images,
            deposit: item.deposit
          }
        ],
        startDate: bookingData.startDate,
        endDate: bookingData.endDate,
        paymentMethod: bookingData.paymentMethod,
        totalDays: days
      }

      // TODO: Call API to create booking
      // const res = await createBooking(orderData)
      // if (res.success) {
      //   toast.success('Booking confirmed!')
      //   navigate(`/orders`)
      // }

      // For now, just redirect to orders
      toast.success('Booking submitted! Please complete payment.')
      navigate('/orders')
    } catch (err) {
      toast.error(err.message || 'Booking failed')
    }
  }

  if (loading) {
    return (
      <main className='w-full min-h-screen bg-blue-50 py-12 flex items-center justify-center'>
        <div className='text-center'>
          <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
          <p className='text-gray-600 mt-4'>Loading item details...</p>
        </div>
      </main>
    )
  }

  if (!item) return null

  const { rentalCost, tax, deposit, total } = calculateTotal()
  const days = calculateDays()

  return (
    <main className='w-full min-h-screen bg-blue-50 py-12'>
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <button 
          onClick={() => navigate(-1)}
          className='text-blue-600 hover:text-blue-800 font-semibold mb-6 flex items-center gap-2'
        >
          ← Back
        </button>

        <h1 className='text-4xl font-bold text-gray-800 mb-12'>📅 Book Item</h1>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Booking Form */}
          <div className='lg:col-span-2'>
            <div className='bg-white rounded-lg border border-gray-200 shadow-md p-8'>
              <h2 className='text-2xl font-bold text-gray-800 mb-6'>Booking Details</h2>

              <form onSubmit={handleSubmit} className='space-y-6'>
                {/* Start Date */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Start Date *
                  </label>
                  <input
                    type='date'
                    name='startDate'
                    value={bookingData.startDate}
                    onChange={handleDateChange}
                    min={new Date().toISOString().split('T')[0]}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
                    required
                  />
                  <p className='text-sm text-gray-500 mt-1'>When do you want to rent this item?</p>
                </div>

                {/* End Date */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    End Date *
                  </label>
                  <input
                    type='date'
                    name='endDate'
                    value={bookingData.endDate}
                    onChange={handleDateChange}
                    min={bookingData.startDate || new Date().toISOString().split('T')[0]}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
                    required
                  />
                  <p className='text-sm text-gray-500 mt-1'>When will you return the item?</p>
                </div>

                {/* Duration Info */}
                {days > 0 && (
                  <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
                    <p className='text-gray-700'>
                      <span className='font-semibold'>Duration:</span> {days} day{days !== 1 ? 's' : ''}
                    </p>
                  </div>
                )}

                {/* Payment Method */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-3'>
                    Payment Method *
                  </label>
                  <div className='space-y-3'>
                    {['card', 'paypal', 'bank_transfer'].map(method => (
                      <label key={method} className='flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition'>
                        <input
                          type='radio'
                          name='paymentMethod'
                          value={method}
                          checked={bookingData.paymentMethod === method}
                          onChange={handleDateChange}
                          className='w-4 h-4 text-blue-600'
                        />
                        <span className='ml-3 font-medium text-gray-700 capitalize'>
                          {method.replace('_', ' ')}
                        </span>
                      </label>
                    ))}
                  </div>
                  <p className='text-sm text-gray-500 mt-2'>Payment will be held in escrow until rental completion</p>
                </div>

                {/* Terms */}
                <div className='flex items-start gap-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg'>
                  <input
                    type='checkbox'
                    id='terms'
                    required
                    className='w-4 h-4 mt-1 text-blue-600 rounded focus:ring-2 focus:ring-blue-500'
                  />
                  <label htmlFor='terms' className='text-sm text-gray-700'>
                    I agree to the rental terms and conditions. I will return the item in the same condition or pay for damages.
                  </label>
                </div>

                <button
                  type='submit'
                  className='w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition text-lg'
                >
                  Proceed to Payment
                </button>
              </form>
            </div>
          </div>

          {/* Item Summary & Pricing */}
          <div>
            {/* Item Card */}
            <div className='bg-white rounded-lg border border-gray-200 shadow-md p-6 mb-6'>
              {item.images && item.images[0] && (
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className='w-full h-40 object-cover rounded-lg mb-4'
                />
              )}
              <h3 className='font-bold text-lg text-gray-800 mb-2 line-clamp-2'>
                {item.title}
              </h3>
              <p className='text-sm text-gray-600 line-clamp-2 mb-4'>
                {item.description}
              </p>

              <div className='space-y-2 text-sm mb-4'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Category:</span>
                  <span className='font-semibold text-gray-800'>{item.category}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Daily Rate:</span>
                  <span className='font-bold text-blue-600'>${item.price}</span>
                </div>
                {item.deposit && (
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Deposit:</span>
                    <span className='font-semibold text-gray-800'>${item.deposit}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Pricing Breakdown */}
            <div className='bg-white rounded-lg border border-gray-200 shadow-md p-6 sticky top-20'>
              <h3 className='text-xl font-bold text-gray-800 mb-6'>Price Breakdown</h3>

              {days === 0 ? (
                <p className='text-gray-500 text-center py-4'>Select dates to see pricing</p>
              ) : (
                <>
                  <div className='space-y-3 mb-6 pb-6 border-b border-gray-200'>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>${item.price} × {days} days</span>
                      <span className='font-semibold text-gray-800'>${rentalCost.toFixed(2)}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Tax (10%)</span>
                      <span className='font-semibold text-gray-800'>${tax.toFixed(2)}</span>
                    </div>
                    {deposit > 0 && (
                      <div className='flex justify-between'>
                        <span className='text-gray-600'>Deposit (Escrow)</span>
                        <span className='font-semibold text-gray-800'>${deposit.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  <div className='flex justify-between items-center'>
                    <span className='text-lg font-bold text-gray-800'>Total</span>
                    <span className='text-2xl font-bold text-blue-600'>
                      ${total.toFixed(2)}
                    </span>
                  </div>

                  <p className='text-xs text-gray-500 mt-4 p-3 bg-gray-50 rounded'>
                    ℹ️ Deposit is held in escrow and released after item return inspection. Any damages will be deducted from the deposit.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Booking

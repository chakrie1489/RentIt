import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { getItem, createRequest } from '../api';
import { toast } from 'react-toastify';

const CreateRequest = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(ShopContext);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    start: '',
    end: '',
    message: '',
    proposedPrice: '',
    itemDetails: '',
    requesterPhone: '',
    requesterNotes: '',
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (!token) {
      toast.error('Please login to create a request');
      navigate('/login');
      return;
    }

    const fetchItem = async () => {
      try {
        setLoading(true);
        const res = await getItem(productId);
        if (res.success) {
          setItem(res.item);
        } else {
          toast.error(res.message || 'Item not found');
          navigate('/collection');
        }
      } catch (err) {
        toast.error(err.message);
        navigate('/collection');
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [productId, token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.start) newErrors.start = 'Start date is required';
    if (!formData.end) newErrors.end = 'End date is required';

    if (formData.start && formData.end) {
      const startDate = new Date(formData.start);
      const endDate = new Date(formData.end);
      if (startDate >= endDate) {
        newErrors.end = 'End date must be after start date';
      }
      const now = new Date();
      if (startDate < now) {
        newErrors.start = 'Start date cannot be in the past';
      }
    }

    if (formData.proposedPrice && (isNaN(formData.proposedPrice) || formData.proposedPrice < 0)) {
      newErrors.proposedPrice = 'Please enter a valid price';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Please fix the errors in the form');
      return;
    }

    setSubmitting(true);
    try {
      const body = {
        start: formData.start,
        end: formData.end,
        message: formData.message,
        proposedPrice: formData.proposedPrice ? Number(formData.proposedPrice) : undefined,
        itemDetails: formData.itemDetails,
        requesterPhone: formData.requesterPhone,
        requesterNotes: formData.requesterNotes,
      };

      const res = await createRequest(productId, body);

      if (res.success) {
        setSuccess({
          ok: true,
          message: '✨ Request created successfully! The item owner will review your request soon.',
        });
        toast.success('Request sent! Check your profile for updates.');
        setTimeout(() => {
          navigate('/profile');
        }, 2000);
      } else {
        setSuccess({
          ok: false,
          message: res.message || 'Failed to create request',
        });
        toast.error(res.message || 'Failed to create request');
      }
    } catch (err) {
      setSuccess({
        ok: false,
        message: err.message || 'An error occurred',
      });
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='inline-flex items-center justify-center w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4'></div>
          <p className='text-gray-600 font-medium'>Loading item details...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return null;
  }

  const now = new Date().toISOString().slice(0, 16);

  return (
    <div className='min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 py-12'>
      <div className='max-w-6xl mx-auto px-4'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2'>
            Request This Item
          </h1>
          <p className='text-gray-600 text-lg'>Fill in the details below to send a rental request</p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Item Preview - Left Side */}
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-2xl shadow-lg overflow-hidden sticky top-8'>
              {item.images && item.images.length > 0 ? (
                <img src={item.images[0]} alt={item.title} className='w-full h-64 object-cover' />
              ) : (
                <div className='w-full h-64 bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center'>
                  <span className='text-gray-400'>No image</span>
                </div>
              )}
              <div className='p-6'>
                <h2 className='text-2xl font-bold text-gray-900 mb-2'>{item.title}</h2>
                <p className='text-gray-600 text-sm mb-4 line-clamp-3'>{item.description}</p>
                <div className='bg-gradient-to-r from-primary-100 to-accent-100 rounded-lg p-4 mb-4'>
                  <p className='text-primary-600 font-semibold mb-1'>Listed Price</p>
                  <p className='text-3xl font-bold text-primary-700'>
                    ₹{item.price} <span className='text-lg text-gray-600'>/ {item.priceUnit}</span>
                  </p>
                </div>

                {item.owner && (
                  <div className='bg-white border-2 border-accent-200 rounded-lg p-4'>
                    <p className='text-xs text-gray-500 uppercase tracking-wide mb-1'>Lender</p>
                    <p className='text-lg font-bold text-gray-900'>{item.owner.name}</p>
                    {item.owner.email && (
                      <p className='text-sm text-gray-600 mt-1'>{item.owner.email}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Request Form - Right Side */}
          <div className='lg:col-span-2'>
            <div className='bg-white rounded-2xl shadow-lg p-8'>
              <form onSubmit={handleSubmit} className='space-y-6'>
                {/* Date & Time Section */}
                <div className='bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-6 border border-primary-200'>
                  <h3 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-2'>
                    📅 Rental Dates & Time
                  </h3>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-semibold text-gray-700 mb-2'>
                        Start Date & Time *
                      </label>
                      <input
                        type='datetime-local'
                        name='start'
                        min={now}
                        value={formData.start}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition ${
                          errors.start
                            ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200'
                            : 'border-primary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200'
                        }`}
                      />
                      {errors.start && <p className='text-red-600 text-sm mt-1'>{errors.start}</p>}
                    </div>
                    <div>
                      <label className='block text-sm font-semibold text-gray-700 mb-2'>
                        End Date & Time *
                      </label>
                      <input
                        type='datetime-local'
                        name='end'
                        min={now}
                        value={formData.end}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition ${
                          errors.end
                            ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200'
                            : 'border-primary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200'
                        }`}
                      />
                      {errors.end && <p className='text-red-600 text-sm mt-1'>{errors.end}</p>}
                    </div>
                  </div>
                </div>

                {/* Price Section */}
                <div className='bg-gradient-to-r from-warning-50 to-accent-50 rounded-xl p-6 border border-warning-200'>
                  <h3 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-2'>
                    💰 Pricing
                  </h3>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Proposed Price (Optional)
                    </label>
                    <div className='relative'>
                      <span className='absolute left-4 top-3 text-2xl font-bold text-gray-400'>₹</span>
                      <input
                        type='number'
                        name='proposedPrice'
                        step='0.01'
                        min='0'
                        value={formData.proposedPrice}
                        onChange={handleChange}
                        placeholder='Leave blank to use listed price'
                        className={`w-full px-4 py-3 pl-8 rounded-lg border-2 focus:outline-none transition ${
                          errors.proposedPrice
                            ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200'
                            : 'border-warning-300 focus:border-warning-500 focus:ring-2 focus:ring-warning-200'
                        }`}
                      />
                    </div>
                    {errors.proposedPrice && (
                      <p className='text-red-600 text-sm mt-1'>{errors.proposedPrice}</p>
                    )}
                  </div>
                </div>

                {/* Item Requirements Section */}
                <div className='bg-gradient-to-r from-success-50 to-primary-50 rounded-xl p-6 border border-success-200'>
                  <h3 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-2'>
                    📋 What Do You Need?
                  </h3>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Item Details & Requirements (Optional)
                    </label>
                    <textarea
                      name='itemDetails'
                      value={formData.itemDetails}
                      onChange={handleChange}
                      rows='3'
                      maxLength='1000'
                      placeholder='E.g., "I need it for a small event", "Please ensure it has X feature", etc.'
                      className='w-full px-4 py-3 rounded-lg border-2 border-success-300 focus:border-success-500 focus:ring-2 focus:ring-success-200 focus:outline-none transition resize-none'
                    />
                    <p className='text-xs text-gray-500 mt-1'>
                      {formData.itemDetails.length}/1000 characters
                    </p>
                  </div>
                </div>

                {/* Communication Section */}
                <div className='bg-gradient-to-r from-accent-50 to-warning-50 rounded-xl p-6 border border-accent-200'>
                  <h3 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-2'>
                    💬 Communication
                  </h3>
                  <div className='space-y-4'>
                    <div>
                      <label className='block text-sm font-semibold text-gray-700 mb-2'>
                        Your Phone Number (Optional)
                      </label>
                      <input
                        type='tel'
                        name='requesterPhone'
                        value={formData.requesterPhone}
                        onChange={handleChange}
                        placeholder='E.g., +1 (555) 123-4567'
                        className='w-full px-4 py-3 rounded-lg border-2 border-accent-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-200 focus:outline-none transition'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-semibold text-gray-700 mb-2'>
                        Message to Lender (Optional)
                      </label>
                      <textarea
                        name='message'
                        value={formData.message}
                        onChange={handleChange}
                        rows='3'
                        maxLength='500'
                        placeholder='Tell the lender why you need this item, any special requests, etc.'
                        className='w-full px-4 py-3 rounded-lg border-2 border-accent-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-200 focus:outline-none transition resize-none'
                      />
                      <p className='text-xs text-gray-500 mt-1'>
                        {formData.message.length}/500 characters
                      </p>
                    </div>
                    <div>
                      <label className='block text-sm font-semibold text-gray-700 mb-2'>
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        name='requesterNotes'
                        value={formData.requesterNotes}
                        onChange={handleChange}
                        rows='2'
                        maxLength='1000'
                        placeholder='Any other information the lender should know...'
                        className='w-full px-4 py-3 rounded-lg border-2 border-accent-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-200 focus:outline-none transition resize-none'
                      />
                      <p className='text-xs text-gray-500 mt-1'>
                        {formData.requesterNotes.length}/1000 characters
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Section */}
                <div className='space-y-4 pt-6'>
                  <button
                    type='submit'
                    disabled={submitting || !item.available}
                    className={`w-full py-4 px-6 rounded-lg font-bold text-lg text-white transition transform ${
                      submitting || !item.available
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 hover:shadow-lg hover:scale-105 active:scale-95'
                    }`}
                  >
                    {submitting ? (
                      <span className='flex items-center justify-center gap-2'>
                        <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                        Sending Request...
                      </span>
                    ) : (
                      '✨ Send Request'
                    )}
                  </button>

                  {!item.available && (
                    <p className='bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded text-center font-semibold'>
                      ⚠️ This item is currently not available for requests
                    </p>
                  )}

                  <button
                    type='button'
                    onClick={() => navigate(`/product/${productId}`)}
                    className='w-full py-3 px-6 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition'
                  >
                    Cancel & View Item
                  </button>
                </div>

                {/* Success/Error Message */}
                {success && (
                  <div
                    className={`p-6 rounded-lg text-center font-semibold border-l-4 ${
                      success.ok
                        ? 'bg-success-50 text-success-700 border-success-500'
                        : 'bg-red-50 text-red-700 border-red-500'
                    }`}
                  >
                    {success.message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRequest;

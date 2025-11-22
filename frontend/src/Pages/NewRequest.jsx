import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createRequest } from "../api";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const NewRequest = () => {
  const navigate = useNavigate();
  const { token } = useContext(ShopContext);
  const [loading, setLoading] = useState(false);

  const CATEGORIES = [
    "electronics",
    "furniture",
    "tools",
    "vehicles",
    "sports",
    "kitchen",
    "garden",
    "other",
  ];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "electronics",
    desiredStart: "",
    desiredEnd: "",
    maxPrice: "",
    radiusKm: 25,
    specialRequirements: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.title ||
      !formData.description ||
      !formData.desiredStart ||
      !formData.desiredEnd ||
      !formData.maxPrice
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const startDate = new Date(formData.desiredStart);
    const endDate = new Date(formData.desiredEnd);

    if (startDate >= endDate) {
      toast.error("End date must be after start date");
      return;
    }

    if (formData.maxPrice <= 0) {
      toast.error("Max price must be greater than 0");
      return;
    }

    try {
      setLoading(true);
      const res = await createRequest({
        ...formData,
        desiredStart: startDate.toISOString(),
        desiredEnd: endDate.toISOString(),
        maxPrice: parseFloat(formData.maxPrice),
        radiusKm: parseInt(formData.radiusKm),
      });

      if (res.success) {
        toast.success("Request posted successfully!");
        navigate("/requests");
      } else {
        toast.error(res.message || "Failed to post request");
      }
    } catch (err) {
      toast.error(err.message || "Error posting request");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <main className='w-full min-h-screen bg-blue-50'>
        <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-16'>
          <div className='bg-white rounded-lg p-8 text-center max-w-md mx-auto border border-gray-200'>
            <p className='text-3xl mb-4'>🔐</p>
            <h2 className='text-2xl font-bold text-gray-800 mb-3'>Login Required</h2>
            <p className='text-gray-600 mb-6'>You must be logged in to post a request.</p>
            <button
              onClick={() => navigate("/login")}
              className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition'
            >
              Go to Login
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className='w-full min-h-screen bg-blue-50'>
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-16'>
        <div className='max-w-2xl mx-auto'>
          <div className='mb-10'>
            <button
              onClick={() => navigate("/requests")}
              className='text-blue-600 hover:text-blue-700 font-semibold mb-4 flex items-center gap-1'
            >
              ← Back to Requests
            </button>
            <h1 className='text-4xl font-bold text-gray-800 mb-3'>
              📋 Post a Rental Request
            </h1>
            <p className='text-lg text-gray-600'>
              Tell people what item you're looking to rent. Nearby owners can see your request and send offers.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className='bg-white rounded-lg p-8 border border-gray-200 shadow-md'
          >
            {/* Title */}
            <div className='mb-6'>
              <label className='block text-sm font-semibold text-gray-800 mb-2'>
                What do you need? *
              </label>
              <input
                type='text'
                name='title'
                value={formData.title}
                onChange={handleChange}
                placeholder='e.g., Laptop, Power Drill, Tent'
                className='w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none'
                maxLength={100}
              />
            </div>

            {/* Category */}
            <div className='mb-6'>
              <label className='block text-sm font-semibold text-gray-800 mb-2'>
                Category *
              </label>
              <select
                name='category'
                value={formData.category}
                onChange={handleChange}
                className='w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none'
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className='mb-6'>
              <label className='block text-sm font-semibold text-gray-800 mb-2'>
                Description *
              </label>
              <textarea
                name='description'
                value={formData.description}
                onChange={handleChange}
                placeholder='Describe what you need, how you plan to use it, and any specific requirements'
                className='w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none'
                rows={4}
                maxLength={1000}
              />
              <p className='text-xs text-gray-500 mt-1'>
                {formData.description.length}/1000
              </p>
            </div>

            {/* Date Range */}
            <div className='grid grid-cols-2 gap-4 mb-6'>
              <div>
                <label className='block text-sm font-semibold text-gray-800 mb-2'>
                  Start Date & Time *
                </label>
                <input
                  type='datetime-local'
                  name='desiredStart'
                  value={formData.desiredStart}
                  onChange={handleChange}
                  className='w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none'
                />
              </div>
              <div>
                <label className='block text-sm font-semibold text-gray-800 mb-2'>
                  End Date & Time *
                </label>
                <input
                  type='datetime-local'
                  name='desiredEnd'
                  value={formData.desiredEnd}
                  onChange={handleChange}
                  className='w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none'
                />
              </div>
            </div>

            {/* Budget */}
            <div className='grid grid-cols-2 gap-4 mb-6'>
              <div>
                <label className='block text-sm font-semibold text-gray-800 mb-2'>
                  Max Price per Day ($) *
                </label>
                <input
                  type='number'
                  name='maxPrice'
                  value={formData.maxPrice}
                  onChange={handleChange}
                  placeholder='0.00'
                  step='0.01'
                  min='0'
                  className='w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none'
                />
              </div>
              <div>
                <label className='block text-sm font-semibold text-gray-800 mb-2'>
                  Pickup Radius (km)
                </label>
                <input
                  type='number'
                  name='radiusKm'
                  value={formData.radiusKm}
                  onChange={handleChange}
                  min='1'
                  max='100'
                  className='w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none'
                />
              </div>
            </div>

            {/* Special Requirements */}
            <div className='mb-8'>
              <label className='block text-sm font-semibold text-gray-800 mb-2'>
                Special Requirements
              </label>
              <textarea
                name='specialRequirements'
                value={formData.specialRequirements}
                onChange={handleChange}
                placeholder='Any specific conditions? e.g., "Must have latest specs", "Preferably with warranty"'
                className='w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none'
                rows={3}
                maxLength={500}
              />
              <p className='text-xs text-gray-500 mt-1'>
                {formData.specialRequirements.length}/500
              </p>
            </div>

            {/* Buttons */}
            <div className='flex gap-4'>
              <button
                type='button'
                onClick={() => navigate("/requests")}
                className='flex-1 border-2 border-gray-300 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition'
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={loading}
                className='flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold transition'
              >
                {loading ? "Posting..." : "Post Request"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default NewRequest;

import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { getItems, getAllRequests } from "../api";
import { toast } from "react-toastify";

const Collection = () => {
  const navigate = useNavigate();
  const { search, showSearch } = useContext(ShopContext);
  const [activeTab, setActiveTab] = useState("listings"); // listings or requests
  const [items, setItems] = useState([]);
  const [requests, setRequests] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [sortType, setSortType] = useState("newest");
  const [priceFilter, setPriceFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Load all items and requests
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [itemRes, reqRes] = await Promise.all([getItems(), getAllRequests()]);
        
        if (itemRes.success) {
          setItems(itemRes.items || []);
        } else {
          toast.error(itemRes.message || "Failed to load items");
        }
        
        if (reqRes.success) {
          setRequests(reqRes.requests || []);
        } else {
          toast.error(reqRes.message || "Failed to load requests");
        }
      } catch (err) {
        toast.error(err.message || "Error loading data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Filter and sort items
  useEffect(() => {
    let filtered = items.slice();

    // Search filter
    if (showSearch && search) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Price filter
    if (priceFilter !== "all") {
      const [minPrice, maxPrice] = priceFilter.split("-").map(Number);
      filtered = filtered.filter((item) => item.price >= minPrice && item.price <= maxPrice);
    }

    // Sort
    switch (sortType) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "newest":
      default:
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    setFilteredItems(filtered);
  }, [items, search, showSearch, sortType, priceFilter]);

  // Filter and sort requests
  useEffect(() => {
    let filtered = requests.slice().filter((req) => req.status === "open");

    // Search filter
    if (showSearch && search) {
      filtered = filtered.filter((req) =>
        req.title.toLowerCase().includes(search.toLowerCase()) ||
        req.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Price filter (for requests, filter by maxPrice)
    if (priceFilter !== "all") {
      const [minPrice, maxPrice] = priceFilter.split("-").map(Number);
      filtered = filtered.filter((req) => req.maxPrice >= minPrice && req.maxPrice <= maxPrice);
    }

    // Sort
    switch (sortType) {
      case "price-low":
        filtered.sort((a, b) => a.maxPrice - b.maxPrice);
        break;
      case "price-high":
        filtered.sort((a, b) => b.maxPrice - a.maxPrice);
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "newest":
      default:
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    setFilteredRequests(filtered);
  }, [requests, search, showSearch, sortType, priceFilter]);

  return (
    <main className='w-full min-h-screen bg-blue-50'>
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-16'>
        <div className='mb-12'>
          <h1 className='text-4xl font-bold text-gray-800 mb-3'>
            � Browse Everything
          </h1>
          <p className='text-lg text-gray-600'>
            Discover items available for rent and requests from neighbors. Find exactly what you need or help someone get what they're looking for.
          </p>
        </div>

        {/* Tabs */}
        <div className='flex gap-4 mb-8 border-b border-gray-300'>
          <button
            onClick={() => setActiveTab("listings")}
            className={`py-3 px-6 font-semibold transition ${
              activeTab === "listings"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            📦 Available Listings
          </button>
          <button
            onClick={() => setActiveTab("requests")}
            className={`py-3 px-6 font-semibold transition ${
              activeTab === "requests"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            🙋 Open Requests
          </button>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-lg p-6 shadow-md border border-gray-200 sticky top-20'>
              <h3 className='text-lg font-bold text-gray-800 mb-6'>Filters</h3>

              <div className='mb-8'>
                <p className='font-semibold text-gray-700 mb-4'>Price Range</p>
                <div className='space-y-3'>
                  <label className='flex items-center gap-3 cursor-pointer'>
                    <input
                      type='radio'
                      name='price'
                      value='all'
                      checked={priceFilter === 'all'}
                      onChange={(e) => setPriceFilter(e.target.value)}
                      className='w-4 h-4 accent-blue-500'
                    />
                    <span className='text-gray-700'>All Prices</span>
                  </label>
                  <label className='flex items-center gap-3 cursor-pointer'>
                    <input
                      type='radio'
                      name='price'
                      value='0-10'
                      checked={priceFilter === '0-10'}
                      onChange={(e) => setPriceFilter(e.target.value)}
                      className='w-4 h-4 accent-blue-500'
                    />
                    <span className='text-gray-700'>₹0 - ₹10</span>
                  </label>
                  <label className='flex items-center gap-3 cursor-pointer'>
                    <input
                      type='radio'
                      name='price'
                      value='10-50'
                      checked={priceFilter === '10-50'}
                      onChange={(e) => setPriceFilter(e.target.value)}
                      className='w-4 h-4 accent-blue-500'
                    />
                    <span className='text-gray-700'>₹10 - ₹50</span>
                  </label>
                  <label className='flex items-center gap-3 cursor-pointer'>
                    <input
                      type='radio'
                      name='price'
                      value='50-100'
                      checked={priceFilter === '50-100'}
                      onChange={(e) => setPriceFilter(e.target.value)}
                      className='w-4 h-4 accent-blue-500'
                    />
                    <span className='text-gray-700'>₹50 - ₹100</span>
                  </label>
                  <label className='flex items-center gap-3 cursor-pointer'>
                    <input
                      type='radio'
                      name='price'
                      value='100-1000'
                      checked={priceFilter === '100-1000'}
                      onChange={(e) => setPriceFilter(e.target.value)}
                      className='w-4 h-4 accent-blue-500'
                    />
                    <span className='text-gray-700'>₹100+</span>
                  </label>
                </div>
              </div>

              <hr className='my-6' />

              <div>
                <p className='font-semibold text-gray-700 mb-4'>Sort By</p>
                <select
                  value={sortType}
                  onChange={(e) => setSortType(e.target.value)}
                  className='w-full bg-white text-gray-800 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value='newest'>Newest First</option>
                  <option value='oldest'>Oldest First</option>
                  <option value='price-low'>Price: Low to High</option>
                  <option value='price-high'>Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Items/Requests Grid */}
          <div className='lg:col-span-3'>
            {loading ? (
              <div className='text-center py-20'>
                <div className='inline-block animate-spin w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full'></div>
                <p className='text-gray-600 mt-4'>Loading {activeTab === "listings" ? "listings" : "requests"}...</p>
              </div>
            ) : activeTab === "listings" ? (
              filteredItems.length === 0 ? (
                <div className='text-center py-20 bg-white rounded-lg border border-gray-200 shadow-md'>
                  <p className='text-2xl text-gray-600 mb-4'>📭 No listings found</p>
                  <p className='text-gray-500'>Try adjusting your filters or search terms</p>
                </div>
              ) : (
                <div>
                  <p className='text-gray-600 mb-6 text-lg font-semibold'>
                    ✨ {filteredItems.length} items available
                  </p>
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {filteredItems.map((item) => (
                      <div
                        key={item._id}
                        onClick={() => navigate(`/product/${item._id}`)}
                        className='bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transition-all cursor-pointer border border-gray-200'
                      >
                        <div className='h-48 bg-gray-200 overflow-hidden relative'>
                          {item.images && item.images.length > 0 ? (
                            <img
                              src={item.images[0]}
                              alt={item.title}
                              className='w-full h-full object-cover hover:scale-110 transition-transform duration-300'
                            />
                          ) : (
                            <div className='flex items-center justify-center h-full text-gray-400'>
                              <span className='text-4xl'>📦</span>
                            </div>
                          )}
                          <div className='absolute top-3 right-3 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md'>
                            ₹{item.price}/{item.priceUnit}
                          </div>
                        </div>

                        <div className='p-4'>
                          <h3 className='font-bold text-lg text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition'>
                            {item.title}
                          </h3>
                          <p className='text-sm text-gray-600 line-clamp-2 mb-3'>
                            {item.description}
                          </p>

                          <div className='flex items-center gap-2 mb-4'>
                            {item.available ? (
                              <>
                                <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                                <span className='text-sm text-green-700 font-semibold'>Available</span>
                              </>
                            ) : (
                              <>
                                <span className='w-2 h-2 bg-red-500 rounded-full'></span>
                                <span className='text-sm text-red-700 font-semibold'>Not Available</span>
                              </>
                            )}
                          </div>

                          {item.owner && (
                            <div className='text-xs text-gray-600 mb-3'>
                              By <span className='font-semibold text-gray-800'>{item.owner.name}</span>
                            </div>
                          )}

                          <button className='w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition shadow-md'>
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ) : // Requests tab
            filteredRequests.length === 0 ? (
              <div className='text-center py-20 bg-white rounded-lg border border-gray-200 shadow-md'>
                <p className='text-2xl text-gray-600 mb-4'>📭 No open requests found</p>
                <p className='text-gray-500'>Try adjusting your filters or check back later</p>
              </div>
            ) : (
              <div>
                <p className='text-gray-600 mb-6 text-lg font-semibold'>
                  🎯 {filteredRequests.length} open requests
                </p>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {filteredRequests.map((req) => (
                    <div
                      key={req._id}
                      onClick={() => navigate(`/requests/${req._id}`)}
                      className='bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transition-all cursor-pointer border border-gray-200'
                    >
                      <div className='h-32 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center'>
                        <span className='text-5xl'>🙋</span>
                      </div>

                      <div className='p-4'>
                        <h3 className='font-bold text-lg text-gray-800 mb-2 line-clamp-2'>
                          {req.title}
                        </h3>
                        <p className='text-sm text-gray-600 line-clamp-2 mb-3'>
                          {req.description}
                        </p>

                        <div className='space-y-2 mb-3 text-xs text-gray-600'>
                          <div className='flex justify-between'>
                            <span>📍 Location:</span>
                            <span className='font-semibold'>{req.location}</span>
                          </div>
                          <div className='flex justify-between'>
                            <span>💰 Max Price:</span>
                            <span className='font-semibold text-green-600'>₹{req.maxPrice}/day</span>
                          </div>
                          <div className='flex justify-between'>
                            <span>📅 Needed:</span>
                            <span className='font-semibold'>
                              {new Date(req.desiredStart).toLocaleDateString()} to {new Date(req.desiredEnd).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <button className='w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition shadow-md'>
                          Send Offer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Collection;

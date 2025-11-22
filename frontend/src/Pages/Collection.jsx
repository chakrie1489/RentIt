import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { getItems } from "../api";
import { toast } from "react-toastify";

const Collection = () => {
  const navigate = useNavigate();
  const { search, showSearch } = useContext(ShopContext);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [sortType, setSortType] = useState("newest");
  const [priceFilter, setPriceFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Load all items
  useEffect(() => {
    const loadItems = async () => {
      try {
        setLoading(true);
        const res = await getItems();
        if (res.success) {
          setItems(res.items || []);
        } else {
          toast.error(res.message || "Failed to load items");
        }
      } catch (err) {
        toast.error(err.message || "Error loading items");
      } finally {
        setLoading(false);
      }
    };
    loadItems();
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

  return (
    <main className='w-full min-h-screen bg-blue-50'>
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-16'>
        <div className='mb-12'>
          <h1 className='text-4xl font-bold text-gray-800 mb-3'>
            🏠 Browse Listings
          </h1>
          <p className='text-lg text-gray-600'>
            Find items to rent from your neighbors. Discover thousands of available rentals at affordable prices.
          </p>
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
                    <span className='text-gray-700'>$0 - $10</span>
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
                    <span className='text-gray-700'>$10 - $50</span>
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
                    <span className='text-gray-700'>$50 - $100</span>
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
                    <span className='text-gray-700'>$100+</span>
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

          {/* Items Grid */}
          <div className='lg:col-span-3'>
            {loading ? (
              <div className='text-center py-20'>
                <div className='inline-block animate-spin w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full'></div>
                <p className='text-gray-600 mt-4'>Loading items...</p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className='text-center py-20 bg-white rounded-lg border border-gray-200 shadow-md'>
                <p className='text-2xl text-gray-600 mb-4'>📭 No items found</p>
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
                          ${item.price}/{item.priceUnit}
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
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Collection;

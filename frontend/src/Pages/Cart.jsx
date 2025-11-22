import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'

const Cart = () => {
  const { products, cartItems, updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  const calculateTotal = () => {
    let total = 0;
    cartData.forEach(item => {
      const productData = products.find(p => p._id === item._id);
      if (productData) {
        total += productData.price * item.quantity;
      }
    });
    return total;
  };

  const handleRemoveItem = (_id, size) => {
    updateQuantity(_id, size, 0);
    toast.info('Item removed from cart');
  };

  return (
    <main className='w-full min-h-screen bg-blue-50 py-12'>
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <div className='mb-12'>
          <button 
            onClick={() => navigate(-1)}
            className='text-blue-600 hover:text-blue-800 font-semibold mb-4 flex items-center gap-2'
          >
            ← Back
          </button>
          <h1 className='text-4xl font-bold text-gray-800 mb-2'>🛒 Your Cart</h1>
          <p className='text-lg text-gray-600'>Review your booking details and proceed to checkout.</p>
        </div>

        {cartData.length === 0 ? (
          <div className='bg-white rounded-lg p-16 text-center shadow-md border border-gray-200'>
            <p className='text-5xl mb-4'>🛍️</p>
            <h2 className='text-2xl font-bold text-gray-800 mb-2'>Your cart is empty</h2>
            <p className='text-gray-600 mb-6'>Start adding items to your cart!</p>
            <button
              onClick={() => navigate('/collection')}
              className='bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition'
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Cart Items */}
            <div className='lg:col-span-2'>
              <div className='space-y-4'>
                {cartData.map((item, i) => {
                  const productData = products.find(p => p._id === item._id);
                  if (!productData) return null;

                  return (
                    <div 
                      key={i} 
                      className='bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition overflow-hidden p-5'
                    >
                      <div className='grid grid-cols-1 sm:grid-cols-4 gap-4 items-start'>
                        {/* Image */}
                        <div className='h-24 bg-gray-200 rounded-lg overflow-hidden'>
                          {productData.images && productData.images[0] ? (
                            <img
                              src={productData.images[0]}
                              alt={productData.title}
                              className='w-full h-full object-cover'
                            />
                          ) : (
                            <div className='w-full h-full bg-gray-300 flex items-center justify-center'>
                              <span className='text-2xl text-gray-500'>📦</span>
                            </div>
                          )}
                        </div>

                        {/* Details */}
                        <div className='sm:col-span-2'>
                          <h3 className='font-bold text-lg text-gray-800 line-clamp-2 mb-2'>
                            {productData.title}
                          </h3>
                          <div className='space-y-1 text-sm'>
                            <p className='text-gray-600'>
                              <span className='text-gray-400'>Price:</span> <span className='font-semibold text-gray-800'>${productData.price}/day</span>
                            </p>
                            {item.size && (
                              <p className='text-gray-600'>
                                <span className='text-gray-400'>Size:</span> <span className='font-semibold text-gray-800'>{item.size}</span>
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Quantity & Actions */}
                        <div className='flex flex-col items-end gap-3'>
                          <div className='flex items-center gap-2 bg-gray-100 rounded-lg p-1'>
                            <button
                              onClick={() => updateQuantity(item._id, item.size, Math.max(1, item.quantity - 1))}
                              className='px-2 py-1 text-gray-600 hover:text-gray-800 font-bold'
                            >
                              −
                            </button>
                            <input
                              type='number'
                              value={item.quantity}
                              onChange={(e) => {
                                const val = parseInt(e.target.value) || 0;
                                if (val > 0) updateQuantity(item._id, item.size, val);
                              }}
                              className='w-10 text-center bg-gray-100 border-0 font-semibold text-gray-800'
                              min={1}
                            />
                            <button
                              onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                              className='px-2 py-1 text-gray-600 hover:text-gray-800 font-bold'
                            >
                              +
                            </button>
                          </div>
                          
                          <p className='text-lg font-bold text-blue-600'>
                            ${(productData.price * item.quantity).toFixed(2)}
                          </p>

                          <button
                            onClick={() => handleRemoveItem(item._id, item.size)}
                            className='text-red-500 hover:text-red-700 font-semibold text-sm'
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sidebar - Order Summary */}
            <div>
              <div className='bg-white rounded-lg border border-gray-200 shadow-md p-6 sticky top-20'>
                <h2 className='text-xl font-bold text-gray-800 mb-6'>Order Summary</h2>

                <div className='space-y-4 mb-6 pb-6 border-b border-gray-200'>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Subtotal</span>
                    <span className='font-semibold text-gray-800'>${calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Tax (10%)</span>
                    <span className='font-semibold text-gray-800'>${(calculateTotal() * 0.1).toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Shipping</span>
                    <span className='font-semibold text-gray-800'>$5.00</span>
                  </div>
                </div>

                <div className='flex justify-between items-center mb-6'>
                  <span className='text-lg font-bold text-gray-800'>Total</span>
                  <span className='text-2xl font-bold text-blue-600'>
                    ${(calculateTotal() * 1.1 + 5).toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => navigate('/place-order')}
                  className='w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-bold text-lg transition mb-3'
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => navigate('/collection')}
                  className='w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold transition'
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;

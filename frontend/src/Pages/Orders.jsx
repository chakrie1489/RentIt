import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import RatingModal from "../components/RatingModal";

const Orders = () => {
  const { backendUrl, token } = useContext(ShopContext);
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratingModal, setRatingModal] = useState(null);

  const getAllOrdersData = async () => {
    try {
      setLoading(true);
      if (!token) {
        setLoading(false);
        return;
      }

      const res = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (res.data.success) {
        let allOrderItems = [];
        res.data.orders.map((order) => {
          order.items.map((item) => {
            if (typeof item === "object") {
              item["status"] = order.status;
              item["payment"] = order.payment;
              item["paymentMethod"] = order.paymentMethod;
              item["date"] = order.date;
              allOrderItems.push(item);
            }
          });
        });
        setOrderData(allOrderItems.reverse());
      } else {
        toast.error("Failed to load orders");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Error loading orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllOrdersData();
  }, [token]);

  if (!token) {
    return (
      <main className='w-full min-h-screen bg-blue-50 py-16'>
        <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
          <div className='bg-white rounded-lg p-12 text-center max-w-md mx-auto border border-gray-200'>
            <p className='text-3xl mb-4'>🔐</p>
            <h2 className='text-2xl font-bold text-gray-800 mb-3'>Login Required</h2>
            <p className='text-gray-600 mb-6'>Please login to view your orders.</p>
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
    <main className='w-full min-h-screen bg-blue-50 py-12'>
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <div className='mb-12'>
          <button 
            onClick={() => navigate(-1)}
            className='text-blue-600 hover:text-blue-800 font-semibold mb-4 flex items-center gap-2'
          >
            ← Back
          </button>
          <h1 className='text-4xl font-bold text-gray-800 mb-2'>📦 My Orders</h1>
          <p className='text-lg text-gray-600'>View your rental bookings and their status.</p>
        </div>

        {loading ? (
          <div className='text-center py-12'>
            <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
            <p className='text-gray-600 mt-4'>Loading orders...</p>
          </div>
        ) : orderData.length === 0 ? (
          <div className='bg-white rounded-lg p-12 text-center shadow-md border border-gray-200'>
            <p className='text-4xl mb-4'>📋</p>
            <h2 className='text-2xl font-bold text-gray-800 mb-2'>No orders yet</h2>
            <p className='text-gray-600 mb-6'>Start booking items to see your orders here.</p>
            <button
              onClick={() => navigate('/collection')}
              className='bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition'
            >
              Browse Items
            </button>
          </div>
        ) : (
          <div className='space-y-4'>
            {orderData.map((item, i) => (
              <div 
                key={i} 
                className='bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition overflow-hidden'
              >
                <div className='grid grid-cols-1 sm:grid-cols-5 gap-4 p-5 items-start'>
                  {/* Product Image */}
                  <div className='h-24 bg-gray-200 rounded-lg overflow-hidden sm:col-span-1'>
                    {item.image && item.image[0] ? (
                      <img
                        src={item.image[0]}
                        alt={item.name}
                        className='w-full h-full object-cover'
                      />
                    ) : (
                      <div className='w-full h-full bg-gray-300 flex items-center justify-center'>
                        <span className='text-2xl text-gray-500'>📦</span>
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className='sm:col-span-2'>
                    <h3 className='font-bold text-lg text-gray-800 mb-3 line-clamp-2'>
                      {item.name}
                    </h3>

                    <div className='space-y-1 text-sm'>
                      <div className='flex justify-between'>
                        <span className='text-gray-600'>Price:</span>
                        <span className='font-semibold text-gray-800'>₹{item.price}</span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-gray-600'>Quantity:</span>
                        <span className='font-semibold text-gray-800'>{item.quantity}</span>
                      </div>
                      {item.size && (
                        <div className='flex justify-between'>
                          <span className='text-gray-600'>Size:</span>
                          <span className='font-semibold text-gray-800'>{item.size}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Order Info */}
                  <div className='sm:col-span-1'>
                    <p className='text-xs text-gray-500 mb-1'>ORDER DATE</p>
                    <p className='font-semibold text-gray-800 text-sm'>
                      {new Date(item.date).toLocaleDateString()}
                    </p>

                    <p className='text-xs text-gray-500 mt-3 mb-1'>PAYMENT</p>
                    <p className='font-semibold text-gray-800 text-sm'>
                      {item.paymentMethod}
                    </p>
                  </div>

                  {/* Status & Action */}
                  <div className='sm:col-span-1'>
                    <div className='mb-4'>
                      <p className='text-xs text-gray-500 mb-2'>STATUS</p>
                      <div className='flex items-center gap-2'>
                        <span className={`h-3 w-3 rounded-full ${
                          item.status === 'completed' ? 'bg-green-500' :
                          item.status === 'cancelled' ? 'bg-red-500' :
                          item.status === 'shipped' ? 'bg-blue-500' :
                          'bg-yellow-500'
                        }`}></span>
                        <span className='font-semibold text-gray-800 text-sm capitalize'>
                          {item.status}
                        </span>
                      </div>
                    </div>

                    <button 
                      onClick={() => toast.info('Tracking info: Currently in transit')}
                      className='w-full bg-blue-100 hover:bg-blue-200 text-blue-600 px-4 py-2 rounded font-semibold text-sm transition mb-2'
                    >
                      Track Order
                    </button>

                    {item.status === 'completed' && (
                      <button
                        onClick={() => setRatingModal({ orderId: item._id, ratingType: 'lender' })}
                        className='w-full bg-yellow-100 hover:bg-yellow-200 text-yellow-600 px-4 py-2 rounded font-semibold text-sm transition'
                      >
                        ⭐ Rate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {ratingModal && (
          <RatingModal
            orderId={ratingModal.orderId}
            toUserId={ratingModal.toUserId}
            ratingType={ratingModal.ratingType}
            onClose={() => setRatingModal(null)}
            onSuccess={() => getAllOrdersData()}
          />
        )}
      </div>
    </main>
  );
};

export default Orders;

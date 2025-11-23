import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { backendUrl, token, cartItems, setCartItems, products } = useContext(ShopContext);
  const [method, setMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    if (!token) {
      toast.error("Please login to place order");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = products.find((product) => product._id === items);
            if (itemInfo) {
              const copy = JSON.parse(JSON.stringify(itemInfo));
              copy.size = item;
              copy.quantity = cartItems[items][item];
              orderItems.push(copy);
            }
          }
        }
      }
      
      let subtotal = 0;
      orderItems.forEach(item => {
        subtotal += (item.price || 0) * item.quantity;
      });
      const tax = subtotal * 0.1;
      const shipping = 5;
      
      let orderData = {
        items: orderItems,
        address: formData,
        subtotal,
        tax,
        shipping,
        amount: subtotal + tax + shipping,
      };

      if (method === "cod") {
        const res = await axios.post(backendUrl + "/api/order/place", orderData, { headers: { token } });
        if (res.data.success) {
          setCartItems({});
          toast.success("Order placed successfully!");
          navigate("/orders");
        } else {
          toast.error(res.data.message || "Failed to place order");
        }
      } else if (method === "stripe") {
        const res = await axios.post(backendUrl + "/api/order/stripe", orderData, { headers: { token } });
        if (res.data.success) {
          window.location.replace(res.data.session_url);
        } else {
          toast.error(res.data.message || "Payment failed");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Error placing order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='w-full min-h-screen bg-blue-50 py-12'>
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <button 
          onClick={() => navigate(-1)}
          className='text-blue-600 hover:text-blue-800 font-semibold mb-6 flex items-center gap-2'
        >
          ← Back
        </button>

        <h1 className='text-4xl font-bold text-gray-800 mb-12'>📦 Checkout</h1>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2'>
            <div className='bg-white rounded-lg border border-gray-200 shadow-md p-8 mb-8'>
              <h2 className='text-2xl font-bold text-gray-800 mb-6'>Delivery Address</h2>

              <div className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition' type='text' placeholder='First Name' />
                  <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition' type='text' placeholder='Last Name' />
                </div>

                <input required onChange={onChangeHandler} name='email' value={formData.email} className='w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition' type='email' placeholder='Email' />
                <input required onChange={onChangeHandler} name='street' value={formData.street} className='w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition' type='text' placeholder='Street Address' />

                <div className='grid grid-cols-2 gap-4'>
                  <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition' type='text' placeholder='City' />
                  <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition' type='text' placeholder='State' />
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition' type='text' placeholder='Zip Code' />
                  <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition' type='text' placeholder='Country' />
                </div>

                <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition' type='tel' placeholder='Phone Number' />
              </div>
            </div>

            <div className='bg-white rounded-lg border border-gray-200 shadow-md p-8'>
              <h2 className='text-2xl font-bold text-gray-800 mb-6'>Payment Method</h2>

              <div className='space-y-3'>
                <label onClick={() => setMethod('stripe')} className='flex items-start p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition'>
                  <input type='radio' name='payment' value='stripe' checked={method === 'stripe'} onChange={() => setMethod('stripe')} className='w-5 h-5 mt-0.5 text-blue-600' />
                  <div className='ml-4'>
                    <p className='font-semibold text-gray-800'>💳 Credit/Debit Card</p>
                    <p className='text-sm text-gray-600'>Secure payment via Stripe</p>
                  </div>
                </label>

                <label onClick={() => setMethod('cod')} className='flex items-start p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition'>
                  <input type='radio' name='payment' value='cod' checked={method === 'cod'} onChange={() => setMethod('cod')} className='w-5 h-5 mt-0.5 text-blue-600' />
                  <div className='ml-4'>
                    <p className='font-semibold text-gray-800'>💵 Cash on Delivery</p>
                    <p className='text-sm text-gray-600'>Pay when you receive the items</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div>
            <div className='bg-white rounded-lg border border-gray-200 shadow-md p-6 sticky top-20'>
              <h2 className='text-xl font-bold text-gray-800 mb-6'>Order Summary</h2>

              <div className='space-y-3 mb-6 pb-6 border-b border-gray-200'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Subtotal</span>
                  <span className='font-semibold text-gray-800'>₹ Subtotal</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Tax (10%)</span>
                  <span className='font-semibold text-gray-800'>₹ Tax</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Shipping</span>
                  <span className='font-semibold text-gray-800'>₹500</span>
                </div>
              </div>

              <div className='flex justify-between items-center mb-6'>
                <span className='text-lg font-bold text-gray-800'>Total</span>
                <span className='text-2xl font-bold text-blue-600'>₹ Total</span>
              </div>

              <button type='submit' disabled={loading} className='w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition text-lg'>
                {loading ? 'Processing...' : 'Place Order'}
              </button>

              <p className='text-xs text-gray-500 mt-4 text-center'>
                ✓ Your payment information is secure and encrypted
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

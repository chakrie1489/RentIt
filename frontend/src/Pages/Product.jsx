
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { getItem, createRequest } from "../api";
import { toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { currency, token } = useContext(ShopContext);
  const [item, setItem] = useState(null);
  const [image, setImage] = useState("");
  const [galleryIndex, setGalleryIndex] = useState(0);

  // request form
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [message, setMessage] = useState("");
  const [proposedPrice, setProposedPrice] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getItem(productId);
        if (res.success) {
          setItem(res.item);
          const imgs = res.item.images || [];
          setImage((imgs && imgs[0]) || "");
          setGalleryIndex(0);
        } else {
          toast.error(res.message || "Item not found");
          navigate('/');
        }
      } catch (err) {
        toast.error(err.message);
        navigate('/');
      }
    };
    fetch();
  }, [productId]);

  const [submitting, setSubmitting] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(null);

  const onRequest = async (e) => {
    e.preventDefault();
    setRequestSuccess(null);
    if (!token) {
      toast.error('Please login to request items');
      navigate('/login');
      return;
    }
    if (!start || !end) {
      setRequestSuccess({ ok: false, message: 'Please select start and end times' });
      return;
    }
    setSubmitting(true);
    try {
      const body = { start, end, message, proposedPrice: proposedPrice ? Number(proposedPrice) : undefined };
      const res = await createRequest(productId, body);
      if (res.success) {
        setRequestSuccess({ ok: true, message: 'Request created — check Requests page for status.' });
        // refresh owner/user lists indirectly by leaving navigation to user
      } else {
        setRequestSuccess({ ok: false, message: res.message || 'Failed to create request' });
      }
    } catch (err) {
      setRequestSuccess({ ok: false, message: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  if (!item) return <div className='opacity-0'></div>;

  return (
    <main className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* Image Gallery */}
          <div className='bg-white rounded-lg shadow-lg p-4'>
            {item.images && item.images.length > 0 ? (
              <div>
                <div className='mb-4'>
                  <img src={image} alt={item.title} className='w-full h-96 object-cover rounded-lg' />
                </div>
                <div className='grid grid-cols-4 gap-2'>
                  {item.images.map((img, idx) => (
                    <button key={idx} onClick={() => { setGalleryIndex(idx); setImage(img); }} className={`rounded-lg overflow-hidden border-2 transition ${galleryIndex === idx ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-200'}`}>
                      <img src={img} alt={`thumb-${idx}`} className='w-full h-20 object-cover' />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className='w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center'>
                <p className='text-gray-500'>No images available</p>
              </div>
            )}
          </div>

          {/* Details & Request Form */}
          <div className='space-y-6'>
            <div className='bg-white rounded-lg shadow-lg p-6'>
              <h1 className='text-4xl font-bold mb-2'>{item.title}</h1>
              <p className='text-3xl font-bold text-blue-600 mb-4'>
                ${item.price} / {item.priceUnit}
              </p>
              <p className='text-gray-600 mb-6 leading-relaxed'>{item.description}</p>

              {item.remarks && (
                <div className='bg-blue-50 border-l-4 border-blue-500 p-4 mb-4'>
                  <p className='text-sm text-gray-700'><b>Remarks:</b> {item.remarks}</p>
                </div>
              )}

              {item.owner && item.owner.name && (
                <div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200'>
                  <p className='text-sm font-semibold text-gray-700 mb-2'>Lender Information</p>
                  <p className='text-lg font-bold text-gray-900'>{item.owner.name}</p>
                  {item.owner.email && <p className='text-sm text-gray-600'>{item.owner.email}</p>}
                </div>
              )}
            </div>

            {/* Request Form */}
            <div className='bg-white rounded-lg shadow-lg p-6'>
              <h2 className='text-2xl font-bold mb-4'>Request This Item</h2>
              <form onSubmit={onRequest} className='space-y-4'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-semibold mb-2'>Start Date & Time *</label>
                    <input type='datetime-local' value={start} onChange={e => setStart(e.target.value)} required className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
                  </div>
                  <div>
                    <label className='block text-sm font-semibold mb-2'>End Date & Time *</label>
                    <input type='datetime-local' value={end} onChange={e => setEnd(e.target.value)} required className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-semibold mb-2'>Message (Optional)</label>
                  <textarea value={message} onChange={e => setMessage(e.target.value)} rows='3' className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Tell the lender why you need this item...' />
                </div>

                <div>
                  <label className='block text-sm font-semibold mb-2'>Proposed Price (Optional)</label>
                  <input type='number' step='0.01' value={proposedPrice} onChange={e => setProposedPrice(e.target.value)} className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Leave blank to use listed price' />
                </div>

                <div className='flex flex-col gap-3 pt-4'>
                  <button className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition' type='submit' disabled={!item.available || submitting}>
                    {submitting ? 'Sending Request...' : 'Send Request'}
                  </button>
                  {!item.available && <p className='text-red-600 text-center font-semibold'>Item is not available</p>}
                </div>

                {requestSuccess && (
                  <div className={`p-4 rounded-lg text-center font-semibold ${requestSuccess.ok ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300'}`}>
                    {requestSuccess.message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Product;

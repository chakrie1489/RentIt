import React, { useEffect, useState, useContext } from "react";
import { getMyRequests, getOwnerRequests, respondRequest } from "../api";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const Requests = () => {
  const { token } = useContext(ShopContext);
  const [myRequests, setMyRequests] = useState([]);
  const [ownerRequests, setOwnerRequests] = useState([]);

  const load = async () => {
    try {
      const a = await getMyRequests();
      if (a.success) setMyRequests(a.requests || []);
      const b = await getOwnerRequests();
      if (b.success) setOwnerRequests(b.requests || []);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(()=>{ if(token) load() }, [token]);

  const [responding, setResponding] = useState(null);
  const [message, setMessage] = useState(null);

  const onRespond = async (reqId, action) => {
    setResponding(reqId);
    setMessage(null);
    try {
      const r = await respondRequest(reqId, action);
      if (r.success) {
        setMessage({ ok: true, text: 'Updated' });
        await load();
      } else setMessage({ ok: false, text: r.message || 'Failed' });
    } catch (err) {
      setMessage({ ok: false, text: err.message });
    } finally {
      setResponding(null);
    }
  }

  if (!token) return <p className='mt-10 text-center'>Please login to see requests</p>;

  return (
    <div className='mt-10 max-w-3xl m-auto'>
      <h2 className='text-xl font-medium mb-4'>My Requests</h2>
      <div className='flex flex-col gap-3'>
        {myRequests.map(r => (
          <div key={r._id} className='border p-3'>
            <p>Item: {r.item.title}</p>
            <p>Status: {r.status}</p>
            <p>From: {new Date(r.start).toLocaleString()} To: {new Date(r.end).toLocaleString()}</p>
          </div>
        ))}
      </div>

      <h2 className='text-xl font-medium mt-8 mb-4'>Requests For My Items</h2>
      <div className='flex flex-col gap-3'>
        {ownerRequests.map(r => (
          <div key={r._id} className='border p-3 flex justify-between items-center'>
            <div>
              <p>Item: {r.item && r.item.title}</p>
              <p>By: {r.requester && r.requester.name}</p>
              <p>Status: {r.status}</p>
            </div>
            <div className='flex gap-2'>
              <button onClick={()=>onRespond(r._id,'accept')} className='px-3 py-1 bg-green-600 text-white'>Accept</button>
              <button onClick={()=>onRespond(r._id,'decline')} className='px-3 py-1 bg-red-600 text-white'>Decline</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Requests;

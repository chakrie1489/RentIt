import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { createItem, uploadItem, uploadOnly, updateItem } from "../api";
import client from "../api";
import { toast } from "react-toastify";
import { useLocation } from 'react-router-dom';

const NewListing = () => {
  const { navigate } = useContext(ShopContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [priceUnit, setPriceUnit] = useState("hourly");
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [files, setFiles] = useState([]);
  const [remarks, setRemarks] = useState('');
  const [existingImages, setExistingImages] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const location = useLocation();

  useEffect(()=>{
    const params = new URLSearchParams(location.search);
    const edit = params.get('edit');
    if (edit) {
      // load item
      (async ()=>{
        try {
          const res = await client.get(`/api/items/${edit}`);
          if (res.data && res.data.success) {
            const item = res.data.item;
            setEditingId(edit);
            setTitle(item.title||'');
            setDescription(item.description||'');
            setPrice(item.price||0);
            setPriceUnit(item.priceUnit||'hourly');
            if (item.location && item.location.coordinates) { setLng(item.location.coordinates[0]||0); setLat(item.location.coordinates[1]||0); }
            setRemarks(item.remarks||'');
            setExistingImages(item.images||[]);
          } else {
            toast.error('Failed to load item for edit');
          }
        } catch (err) { toast.error(err.message); }
      })()
    }
  }, [location.search]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // If editing, upload new files separately and call updateItem with merged images
      if (editingId) {
        let uploaded = [];
        if (files.length>0) {
          const f = new FormData(); files.forEach(x=>f.append('images', x));
          const up = await uploadOnly(f);
          if (up.success) uploaded = up.images || [];
        }
        const mergedImages = [...existingImages.filter(Boolean), ...uploaded];
        const body = { title, description, price: Number(price), priceUnit, images: mergedImages, coordinates: [Number(lng), Number(lat)], remarks };
        const res = await updateItem(editingId, body);
        if (res.success) { toast.success('Listing updated'); navigate('/'); }
        else toast.error(res.message || 'Update failed');
      } else {
        const form = new FormData();
        form.append('title', title);
        form.append('description', description);
        form.append('price', Number(price));
        form.append('priceUnit', priceUnit);
        form.append('coordinates', JSON.stringify([Number(lng), Number(lat)]));
        form.append('remarks', remarks);
        files.forEach(f => form.append('images', f));
        const res = await uploadItem(form);
        if (res.success) {
          toast.success("Listing created");
          navigate("/");
        } else {
          toast.error(res.message || "Failed");
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 py-10 px-4'>
      <form onSubmit={onSubmit} className='max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8'>
        <h1 className='text-3xl font-bold mb-8'>{editingId ? 'Edit Listing' : 'Create New Listing'}</h1>
        
        <div className='space-y-6'>
          <div>
            <label className='block text-sm font-semibold mb-2'>Title *</label>
            <input value={title} onChange={(e)=>setTitle(e.target.value)} required className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='e.g., Power Drill' />
          </div>

          <div>
            <label className='block text-sm font-semibold mb-2'>Description *</label>
            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} required rows='4' className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Describe the condition and features of your item...' />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-semibold mb-2'>Price *</label>
              <input value={price} onChange={(e)=>setPrice(e.target.value)} required type='number' step='0.01' className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='50' />
            </div>
            <div>
              <label className='block text-sm font-semibold mb-2'>Unit *</label>
              <select value={priceUnit} onChange={(e)=>setPriceUnit(e.target.value)} className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'>
                <option value='hourly'>Hourly</option>
                <option value='daily'>Daily</option>
              </select>
            </div>
          </div>

          <div>
            <label className='block text-sm font-semibold mb-2'>Location (Coordinates)</label>
            <div className='grid grid-cols-2 gap-4'>
              <input value={lng} onChange={(e)=>setLng(e.target.value)} type='number' step='0.0001' className='p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Longitude' />
              <input value={lat} onChange={(e)=>setLat(e.target.value)} type='number' step='0.0001' className='p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Latitude' />
            </div>
          </div>

          <div>
            <label className='block text-sm font-semibold mb-2'>Remarks (Optional)</label>
            <textarea value={remarks} onChange={(e)=>setRemarks(e.target.value)} rows='2' className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='e.g., Working condition, latest model, includes manual...' />
          </div>

          {existingImages.length > 0 && (
            <div>
              <label className='block text-sm font-semibold mb-3'>Existing Images (click to remove)</label>
              <div className='grid grid-cols-4 gap-3'>
                {existingImages.map((img, idx) => (
                  <div key={idx} className='relative group'>
                    <img src={img} alt={`existing-${idx}`} className='w-full h-24 object-cover rounded-lg' />
                    <button type='button' onClick={() => { setExistingImages(existingImages.filter((_, i) => i !== idx)); }} className='absolute inset-0 bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center transition'>
                      <span className='text-white font-bold text-2xl'>×</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className='block text-sm font-semibold mb-2'>Upload Images</label>
            <div className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition'>
              <input type='file' multiple accept='image/*' onChange={(e)=>setFiles([...files, ...e.target.files])} className='hidden' id='file-input' />
              <label htmlFor='file-input' className='block cursor-pointer'>
                <p className='text-gray-600'>Click to upload or drag and drop</p>
                <p className='text-gray-400 text-sm'>PNG, JPG, GIF up to 10MB</p>
              </label>
            </div>
            
            {files.length > 0 && (
              <div className='mt-4'>
                <p className='text-sm font-semibold mb-2'>New Images Preview</p>
                <div className='grid grid-cols-4 gap-3'>
                  {files.map((f, i) => (
                    <img key={i} src={URL.createObjectURL(f)} alt={`preview-${i}`} className='w-full h-24 object-cover rounded-lg' />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className='flex gap-4 pt-4'>
            <button type='submit' className='flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition'>
              {editingId ? 'Update Listing' : 'Create Listing'}
            </button>
            <button type='button' onClick={() => window.history.back()} className='flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-4 rounded-lg transition'>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewListing;

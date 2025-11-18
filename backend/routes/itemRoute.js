import express from 'express';
import itemModel from '../models/itemModel.js';
import auth from '../middleware/authMiddleware.js';
import upload from '../middleware/multer.js';
import path from 'path';

const __dirname = path.resolve();

const router = express.Router();

// list items, optionally near coords
router.get('/', async (req, res) => {
  try {
    const { lng, lat, radius = 5000 } = req.query;
    if (lng && lat) {
      const items = await itemModel.find({
        location: {
          $near: {
            $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
            $maxDistance: parseInt(radius)
          }
        },
        available: true
      }).populate('owner', '-password');
      return res.json({ success: true, items });
    }
    const items = await itemModel.find({ available: true }).populate('owner', '-password');
    res.json({ success: true, items });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// create item
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, coordinates, price, priceUnit, images } = req.body;
    const item = await itemModel.create({ title, description, owner: req.user._id, price, priceUnit, images, location: { type: 'Point', coordinates } });
    res.json({ success: true, item });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});


// create via multipart form (images)
router.post('/upload', auth, upload.array('images', 6), async (req, res) => {
  try {
    const { title, description, coordinates, price, priceUnit, remarks } = req.body;
    const files = req.files || [];
    const images = files.map(f => `/uploads/${f.filename}`);
    const coords = coordinates ? JSON.parse(coordinates) : undefined;
    const item = await itemModel.create({ title, description, owner: req.user._id, price, priceUnit, images, location: { type: 'Point', coordinates: coords }, remarks });
    res.json({ success: true, item });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// upload files only (returns URLs) - useful for edit flow where files are uploaded separately
router.post('/upload-only', auth, upload.array('images', 6), async (req, res) => {
  try {
    const files = req.files || [];
    const images = files.map(f => `/uploads/${f.filename}`);
    res.json({ success: true, images });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// get items owned by current user
router.get('/owner/mine', auth, async (req, res) => {
  try {
    const items = await itemModel.find({ owner: req.user._id }).populate('owner', '-password');
    res.json({ success: true, items });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// get item by id
router.get('/:id', async (req, res) => {
  try {
    const item = await itemModel.findById(req.params.id).populate('owner', '-password');
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.json({ success: true, item });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// update item (owner only)
router.put('/:id', auth, async (req, res) => {
  try {
    const item = await itemModel.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    if (String(item.owner) !== String(req.user._id)) return res.status(403).json({ success: false, message: 'Not owner' });
    const { title, description, coordinates, price, priceUnit, images, available } = req.body;
    if (title !== undefined) item.title = title;
    if (description !== undefined) item.description = description;
    if (coordinates !== undefined) item.location = { type: 'Point', coordinates };
    if (price !== undefined) item.price = price;
    if (priceUnit !== undefined) item.priceUnit = priceUnit;
    if (images !== undefined) item.images = images;
    if (available !== undefined) item.available = available;
    await item.save();
    res.json({ success: true, item });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// delete item (owner only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await itemModel.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    if (String(item.owner) !== String(req.user._id)) return res.status(403).json({ success: false, message: 'Not owner' });
    await item.remove();
    res.json({ success: true, message: 'Item deleted' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

export default router;

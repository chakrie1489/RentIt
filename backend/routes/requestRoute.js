import express from 'express';
import requestModel from '../models/requestModel.js';
import itemModel from '../models/itemModel.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

// create request for item
router.post('/:itemId', auth, async (req, res) => {
  try {
    const { start, end, message, proposedPrice } = req.body;
    const item = await itemModel.findById(req.params.itemId);
    if (!item || !item.available) return res.status(400).json({ success: false, message: 'Item not available' });
    const hours = start && end ? (new Date(end) - new Date(start)) / (1000*60*60) : undefined;
    const request = await requestModel.create({ item: item._id, requester: req.user._id, start, end, hours, proposedPrice, message });
    res.json({ success: true, request });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// owner accept/decline
router.patch('/:requestId', auth, async (req, res) => {
  try {
    const { action } = req.body; // accept or decline
    const request = await requestModel.findById(req.params.requestId).populate('item');
    if (!request) return res.status(404).json({ success: false, message: 'Request not found' });
    if (String(request.item.owner) !== String(req.user._id)) return res.status(403).json({ success: false, message: 'Not owner' });
    if (action === 'accept') {
      request.status = 'accepted';
      request.item.available = false;
      await request.item.save();
    } else if (action === 'decline') {
      request.status = 'declined';
    }
    await request.save();
    res.json({ success: true, request });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// list requests made by current user
router.get('/user/my', auth, async (req, res) => {
  try {
    const requests = await requestModel.find({ requester: req.user._id }).populate('item');
    res.json({ success: true, requests });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// list requests for items owned by current user
router.get('/owner/my', auth, async (req, res) => {
  try {
    // find items owned by user
    const items = await itemModel.find({ owner: req.user._id }).select('_id');
    const itemIds = items.map(i => i._id);
    const requests = await requestModel.find({ item: { $in: itemIds } }).populate('requester');
    res.json({ success: true, requests });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

export default router;

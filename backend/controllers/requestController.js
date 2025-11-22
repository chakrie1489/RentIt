import requestModel from '../models/requestModel.js';
import userModel from '../models/userModel.js';

// Create a new rental request (borrower posts what they need)
export const createRequest = async (req, res) => {
  try {
    const { title, description, category, desiredStart, desiredEnd, maxPrice, radiusKm, location, specialRequirements } = req.body;

    // Validate dates
    const startDate = new Date(desiredStart);
    const endDate = new Date(desiredEnd);
    if (startDate >= endDate) {
      return res.status(400).json({ success: false, message: 'End date must be after start date' });
    }

    // Validate price
    if (!maxPrice || maxPrice <= 0) {
      return res.status(400).json({ success: false, message: 'Max price must be greater than 0' });
    }

    // Create request
    const request = await requestModel.create({
      requester: req.user._id,
      title,
      description,
      category,
      desiredStart: startDate,
      desiredEnd: endDate,
      maxPrice,
      radiusKm: radiusKm || 25,
      location: location || {},
      specialRequirements,
      status: 'open',
    });

    // Populate requester
    const populatedRequest = await request.populate('requester', 'name email phone profile_photo_url');

    res.status(201).json({ success: true, request: populatedRequest, message: 'Request posted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all public requests (anyone can view)
export const getAllRequests = async (req, res) => {
  try {
    const { category, status, sortBy } = req.query;
    let query = { status: { $in: ['open', 'closed'] } }; // Don't show fulfilled in list
    
    if (category) {
      query.category = category;
    }
    
    if (status && ['open', 'closed', 'fulfilled'].includes(status)) {
      query.status = status;
    }

    let sortOption = { createdAt: -1 };
    if (sortBy === 'oldest') {
      sortOption = { createdAt: 1 };
    } else if (sortBy === 'expiring') {
      sortOption = { desiredStart: 1 }; // Ending soon first
    }

    const requests = await requestModel
      .find(query)
      .populate('requester', 'name email phone rating_average')
      .sort(sortOption)
      .limit(100)
      .lean();

    res.json({ 
      success: true, 
      requests, 
      total: requests.length 
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get a specific request
export const getRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const request = await requestModel
      .findById(requestId)
      .populate('requester', 'name email phone rating_average profile_photo_url')
      .populate('offers');

    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    res.json({ success: true, request });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get my requests (as borrower)
export const getMyRequests = async (req, res) => {
  try {
    const requests = await requestModel
      .find({ requester: req.user._id })
      .populate('requester', 'name email phone')
      .sort({ createdAt: -1 });

    res.json({ success: true, requests });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Close a request (mark as closed/fulfilled)
export const closeRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body; // 'closed' or 'fulfilled'

    const request = await requestModel.findById(requestId);
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    // Only requester can close their request
    if (String(request.requester) !== String(req.user._id)) {
      return res.status(403).json({ success: false, message: 'You can only close your own requests' });
    }

    if (!['closed', 'fulfilled'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    request.status = status;
    await request.save();

    const updatedRequest = await request.populate('requester', 'name email');
    res.json({ success: true, request: updatedRequest, message: `Request ${status} successfully` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete a request (only if open and by requester)
export const deleteRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const request = await requestModel.findById(requestId);

    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    if (String(request.requester) !== String(req.user._id)) {
      return res.status(403).json({ success: false, message: 'You can only delete your own requests' });
    }

    if (request.status !== 'open') {
      return res.status(400).json({ success: false, message: 'Can only delete open requests' });
    }

    await requestModel.findByIdAndDelete(requestId);
    res.json({ success: true, message: 'Request deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Legacy support: keeping old endpoints for backward compatibility (for item-specific requests)
export const respondToRequest = async (req, res) => {
  return res.status(410).json({ success: false, message: 'This endpoint is deprecated. Use booking offers instead.' });
};

export const getOwnerRequests = async (req, res) => {
  return res.status(410).json({ success: false, message: 'This endpoint is deprecated. Check your bookings instead.' });
};

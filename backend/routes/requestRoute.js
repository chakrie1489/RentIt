import express from 'express';
import auth from '../middleware/authMiddleware.js';
import {
  createRequest,
  getAllRequests,
  getRequest,
  getMyRequests,
  closeRequest,
  deleteRequest,
  respondToRequest,
  getOwnerRequests,
} from '../controllers/requestController.js';

const router = express.Router();

// PUBLIC: Get all requests
router.get('/', getAllRequests);

// Create a new request (borrower posts what they need)
router.post('/', auth, createRequest);

// Get specific request details (public)
router.get('/:requestId', getRequest);

// Get my requests (as borrower/requester)
router.get('/user/my', auth, getMyRequests);

// Close/fulfill a request (by requester)
router.patch('/:requestId/close', auth, closeRequest);

// Delete a request (by requester, only if open)
router.delete('/:requestId', auth, deleteRequest);

// Legacy endpoints (deprecated)
router.patch('/:requestId', auth, respondToRequest);
router.get('/owner/my', auth, getOwnerRequests);

export default router;

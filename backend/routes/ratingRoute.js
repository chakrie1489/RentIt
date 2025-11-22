import express from 'express';
import { 
  createRating, 
  getUserRatings, 
  getRating, 
  getUserRatingSummary,
  getUserRatingsBench
} from '../controllers/ratingController.js';
import authUser from '../middleware/Auth.js';

const ratingRouter = express.Router();

// Create or update a rating (requires auth)
ratingRouter.post('/create', authUser, createRating);

// Get ratings for a user (public)
ratingRouter.get('/user/:userId', getUserRatings);

// Get rating between two users for a specific order (public)
ratingRouter.get('/check', getRating);

// Get user rating summary (public)
ratingRouter.get('/summary/:userId', getUserRatingSummary);

// Get all ratings given by a user (public)
ratingRouter.get('/bench/:userId', getUserRatingsBench);

export default ratingRouter;

import Rating from '../models/ratingModel.js';
import User from '../models/userModel.js';

// Add or update a rating
export const createRating = async (req, res) => {
  try {
    const { toUserId, orderId, rating, comment, ratingType } = req.body;
    const fromUserId = req.body.userId;

    // Validate input
    if (!toUserId || !orderId || !rating || !ratingType) {
      return res.json({ success: false, message: 'Missing required fields' });
    }

    if (rating < 1 || rating > 5) {
      return res.json({ success: false, message: 'Rating must be between 1 and 5' });
    }

    if (!['lender', 'borrower'].includes(ratingType)) {
      return res.json({ success: false, message: 'Invalid rating type' });
    }

    // Check if user already rated this order
    const existingRating = await Rating.findOne({
      fromUserId,
      toUserId,
      orderId,
    });

    if (existingRating) {
      existingRating.rating = rating;
      existingRating.comment = comment || '';
      existingRating.ratingType = ratingType;
      await existingRating.save();
    } else {
      const newRating = new Rating({
        fromUserId,
        toUserId,
        orderId,
        rating,
        comment: comment || '',
        ratingType,
      });

      await newRating.save();
    }

    // Update user's average rating
    const allRatings = await Rating.find({ toUserId });
    const totalRating = allRatings.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = allRatings.length > 0 ? (totalRating / allRatings.length).toFixed(2) : 0;

    await User.findByIdAndUpdate(toUserId, {
      averageRating: parseFloat(averageRating),
      totalRatings: allRatings.length,
    });

    return res.json({ success: true, message: 'Rating submitted successfully' });
  } catch (error) {
    console.log('Error creating rating:', error);
    return res.json({ success: false, message: error.message });
  }
};

// Get ratings for a user
export const getUserRatings = async (req, res) => {
  try {
    const { userId } = req.params;

    const ratings = await Rating.find({ toUserId: userId })
      .populate('fromUserId', 'name profileImage')
      .populate('orderId', '_id')
      .sort({ createdAt: -1 });

    return res.json({ success: true, ratings });
  } catch (error) {
    console.log('Error fetching ratings:', error);
    return res.json({ success: false, message: error.message });
  }
};

// Get rating between two users for a specific order
export const getRating = async (req, res) => {
  try {
    const { fromUserId, toUserId, orderId } = req.query;

    const rating = await Rating.findOne({ fromUserId, toUserId, orderId });

    if (!rating) {
      return res.json({ success: false, message: 'Rating not found' });
    }

    return res.json({ success: true, rating });
  } catch (error) {
    console.log('Error fetching rating:', error);
    return res.json({ success: false, message: error.message });
  }
};

// Get user rating summary (average and total)
export const getUserRatingSummary = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select('averageRating totalRatings name email profileImage bio');

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    return res.json({ success: true, user });
  } catch (error) {
    console.log('Error fetching rating summary:', error);
    return res.json({ success: false, message: error.message });
  }
};

// Get all ratings given by a user
export const getUserRatingsBench = async (req, res) => {
  try {
    const { userId } = req.params;

    const ratings = await Rating.find({ fromUserId: userId })
      .populate('toUserId', 'name profileImage')
      .populate('orderId', '_id')
      .sort({ createdAt: -1 });

    return res.json({ success: true, ratings });
  } catch (error) {
    console.log('Error fetching ratings bench:', error);
    return res.json({ success: false, message: error.message });
  }
};

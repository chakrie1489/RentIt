import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  // Requester's info
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  
  // What they want
  title: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: true, maxlength: 1000 },
  category: { type: String }, // e.g., 'electronics', 'furniture', 'tools'
  
  // When they need it
  desiredStart: { type: Date, required: true },
  desiredEnd: { type: Date, required: true },
  
  // Budget & location
  maxPrice: { type: Number, required: true }, // Max they'll pay per day/hour
  radiusKm: { type: Number, default: 25 }, // Pickup radius
  location: {
    lat: { type: Number },
    lon: { type: Number },
    address: { type: String }
  },
  
  // Status
  status: { type: String, enum: ['open', 'closed', 'fulfilled'], default: 'open' },
  
  // Offers received from lenders (references to bookings or offers)
  offers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'booking' }],
  
  // Special requirements
  specialRequirements: { type: String, maxlength: 500 },
  
  // Metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const requestModel = mongoose.models.request || mongoose.model('request', requestSchema);
export default requestModel;

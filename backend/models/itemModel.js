import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  price: { type: Number, required: true },
  priceUnit: { type: String, enum: ['hourly', 'daily'], default: 'hourly' },
  images: { type: [String], default: [] },
  remarks: { type: String },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }
  },
  available: { type: Boolean, default: true }
}, { timestamps: true });

itemSchema.index({ location: '2dsphere' });

const itemModel = mongoose.models.item || mongoose.model('item', itemSchema);
export default itemModel;

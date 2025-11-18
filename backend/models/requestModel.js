import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'item', required: true },
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  start: { type: Date },
  end: { type: Date },
  hours: { type: Number },
  proposedPrice: { type: Number },
  status: { type: String, enum: ['pending','accepted','declined','cancelled'], default: 'pending' },
  message: { type: String }
}, { timestamps: true });

const requestModel = mongoose.models.request || mongoose.model('request', requestSchema);
export default requestModel;

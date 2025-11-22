import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartData: {
      type: Object,
      default: {},
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    profileImage: {
      type: String,
    },
  },
  { minimize: false }
);

const userModel = mongoose.models.user || mongoose.model("user",userSchema)

export default userModel

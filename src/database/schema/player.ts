import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  playerId: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  points: {
    type: Number,
    default: 0,
  },
});

export const UserModel =
  mongoose.models.user || mongoose.model("user", UserSchema);

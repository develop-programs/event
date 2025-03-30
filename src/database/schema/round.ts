import mongoose from "mongoose";

const RoundSchema = new mongoose.Schema({
  type: {
    type: String,
    values: ["options", "error", "dsa"],
    required: true,
  },
  round: {
    type: Number,
    required: true,
  },
  point: {
    type: Number,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
});

export const RoundModel =
  mongoose.models.round || mongoose.model("round", RoundSchema);

import mongoose from "mongoose";

const MultiSelectSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  point: {
    type: Number,
    required: true,
  },
});

export const MultiSelectModel =
  mongoose.models.multiselect ||
  mongoose.model("multiselect", MultiSelectSchema);

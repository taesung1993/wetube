import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  videoFile: {
    type: String,
    required: "File is required",
  },
  title: {
    type: String,
    required: "Title is required",
  },
  description: {
    type: String,
    required: "Description is required",
  },
  // creator: {
  //   type: mongoose.Schema.Types.ObjectId,
  // },
  view: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],
});

const model = mongoose.model("Videos", videoSchema);

export default model;
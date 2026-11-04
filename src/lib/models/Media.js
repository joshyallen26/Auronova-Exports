import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
      trim: true,
    },
    originalName: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    fileSize: {
      type: Number,
      default: 0,
    },
    mimeType: {
      type: String,
      default: "image/jpeg",
    },
    altText: {
      type: String,
      default: "",
    },
    width: {
      type: Number,
      default: null,
    },
    height: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Media || mongoose.model("Media", MediaSchema);

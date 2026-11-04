import mongoose from "mongoose";

const PortSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    classification: {
      type: String,
      required: true,
      enum: ["Major Port", "Notified Non-Major Port"],
      default: "Notified Non-Major Port",
    },
    status: {
      type: String,
      required: true,
      default: "Operational",
    },
    type: {
      type: String,
      default: "",
    },
    district: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    spiceExportRole: {
      type: String,
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Port || mongoose.model("Port", PortSchema);

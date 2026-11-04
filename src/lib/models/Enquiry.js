import mongoose from "mongoose";

const EnquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    company: {
      type: String,
      default: "",
      trim: true,
    },
    country: {
      type: String,
      default: "",
      trim: true,
    },
    phone: {
      type: String,
      default: "",
      trim: true,
    },
    product: {
      type: String,
      default: "General Enquiry",
      trim: true,
    },
    volume: {
      type: String,
      default: "",
      trim: true,
    },
    incoterm: {
      type: String,
      default: "FOB Cochin",
      trim: true,
    },
    message: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["new", "contacted", "in_progress", "closed"],
      default: "new",
    },
    notes: {
      type: String,
      default: "",
    },
    ip: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Enquiry || mongoose.model("Enquiry", EnquirySchema);

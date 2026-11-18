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
      index: true,
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
    products: {
      type: [String],
      default: [],
    },
    volume: {
      type: String,
      default: "",
      trim: true,
    },
    unit: {
      type: String,
      default: "MT",
      trim: true,
    },
    incoterm: {
      type: String,
      default: "FOB Cochin",
      trim: true,
    },
    fileAttachmentUrl: {
      type: String,
      default: "",
      trim: true,
    },
    fileAttachmentName: {
      type: String,
      default: "",
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
      index: true,
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

EnquirySchema.index({ createdAt: -1 });
EnquirySchema.index({ status: 1, createdAt: -1 });

export default mongoose.models.Enquiry || mongoose.model("Enquiry", EnquirySchema);

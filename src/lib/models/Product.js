import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    botanicalName: {
      type: String,
      default: "",
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      default: "Whole Spices",
      trim: true,
    },
    origin: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    characteristics: {
      type: String,
      default: "",
    },
    applications: {
      type: String,
      default: "",
    },
    packaging: {
      type: String,
      default: "",
    },
    featured: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ["published", "draft"],
      default: "published",
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);

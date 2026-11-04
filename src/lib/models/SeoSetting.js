import mongoose from "mongoose";

const SeoSettingSchema = new mongoose.Schema(
  {
    pageKey: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    pageName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    keywords: {
      type: String,
      default: "",
    },
    canonical: {
      type: String,
      default: "",
    },
    ogTitle: {
      type: String,
      default: "",
    },
    ogDescription: {
      type: String,
      default: "",
    },
    ogImage: {
      type: String,
      default: "/images/bg-home-hero.jpg",
    },
  },
  { timestamps: true }
);

export default mongoose.models.SeoSetting || mongoose.model("SeoSetting", SeoSettingSchema);

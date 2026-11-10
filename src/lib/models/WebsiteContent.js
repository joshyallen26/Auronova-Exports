import mongoose from "mongoose";

const WebsiteContentSchema = new mongoose.Schema(
  {
    sectionKey: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    page: {
      type: String,
      required: true,
      default: "home",
    },
    title: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.WebsiteContent || mongoose.model("WebsiteContent", WebsiteContentSchema);

import mongoose from "mongoose";

const AdminUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "Auronova Administrator",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "superadmin",
      enum: ["superadmin", "editor"],
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.models.AdminUser || mongoose.model("AdminUser", AdminUserSchema);

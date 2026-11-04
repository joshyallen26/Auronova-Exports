import mongoose from "mongoose";

const IntegrationSettingSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: "general_settings",
    },
    companyName: {
      type: String,
      default: "Auronova Exports Pvt. Ltd.",
    },
    email: {
      type: String,
      default: "exports@auronovaexports.com",
    },
    phone: {
      type: String,
      default: "+91 (484) 290-0000",
    },
    whatsappNumber: {
      type: String,
      default: "+91 94000 00000",
    },
    whatsappPrefilledMessage: {
      type: String,
      default: "Hello Auronova Exports, I am interested in sourcing Indian spices.",
    },
    officeAddress: {
      type: String,
      default: "Spice Trade Centre, Cochin Port Zone, Kochi, Kerala 682 001, India",
    },
    googleMapsUrl: {
      type: String,
      default: "https://maps.google.com/?q=Cochin+Port+Kochi+Kerala",
    },
    googleMapsEmbedUrl: {
      type: String,
      default: "",
    },
    linkedinUrl: {
      type: String,
      default: "https://linkedin.com",
    },
    twitterUrl: {
      type: String,
      default: "",
    },
    instagramUrl: {
      type: String,
      default: "",
    },
    portOfLading: {
      type: String,
      default: "Cochin Seaport (ICTT / INCOK) & CIAL Air Cargo",
    },
    registrationNotice: {
      type: String,
      default: "Government Registered Spice Exporter · Cochin Port, Kerala",
    },
  },
  { timestamps: true }
);

export default mongoose.models.IntegrationSetting || mongoose.model("IntegrationSetting", IntegrationSettingSchema);

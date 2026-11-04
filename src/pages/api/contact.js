import { saveEnquiry } from "@/lib/dataService";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, company, country, quantity, volume, incoterm, message, product, spice, phone } = req.body || {};

  // Basic validation: name and valid email are mandatory
  if (!name || !email) {
    return res.status(400).json({ success: false, message: "Name and email are required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: "Invalid email address format." });
  }

  // Get client IP
  const forwarded = req.headers["x-forwarded-for"];
  const ip = typeof forwarded === "string" ? forwarded.split(/, /)[0] : req.socket?.remoteAddress || "";

  try {
    const saved = await saveEnquiry({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: (company || "").trim(),
      country: (country || "").trim(),
      phone: (phone || "").trim(),
      product: spice || product || "General Enquiry",
      volume: volume || quantity || "",
      incoterm: incoterm || "FOB Cochin",
      message: message || "",
      status: "new",
      ip,
    });

    return res.status(200).json({
      success: true,
      message: "Commercial export enquiry received. Our trade desk will respond within 24 hours.",
      enquiryId: saved._id,
    });
  } catch (e) {
    console.error("Error saving export enquiry:", e);
    return res.status(500).json({
      success: false,
      message: "An error occurred while saving your inquiry. Please email exports@auronovaexports.com directly.",
    });
  }
}

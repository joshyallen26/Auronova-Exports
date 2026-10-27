export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, company, country, quantity, volume, incoterm, message, product, spice } = req.body;

  // Basic validation: name and valid email are mandatory
  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email address." });
  }

  console.log("=== New Commercial Spice RFQ received at Auronova Exports ===");
  console.log({
    name,
    email,
    company: company || "N/A",
    country: country || "N/A",
    spice: spice || product || "General Enquiry",
    volume: volume || quantity || "N/A",
    incoterm: incoterm || "N/A",
    message: message || "No extra note provided",
    timestamp: new Date().toISOString(),
  });
  console.log("==============================================================");

  return res.status(200).json({
    success: true,
    message: "Commercial export enquiry received. Our trade desk will respond within 24 hours.",
  });
}

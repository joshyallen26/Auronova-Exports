import { requireAdminAuth } from "@/lib/auth";
import { getPorts, savePort } from "@/lib/dataService";

async function handler(req, res) {
  if (req.method === "GET") {
    const list = await getPorts(false);
    return res.status(200).json({ success: true, ports: list });
  }

  if (req.method === "POST") {
    const { name, classification, status, district, details, spiceExportRole } = req.body || {};
    if (!name || !district || !details) {
      return res.status(400).json({
        success: false,
        message: "Port name, district, and details are required.",
      });
    }

    try {
      const saved = await savePort(req.body);
      return res.status(201).json({
        success: true,
        message: "Port created successfully.",
        port: saved,
      });
    } catch (e) {
      return res.status(500).json({ success: false, message: e.message });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}

export default requireAdminAuth(handler);

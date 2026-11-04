import { requireAdminAuth } from "@/lib/auth";
import { getSeoSettings, saveSeoSetting } from "@/lib/dataService";

async function handler(req, res) {
  if (req.method === "GET") {
    const list = await getSeoSettings();
    return res.status(200).json({ success: true, seo: list });
  }

  if (req.method === "PUT" || req.method === "POST") {
    const { pageKey, ...data } = req.body || {};
    if (!pageKey) {
      return res.status(400).json({ success: false, message: "pageKey is required." });
    }
    const saved = await saveSeoSetting(pageKey, data);
    return res.status(200).json({ success: true, message: "SEO settings updated successfully.", data: saved });
  }

  return res.status(405).json({ message: "Method not allowed" });
}

export default requireAdminAuth(handler);

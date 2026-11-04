import { requireAdminAuth } from "@/lib/auth";
import { getIntegrationSettings, saveIntegrationSettings } from "@/lib/dataService";

async function handler(req, res) {
  if (req.method === "GET") {
    const data = await getIntegrationSettings();
    return res.status(200).json({ success: true, integrations: data });
  }

  if (req.method === "PUT" || req.method === "POST") {
    const saved = await saveIntegrationSettings(req.body || {});
    return res.status(200).json({
      success: true,
      message: "Integrations and general settings saved successfully.",
      integrations: saved,
    });
  }

  return res.status(405).json({ message: "Method not allowed" });
}

export default requireAdminAuth(handler);

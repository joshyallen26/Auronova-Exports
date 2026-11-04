import { requireAdminAuth } from "@/lib/auth";
import { getDashboardStats } from "@/lib/dataService";

async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const stats = await getDashboardStats();
    return res.status(200).json({ success: true, stats });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
}

export default requireAdminAuth(handler);

import { requireAdminAuth } from "@/lib/auth";
import { savePort, deletePort, getPorts } from "@/lib/dataService";

async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    const list = await getPorts(false);
    const port = list.find((p) => p._id === id || p.slug === id || p.id === id);
    if (!port) {
      return res.status(404).json({ success: false, message: "Port not found" });
    }
    return res.status(200).json({ success: true, port });
  }

  if (req.method === "PUT") {
    try {
      const saved = await savePort({ ...req.body, _id: id });
      return res.status(200).json({ success: true, message: "Port updated successfully", port: saved });
    } catch (e) {
      return res.status(500).json({ success: false, message: e.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      await deletePort(id);
      return res.status(200).json({ success: true, message: "Port removed successfully" });
    } catch (e) {
      return res.status(500).json({ success: false, message: e.message });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}

export default requireAdminAuth(handler);

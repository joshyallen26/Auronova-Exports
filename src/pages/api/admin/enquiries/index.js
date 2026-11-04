import { requireAdminAuth } from "@/lib/auth";
import { getEnquiries, updateEnquiry, deleteEnquiry } from "@/lib/dataService";

async function handler(req, res) {
  if (req.method === "GET") {
    const { status, search } = req.query;
    const list = await getEnquiries({ status, search });
    return res.status(200).json({ success: true, enquiries: list });
  }

  if (req.method === "PUT") {
    const { id, status, notes } = req.body || {};
    if (!id) {
      return res.status(400).json({ success: false, message: "Enquiry id is required." });
    }
    await updateEnquiry(id, { status, notes });
    return res.status(200).json({ success: true, message: "Enquiry status updated." });
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ success: false, message: "Enquiry id is required." });
    }
    await deleteEnquiry(id);
    return res.status(200).json({ success: true, message: "Enquiry deleted." });
  }

  return res.status(405).json({ message: "Method not allowed" });
}

export default requireAdminAuth(handler);

import { requireAdminAuth } from "@/lib/auth";
import { getAllContent, getContentBySection, saveContent } from "@/lib/dataService";

async function handler(req, res) {
  if (req.method === "GET") {
    const { section } = req.query;
    if (section) {
      const data = await getContentBySection(section);
      return res.status(200).json({ success: true, data });
    }
    const all = await getAllContent();
    return res.status(200).json({ success: true, content: all });
  }

  if (req.method === "PUT" || req.method === "POST") {
    const { sectionKey, data, title, subtitle, page, isPublished } = req.body || {};
    if (!sectionKey) {
      return res.status(400).json({ success: false, message: "sectionKey is required." });
    }

    const saved = await saveContent(sectionKey, {
      title,
      subtitle,
      page: page || "home",
      content: data || {},
      isPublished: isPublished !== false,
    });

    return res.status(200).json({ success: true, message: "Section content updated successfully.", data: saved });
  }

  return res.status(405).json({ message: "Method not allowed" });
}

export default requireAdminAuth(handler);

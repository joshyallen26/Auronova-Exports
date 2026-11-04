import fs from "fs";
import path from "path";
import { requireAdminAuth } from "@/lib/auth";
import { getMediaFiles, saveMediaRecord, deleteMediaRecord } from "@/lib/dataService";

// Increase body parser limit for media upload
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "15mb",
    },
  },
};

async function handler(req, res) {
  if (req.method === "GET") {
    const list = await getMediaFiles();
    return res.status(200).json({ success: true, media: list });
  }

  if (req.method === "POST") {
    const { name, base64Data, altText, mimeType } = req.body || {};

    if (!base64Data) {
      return res.status(400).json({ success: false, message: "No image data provided." });
    }

    try {
      // Clean base64 string
      const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      const dataBuffer = matches ? Buffer.from(matches[2], "base64") : Buffer.from(base64Data, "base64");
      const detectedMime = (matches ? matches[1] : mimeType) || "image/jpeg";

      const ext =
        detectedMime.includes("png")
          ? ".png"
          : detectedMime.includes("webp")
          ? ".webp"
          : detectedMime.includes("svg")
          ? ".svg"
          : ".jpg";

      const cleanBaseName = (name || "spice-asset")
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, "-")
        .replace(new RegExp(`${ext}$`), "");

      const fileName = `${cleanBaseName}-${Date.now()}${ext}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, dataBuffer);

      const fileUrl = `/uploads/${fileName}`;

      const record = await saveMediaRecord({
        fileName,
        originalName: name || fileName,
        url: fileUrl,
        fileSize: dataBuffer.length,
        mimeType: detectedMime,
        altText: altText || cleanBaseName,
      });

      return res.status(201).json({
        success: true,
        message: "Media uploaded successfully.",
        media: record,
      });
    } catch (e) {
      console.error("Media upload error:", e);
      return res.status(500).json({ success: false, message: e.message });
    }
  }

  if (req.method === "DELETE") {
    const { id, fileName } = req.query;
    if (!id) {
      return res.status(400).json({ success: false, message: "Media id is required." });
    }

    try {
      if (fileName) {
        const filePath = path.join(process.cwd(), "public", "uploads", fileName);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      await deleteMediaRecord(id);
      return res.status(200).json({ success: true, message: "Media deleted successfully." });
    } catch (e) {
      return res.status(500).json({ success: false, message: e.message });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}

export default requireAdminAuth(handler);

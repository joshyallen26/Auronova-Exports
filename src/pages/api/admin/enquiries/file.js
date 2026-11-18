import fs from "fs";
import path from "path";
import { requireAdminAuth } from "@/lib/auth";

async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { filename, originalName } = req.query;

  if (!filename || typeof filename !== "string") {
    return res.status(400).json({ success: false, message: "Filename parameter is required." });
  }

  // Prevent path traversal attacks
  const safeFilename = path.basename(filename);

  // Check secure non-public storage first
  const securePath = path.join(process.cwd(), "storage", "rfq_uploads", safeFilename);
  // Check legacy public folder for backward compatibility
  const legacyPath = path.join(process.cwd(), "public", "uploads", safeFilename);

  let targetPath = null;
  if (fs.existsSync(securePath)) {
    targetPath = securePath;
  } else if (fs.existsSync(legacyPath)) {
    targetPath = legacyPath;
  }

  if (!targetPath) {
    return res.status(404).json({ success: false, message: "Requested specification document was not found." });
  }

  const ext = path.extname(safeFilename).toLowerCase();
  const mimeTypes = {
    ".pdf": "application/pdf",
    ".doc": "application/msword",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ".xls": "application/vnd.ms-excel",
    ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ".csv": "text/csv",
    ".txt": "text/plain",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
  };

  const contentType = mimeTypes[ext] || "application/octet-stream";
  const downloadName = originalName ? path.basename(originalName) : safeFilename;

  try {
    const stat = fs.statSync(targetPath);
    res.writeHead(200, {
      "Content-Type": contentType,
      "Content-Length": stat.size,
      "Content-Disposition": `attachment; filename="${encodeURIComponent(downloadName)}"`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-cache, no-store, must-revalidate",
    });

    const readStream = fs.createReadStream(targetPath);
    readStream.pipe(res);
  } catch (err) {
    console.error("Error streaming file:", err);
    return res.status(500).json({ success: false, message: "Failed to read file." });
  }
}

export default requireAdminAuth(handler);


import formidable from "formidable";
import fs from "fs";
import path from "path";
import crypto from "crypto";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ALLOWED_EXTENSIONS = new Set([
  ".pdf",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".csv",
  ".txt",
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
]);

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain",
  "text/csv",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  // Store uploaded buyer specifications outside public directory for data protection
  const storageDir = path.join(process.cwd(), "storage", "rfq_uploads");
  if (!fs.existsSync(storageDir)) {
    try {
      fs.mkdirSync(storageDir, { recursive: true });
    } catch (e) {
      console.warn("Storage directory creation notice:", e.message);
    }
  }

  const form = formidable({
    uploadDir: storageDir,
    keepExtensions: false,
    maxFileSize: MAX_FILE_SIZE,
    multiples: false,
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error("Upload parse error:", err.message);
      return res.status(400).json({
        success: false,
        message: err.message || "Failed to process uploaded specification file.",
      });
    }

    const fileItem = files.file ? (Array.isArray(files.file) ? files.file[0] : files.file) : null;
    if (!fileItem) {
      return res.status(400).json({ success: false, message: "No file was received." });
    }

    const originalFilename = fileItem.originalFilename || "specification.pdf";
    const ext = path.extname(originalFilename).toLowerCase();

    // Whitelist extension check
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      try {
        fs.unlinkSync(fileItem.filepath);
      } catch (e) {}
      return res.status(400).json({
        success: false,
        message: "Invalid file extension. Permitted formats: PDF, DOC, DOCX, XLS, XLSX, CSV, TXT, JPG, PNG.",
      });
    }

    // Whitelist MIME type check
    if (fileItem.mimetype && !ALLOWED_MIME_TYPES.has(fileItem.mimetype)) {
      try {
        fs.unlinkSync(fileItem.filepath);
      } catch (e) {}
      return res.status(400).json({
        success: false,
        message: "Invalid file MIME type. Permitted formats: PDF, Word, Excel, Plain Text, or Image files.",
      });
    }

    // Generate safe, collision-proof filename
    const randomSuffix = crypto.randomBytes(8).toString("hex");
    const sanitizedBase = path
      .basename(originalFilename, ext)
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-")
      .slice(0, 40);

    const safeFileName = `rfq_${Date.now()}_${randomSuffix}_${sanitizedBase}${ext}`;
    const destinationPath = path.join(storageDir, safeFileName);

    try {
      fs.renameSync(fileItem.filepath, destinationPath);
    } catch (renameErr) {
      console.error("Error saving uploaded file:", renameErr);
      return res.status(500).json({ success: false, message: "Failed to persist uploaded document." });
    }

    // Return protected URL accessible only to authenticated admins
    const protectedDownloadUrl = `/api/admin/enquiries/file?filename=${encodeURIComponent(safeFileName)}&originalName=${encodeURIComponent(originalFilename)}`;

    return res.status(200).json({
      success: true,
      fileUrl: protectedDownloadUrl,
      fileName: safeFileName,
      originalName: originalFilename,
      size: fileItem.size,
      mimeType: fileItem.mimetype,
    });
  });
}

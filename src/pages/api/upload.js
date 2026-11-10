import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ALLOWED_MIME_TYPES = [
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
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadDir)) {
    try {
      fs.mkdirSync(uploadDir, { recursive: true });
    } catch (e) {}
  }

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFileSize: MAX_FILE_SIZE,
    multiples: false,
    filename: (name, ext, part) => {
      const sanitized = (part.originalFilename || "spec")
        .toLowerCase()
        .replace(/[^a-z0-9.]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      return `rfq_${Date.now()}_${sanitized}`;
    },
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error("Upload parse error:", err);
      return res.status(400).json({
        success: false,
        message: err.message || "Failed to process uploaded file.",
      });
    }

    const fileItem = files.file ? (Array.isArray(files.file) ? files.file[0] : files.file) : null;
    if (!fileItem) {
      return res.status(400).json({ success: false, message: "No file was uploaded." });
    }

    if (fileItem.mimetype && !ALLOWED_MIME_TYPES.includes(fileItem.mimetype)) {
      try {
        fs.unlinkSync(fileItem.filepath);
      } catch (e) {}
      return res.status(400).json({
        success: false,
        message: "Invalid file type. Allowed formats: PDF, DOC, DOCX, XLS, XLSX, CSV, JPG, PNG.",
      });
    }

    const savedFileName = path.basename(fileItem.filepath);
    const fileUrl = `/uploads/${savedFileName}`;

    return res.status(200).json({
      success: true,
      fileUrl,
      originalName: fileItem.originalFilename || savedFileName,
      size: fileItem.size,
      mimeType: fileItem.mimetype,
    });
  });
}


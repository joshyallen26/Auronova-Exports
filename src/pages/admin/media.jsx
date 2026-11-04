import { useState, useEffect, useRef } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminHeader from "@/components/admin/AdminHeader";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import NotificationToast from "@/components/admin/NotificationToast";
import {
  UploadCloud,
  Image as ImageIcon,
  Copy,
  Trash2,
  Check,
  Search,
  ExternalLink,
  Plus,
  X,
} from "lucide-react";

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);
  const fileInputRef = useRef(null);

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [customName, setCustomName] = useState("");
  const [altText, setAltText] = useState("");

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/media");
      if (res.ok) {
        const data = await res.json();
        setMediaList(data.media || []);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setToast({ type: "error", message: "Only image files (JPEG, PNG, WebP, SVG) are supported." });
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setToast({ type: "error", message: "File exceeds maximum size limit of 8MB." });
      return;
    }

    setSelectedFile(file);
    setCustomName(file.name.replace(/\.[^/.]+$/, ""));
    setAltText(file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "));

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
      setUploadModalOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!previewUrl) return;

    setUploading(true);
    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: customName || selectedFile?.name,
          base64Data: previewUrl,
          altText,
          mimeType: selectedFile?.type,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to upload image.");
      }

      setToast({ type: "success", message: "Image uploaded and catalogued successfully." });
      setUploadModalOpen(false);
      setSelectedFile(null);
      setPreviewUrl("");
      await fetchMedia();
    } catch (err) {
      setToast({ type: "error", message: err.message });
    } finally {
      setUploading(false);
    }
  };

  const handleCopyUrl = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    setToast({ type: "success", message: "Image URL copied to clipboard!" });
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/admin/media?id=${deleteTarget._id}&fileName=${deleteTarget.fileName}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMediaList((prev) => prev.filter((m) => m._id !== deleteTarget._id));
        setToast({ type: "success", message: "Media asset deleted." });
      }
    } finally {
      setDeleteTarget(null);
    }
  };

  const filteredMedia = mediaList.filter((m) => {
    const q = search.toLowerCase();
    return (
      m.fileName?.toLowerCase().includes(q) ||
      m.originalName?.toLowerCase().includes(q) ||
      m.altText?.toLowerCase().includes(q)
    );
  });

  return (
    <AdminLayout title="Media Library — Auronova Exports Admin">
      <AdminHeader
        badge="Asset Storage"
        title="Media & Photography Library"
        description="Upload, preview, copy URLs, and manage high-resolution spice photography, certifications, and marketing assets."
        actions={
          <>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#FAF7F0] bg-[#4A2C20] hover:bg-[#351E16] shadow-sm transition-colors"
            >
              <UploadCloud size={15} className="text-[#D6A441]" />
              <span>Upload New Asset</span>
            </button>
          </>
        }
      />

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8E0D2] shadow-sm flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#24251F]/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search assets by file name or alt text..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
          />
        </div>

        <span className="text-xs text-[#24251F]/60">
          Showing <strong>{filteredMedia.length}</strong> assets
        </span>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {loading ? (
          <div className="col-span-full py-16 text-center text-xs text-[#24251F]/60">
            Loading media library assets...
          </div>
        ) : filteredMedia.length > 0 ? (
          filteredMedia.map((m) => (
            <div
              key={m._id || m.fileName}
              className="bg-white rounded-2xl border border-[#E8E0D2] shadow-sm overflow-hidden flex flex-col justify-between group hover:border-[#D6A441] transition-all"
            >
              <div className="aspect-[4/3] bg-[#FAF7F0] relative overflow-hidden">
                <img
                  src={m.url}
                  alt={m.altText || m.fileName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="font-bold text-xs text-[#24251F] block truncate" title={m.fileName}>
                    {m.originalName || m.fileName}
                  </span>
                  <span className="text-[10px] text-[#24251F]/50 block mt-0.5">
                    {m.fileSize ? `${Math.round(m.fileSize / 1024)} KB` : "Asset"} · {m.mimeType?.split("/")[1]?.toUpperCase() || "IMG"}
                  </span>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#FAF7F0] flex items-center justify-between gap-1">
                  <button
                    onClick={() => handleCopyUrl(m.url, m._id)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-[#FAF7F0] hover:bg-[#E8E0D2] text-[#24251F] transition-colors"
                    title="Copy image URL for products or hero slides"
                  >
                    {copiedId === m._id ? (
                      <>
                        <Check size={12} className="text-[#526747]" />
                        <span className="text-[#526747]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setDeleteTarget(m)}
                    className="p-1 rounded-lg text-red-400 hover:text-red-700 hover:bg-red-50 transition-colors"
                    title="Delete image"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center text-xs text-[#24251F]/60">
            No media assets found. Click &quot;Upload New Asset&quot; to add spice images.
          </div>
        )}
      </div>

      {/* Upload Confirmation Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#E8E0D2] shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E0D2] mb-4">
              <h3 className="font-bold text-base text-[#24251F]">Upload Asset</h3>
              <button
                onClick={() => setUploadModalOpen(false)}
                className="p-1 text-[#24251F]/40 hover:text-[#24251F]"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div className="aspect-[16/9] rounded-xl overflow-hidden bg-[#FAF7F0] border border-[#E8E0D2]">
                <img src={previewUrl} alt="Upload preview" className="w-full h-full object-cover" />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Asset Title / Name
                </label>
                <input
                  type="text"
                  required
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs text-[#24251F]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Alt Text (for accessibility & SEO)
                </label>
                <input
                  type="text"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs text-[#24251F]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E8E0D2]">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#24251F] hover:bg-[#FAF7F0] border border-[#E8E0D2]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-[#FAF7F0] bg-[#4A2C20] hover:bg-[#351E16] shadow-sm transition-colors disabled:opacity-50"
                >
                  {uploading ? "Uploading..." : "Save to Library"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title={`Delete "${deleteTarget?.fileName}"?`}
        message="Are you sure you want to permanently remove this media file? Any page or product linking to it will need to be updated."
        confirmLabel="Confirm Delete"
        confirmVariant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* Toast Notification */}
      {toast && (
        <NotificationToast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </AdminLayout>
  );
}

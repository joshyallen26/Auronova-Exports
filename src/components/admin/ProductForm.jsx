import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Save, ArrowLeft, Image as ImageIcon, Eye, CheckCircle2, AlertCircle } from "lucide-react";
import NotificationToast from "./NotificationToast";

const defaultProduct = {
  name: "",
  botanicalName: "",
  slug: "",
  category: "Whole Spices",
  origin: "Kerala & Regional India",
  image: "/images/bg-home-hero.jpg",
  description: "",
  characteristics: "",
  applications: "",
  packaging: "25kg / 50kg export standard packaging.",
  status: "published",
  featured: true,
  sortOrder: 0,
};

const commonCategories = [
  "Peppercorns",
  "Pods, Seeds & Chillies",
  "Bark & Flower Buds",
  "Dried Rhizomes",
  "Whole Pods",
  "Whole Spices",
];

export default function ProductForm({ initialData = null, isNew = false }) {
  const router = useRouter();
  const [form, setForm] = useState(initialData || defaultProduct);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => {
      const updated = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      // Auto-generate slug from name if new
      if (name === "name" && isNew && !prev.slugManuallyEdited) {
        updated.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setToast(null);

    const url = isNew ? "/api/admin/products" : `/api/admin/products/${form._id || form.slug}`;
    const method = isNew ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to save product.");
      }

      setToast({ type: "success", message: `Spice "${form.name}" saved successfully!` });

      if (isNew) {
        setTimeout(() => {
          router.push("/admin/products");
        }, 800);
      }
    } catch (err) {
      setToast({ type: "error", message: err.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#E8E0D2]">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#526747] hover:text-[#4A2C20] transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Products Catalogue</span>
        </Link>

        <div className="flex items-center gap-2">
          {!isNew && form.slug && (
            <Link
              href={`/products#${form.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium text-[#24251F] bg-white border border-[#E8E0D2] hover:bg-[#FAF7F0] transition-colors"
            >
              <span>Live Preview</span>
              <Eye size={13} />
            </Link>
          )}

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-[#FAF7F0] bg-[#4A2C20] hover:bg-[#351E16] shadow-sm transition-colors disabled:opacity-50"
          >
            <Save size={14} className="text-[#D6A441]" />
            <span>{saving ? "Saving..." : isNew ? "Create Spice" : "Save Changes"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Details (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          <div className="bg-white rounded-2xl p-6 border border-[#E8E0D2] shadow-sm space-y-4">
            <h2 className="font-bold text-sm text-[#4A2C20] uppercase tracking-wider">
              Primary Specifications
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Malabar Black Pepper"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Botanical Name
                </label>
                <input
                  type="text"
                  name="botanicalName"
                  value={form.botanicalName}
                  onChange={handleChange}
                  placeholder="e.g. Piper nigrum"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm text-[#24251F] italic focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  URL Slug *
                </label>
                <input
                  type="text"
                  name="slug"
                  required
                  value={form.slug}
                  onChange={(e) => {
                    handleChange(e);
                    setForm((p) => ({ ...p, slugManuallyEdited: true }));
                  }}
                  placeholder="e.g. black-pepper"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm text-[#24251F] font-mono focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Category
                </label>
                <div className="flex gap-2">
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
                  >
                    {commonCategories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#24251F] block mb-1">
                Regional Origin *
              </label>
              <input
                type="text"
                name="origin"
                required
                value={form.origin}
                onChange={handleChange}
                placeholder="e.g. Kerala (Alleppey) & Erode (Tamil Nadu), India"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
              />
              <span className="text-[11px] text-[#24251F]/60 mt-1 block">
                For turmeric, remember to include Erode (Tamil Nadu) alongside Kerala.
              </span>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#24251F] block mb-1">
                B2B Product Description *
              </label>
              <textarea
                name="description"
                rows={3}
                required
                value={form.description}
                onChange={handleChange}
                placeholder="Concise commercial summary suitable for international wholesale importers..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441] resize-none"
              />
            </div>
          </div>

          {/* Physical & Commercial Specs */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8E0D2] shadow-sm space-y-4">
            <h2 className="font-bold text-sm text-[#4A2C20] uppercase tracking-wider">
              Physical & Packaging Parameters
            </h2>

            <div>
              <label className="text-xs font-semibold text-[#24251F] block mb-1">
                Visual Characteristics & Grading
              </label>
              <input
                type="text"
                name="characteristics"
                value={form.characteristics}
                onChange={handleChange}
                placeholder="e.g. Sun-dried berries, bold density, deep natural color, 550g/l to 570g/l bulk density"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#24251F] block mb-1">
                Commercial Applications
              </label>
              <input
                type="text"
                name="applications"
                value={form.applications}
                onChange={handleChange}
                placeholder="e.g. Culinary grinding, seasoning blends, butchery, meat curing, retail packaging"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#24251F] block mb-1">
                Export Packaging Configurations
              </label>
              <input
                type="text"
                name="packaging"
                value={form.packaging}
                onChange={handleChange}
                placeholder="e.g. 25kg multi-wall kraft paper sacks with food-grade poly inner liners"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Settings (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Status & Visibility */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8E0D2] shadow-sm space-y-4">
            <h2 className="font-bold text-sm text-[#4A2C20] uppercase tracking-wider">
              Publishing Status
            </h2>

            <div>
              <label className="text-xs font-semibold text-[#24251F] block mb-1.5">
                Visibility Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm font-semibold text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
              >
                <option value="published">Published (Visible on site)</option>
                <option value="draft">Draft (Hidden from site)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#24251F] block mb-1.5">
                Catalogue Display Order
              </label>
              <input
                type="number"
                name="sortOrder"
                value={form.sortOrder}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm text-[#24251F]"
              />
            </div>
          </div>

          {/* Product Image */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8E0D2] shadow-sm space-y-4">
            <h2 className="font-bold text-sm text-[#4A2C20] uppercase tracking-wider">
              Product Photography
            </h2>

            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#FAF7F0] border border-[#E8E0D2] relative group">
              {form.image ? (
                <img
                  src={form.image}
                  alt={form.name || "Preview"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-[#24251F]/40 p-4 text-center">
                  <ImageIcon size={32} className="mb-2" />
                  <span className="text-xs">No image selected</span>
                </div>
              )}
            </div>

            <div>
              <label className="text-xs font-semibold text-[#24251F] block mb-1">
                Image URL / Asset Path *
              </label>
              <input
                type="text"
                name="image"
                required
                value={form.image}
                onChange={handleChange}
                placeholder="/images/pepper.jpg"
                className="w-full px-3 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs font-mono text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
              />
              <span className="text-[11px] text-[#24251F]/60 mt-1 block">
                Use an asset from /images or upload via Media Library.
              </span>
            </div>

            <Link
              href="/admin/media"
              target="_blank"
              className="w-full py-2 rounded-xl text-xs font-semibold text-center text-[#526747] bg-[#526747]/10 hover:bg-[#526747]/20 transition-colors block"
            >
              Open Media Library ↗
            </Link>
          </div>
        </div>
      </div>

      {toast && (
        <NotificationToast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </form>
  );
}

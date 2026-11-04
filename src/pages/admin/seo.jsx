import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminHeader from "@/components/admin/AdminHeader";
import NotificationToast from "@/components/admin/NotificationToast";
import { Save, Search, Globe, Eye, CheckCircle2 } from "lucide-react";

export default function AdminSeoPage() {
  const [seoList, setSeoList] = useState([]);
  const [activeKey, setActiveKey] = useState("home");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const fetchSeo = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/seo");
      if (res.ok) {
        const data = await res.json();
        setSeoList(data.seo || []);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeo();
  }, []);

  const activeItem = seoList.find((s) => s.pageKey === activeKey) || {
    pageKey: activeKey,
    pageName: activeKey.toUpperCase(),
    title: "",
    description: "",
    keywords: "",
    canonical: `/${activeKey === "home" ? "" : activeKey}`,
    ogTitle: "",
    ogDescription: "",
    ogImage: "/images/bg-home-hero.jpg",
  };

  const handleFieldChange = (field, value) => {
    setSeoList((prev) =>
      prev.map((item) => (item.pageKey === activeKey ? { ...item, [field]: value } : item))
    );
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await fetch("/api/admin/seo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activeItem),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to update SEO.");

      setToast({ type: "success", message: `SEO settings for "${activeItem.pageName || activeKey}" saved!` });
    } catch (err) {
      setToast({ type: "error", message: err.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="SEO & Metadata Configuration — Auronova Exports Admin">
      <AdminHeader
        badge="Metadata Manager"
        title="Search Engine Optimization (SEO) Settings"
        description="Configure page titles, meta descriptions, canonical URLs, and Open Graph social cards for each public page on the website."
        actions={
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#FAF7F0] bg-[#4A2C20] hover:bg-[#351E16] shadow-sm transition-colors disabled:opacity-50"
          >
            <Save size={14} className="text-[#D6A441]" />
            <span>{saving ? "Saving..." : "Save SEO Settings"}</span>
          </button>
        }
      />

      {loading ? (
        <div className="bg-white rounded-2xl p-12 text-center text-xs text-[#24251F]/60 border border-[#E8E0D2]">
          Loading SEO configurations...
        </div>
      ) : (
        <div className="space-y-6">
          {/* Page Tabs */}
          <div className="flex items-center gap-2 border-b border-[#E8E0D2] pb-1 overflow-x-auto">
            {seoList.map((item) => (
              <button
                key={item.pageKey}
                onClick={() => setActiveKey(item.pageKey)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                  activeKey === item.pageKey
                    ? "bg-[#4A2C20] text-[#FAF7F0] shadow-sm"
                    : "text-[#24251F]/70 hover:bg-white hover:text-[#24251F]"
                }`}
              >
                {item.pageName || item.pageKey}
              </button>
            ))}
          </div>

          <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Form Fields (8 cols) */}
            <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E0D2] shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#FAF7F0]">
                <h2 className="font-bold text-sm text-[#4A2C20] uppercase tracking-wider">
                  Page Metadata: {activeItem.pageName || activeKey}
                </h2>
                <span className="text-xs font-mono text-[#526747]">
                  Route: {activeItem.canonical || `/${activeKey === "home" ? "" : activeKey}`}
                </span>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Meta Title Tag (Recommended: 50–60 characters) *
                </label>
                <input
                  type="text"
                  required
                  value={activeItem.title || ""}
                  onChange={(e) => handleFieldChange("title", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm font-semibold text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
                />
                <span className="text-[11px] text-[#24251F]/50 mt-1 block">
                  Length: {(activeItem.title || "").length} characters
                </span>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Meta Description (Recommended: 140–160 characters) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={activeItem.description || ""}
                  onChange={(e) => handleFieldChange("description", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441] resize-none"
                />
                <span className="text-[11px] text-[#24251F]/50 mt-1 block">
                  Length: {(activeItem.description || "").length} characters
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#24251F] block mb-1">
                    Meta Keywords (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={activeItem.keywords || ""}
                    onChange={(e) => handleFieldChange("keywords", e.target.value)}
                    placeholder="Indian spices, Kerala cardamom, Cochin port"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs text-[#24251F]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#24251F] block mb-1">
                    Canonical Path
                  </label>
                  <input
                    type="text"
                    value={activeItem.canonical || ""}
                    onChange={(e) => handleFieldChange("canonical", e.target.value)}
                    placeholder="/products"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs font-mono text-[#24251F]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#FAF7F0] space-y-4">
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#D6A441]">
                  Open Graph & Social Share Preview
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#24251F] block mb-1">
                      OG Title
                    </label>
                    <input
                      type="text"
                      value={activeItem.ogTitle || ""}
                      onChange={(e) => handleFieldChange("ogTitle", e.target.value)}
                      placeholder="Title for social media shares"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs text-[#24251F]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#24251F] block mb-1">
                      OG Share Image URL
                    </label>
                    <input
                      type="text"
                      value={activeItem.ogImage || ""}
                      onChange={(e) => handleFieldChange("ogImage", e.target.value)}
                      placeholder="/images/bg-home-hero.jpg"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs font-mono text-[#24251F]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Google SERP Live Simulation (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-[#E8E0D2] shadow-sm space-y-4">
              <h2 className="font-bold text-sm text-[#4A2C20] uppercase tracking-wider">
                Google Search Snippet Preview
              </h2>

              {/* Realistic Google Search Card */}
              <div className="p-4 rounded-xl bg-white border border-[#E8E0D2] shadow-sm space-y-1.5 font-sans">
                <div className="flex items-center gap-2 text-xs text-[#202124]">
                  <span className="w-4 h-4 rounded-full bg-[#D6A441] text-[9px] font-bold text-[#24251F] flex items-center justify-center">
                    AE
                  </span>
                  <span className="truncate">auronovaexports.com</span>
                  <span className="text-[#5f6368]">› {activeItem.pageKey === "home" ? "" : activeItem.pageKey}</span>
                </div>

                <div className="text-base sm:text-lg font-medium text-[#1a0dab] leading-snug line-clamp-2 hover:underline cursor-pointer">
                  {activeItem.title || "Auronova Exports — The Finest of Indian Spices"}
                </div>

                <div className="text-xs text-[#4d5156] leading-relaxed line-clamp-3">
                  {activeItem.description || "Kerala's premier international spice exporter..."}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2] text-[11px] text-[#24251F]/70 leading-relaxed">
                Changes saved here dynamically inject into Next.js Head tags and OpenGraph meta tags across each public route.
              </div>
            </div>
          </form>
        </div>
      )}

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

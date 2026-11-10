import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminHeader from "@/components/admin/AdminHeader";
import NotificationToast from "@/components/admin/NotificationToast";
import { FileText, Save, CheckCircle2, RefreshCw, ExternalLink } from "lucide-react";

export default function AdminContentPage() {
  const [contentMap, setContentMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState(null);
  const [activeSection, setActiveSection] = useState("home_intro");
  const [toast, setToast] = useState(null);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/content");
      if (res.ok) {
        const data = await res.json();
        setContentMap(data.content || {});
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const sectionKeys = [
    { key: "home_intro", page: "Home", label: "Company Introduction & Story" },
    { key: "home_heritage", page: "Home", label: "Kerala Heritage & Regional Terroir" },
    { key: "about_details", page: "About", label: "About Us Story, Year & Markets" },
    { key: "about_mission_vision", page: "About", label: "Mission, Vision & Core Values" },
    { key: "sourcing_steps", page: "Sourcing", label: "Sourcing 6-Step Framework" },
    { key: "sourcing_overview", page: "Sourcing", label: "Farm-to-Vessel Sourcing Pillars" },
    { key: "shipping_pricing", page: "Shipping", label: "Shipping, Incoterms, MOQ & Packaging" },
    { key: "faq_content", page: "FAQ", label: "FAQ Categories & Q&A Content" },
    { key: "business_credentials", page: "Compliance", label: "Business Registrations & Credentials" },
    { key: "legal_privacy", page: "Legal", label: "Privacy Policy Content" },
    { key: "legal_terms", page: "Legal", label: "Terms & Conditions Content" },
    { key: "legal_shipping", page: "Legal", label: "Shipping Policy Content" },
    { key: "global_footer", page: "Global", label: "Global Footer Configuration" },
  ];

  const currentItem = contentMap[activeSection] || {
    sectionKey: activeSection,
    title: "",
    subtitle: "",
    content: {},
  };

  const handleContentFieldChange = (field, value) => {
    setContentMap((prev) => ({
      ...prev,
      [activeSection]: {
        ...prev[activeSection],
        content: {
          ...(prev[activeSection]?.content || {}),
          [field]: value,
        },
      },
    }));
  };

  const handleSave = async (sectionKey) => {
    const item = contentMap[sectionKey];
    if (!item) return;

    try {
      setSavingKey(sectionKey);
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sectionKey,
          title: item.title,
          subtitle: item.subtitle,
          page: item.page,
          data: item.content,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to save section content.");

      setToast({ type: "success", message: `Section "${item.title || sectionKey}" updated successfully.` });
    } catch (err) {
      setToast({ type: "error", message: err.message });
    } finally {
      setSavingKey(null);
    }
  };

  return (
    <AdminLayout title="Website Content CMS — Auronova Exports Admin">
      <AdminHeader
        badge="Modular CMS"
        title="Website Content Management"
        description="Edit structured text blocks, headings, storytelling narratives, and regional sourcing details across all website pages."
      />

      {loading ? (
        <div className="bg-white rounded-2xl p-12 text-center text-xs text-[#24251F]/60 border border-[#E8E0D2]">
          Loading website content blocks...
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Section Selector (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-[#E8E0D2] shadow-sm space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#4A2C20] mb-3 px-2">
              Website Content Blocks
            </h2>

            {sectionKeys.map((sec) => (
              <button
                key={sec.key}
                onClick={() => setActiveSection(sec.key)}
                className={`w-full text-left p-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                  activeSection === sec.key
                    ? "bg-[#4A2C20] text-[#FAF7F0] shadow-sm"
                    : "text-[#24251F] hover:bg-[#FAF7F0] border border-transparent hover:border-[#E8E0D2]"
                }`}
              >
                <div>
                  <span className="block">{sec.label}</span>
                  <span
                    className={`text-[10px] block mt-0.5 ${
                      activeSection === sec.key ? "text-[#D6A441]" : "text-[#24251F]/50"
                    }`}
                  >
                    Page: {sec.page} · {sec.key}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Right: Section Editor Form (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E0D2] shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-[#FAF7F0]">
              <div>
                <h3 className="font-bold text-base text-[#24251F]">
                  Editing: {sectionKeys.find((s) => s.key === activeSection)?.label || activeSection}
                </h3>
                <span className="text-[11px] font-mono text-[#526747]">
                  Key: {activeSection}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleSave(activeSection)}
                disabled={savingKey === activeSection}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-[#FAF7F0] bg-[#4A2C20] hover:bg-[#351E16] shadow-sm transition-colors disabled:opacity-50"
              >
                <Save size={14} className="text-[#D6A441]" />
                <span>{savingKey === activeSection ? "Saving..." : "Save Block"}</span>
              </button>
            </div>

            {/* Dynamic fields based on activeSection */}
            {currentItem.content && typeof currentItem.content === "object" && (
              <div className="space-y-4">
                {Object.entries(currentItem.content)
                  .filter(([key, val]) => typeof val === "string")
                  .map(([fieldKey, val]) => (
                    <div key={fieldKey}>
                      <label className="text-xs font-semibold text-[#24251F] capitalize block mb-1">
                        {fieldKey.replace(/([A-Z])/g, " $1")}
                      </label>
                      {val.length > 80 ? (
                        <textarea
                          rows={4}
                          value={val}
                          onChange={(e) => handleContentFieldChange(fieldKey, e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm text-[#24251F] leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
                        />
                      ) : (
                        <input
                          type="text"
                          value={val}
                          onChange={(e) => handleContentFieldChange(fieldKey, e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
                        />
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
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

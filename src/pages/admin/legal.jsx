import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminHeader from "@/components/admin/AdminHeader";
import NotificationToast from "@/components/admin/NotificationToast";
import { Save, Scale, Shield, FileText, CheckCircle2 } from "lucide-react";

export default function AdminLegalPage() {
  const [activeTab, setActiveTab] = useState("privacy"); // privacy | terms | shipping

  const [privacy, setPrivacy] = useState({
    title: "Privacy Policy",
    subtitle: "How Auronova Exports handles commercial information, buyer specifications, and trade inquiries.",
    lastUpdated: "November 2026",
  });

  const [terms, setTerms] = useState({
    title: "Terms & Conditions of Commercial Trade",
    subtitle: "Standard international trade provisions, commercial quotations, and export contract guidelines.",
    lastUpdated: "November 2026",
  });

  const [shippingPolicy, setShippingPolicy] = useState({
    title: "Export Shipping & Logistics Policy",
    subtitle: "Standard shipping routes, container consolidation, export packing, lead times, and customs clearance protocols from Cochin Port.",
    lastUpdated: "November 2026",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    async function loadPolicies() {
      try {
        setLoading(true);
        const [resPriv, resTerms, resShip] = await Promise.all([
          fetch("/api/admin/content?section=legal_privacy"),
          fetch("/api/admin/content?section=legal_terms"),
          fetch("/api/admin/content?section=legal_shipping"),
        ]);

        if (resPriv.ok) {
          const j1 = await resPriv.json();
          if (j1.data?.content) setPrivacy((p) => ({ ...p, ...j1.data.content }));
        }
        if (resTerms.ok) {
          const j2 = await resTerms.json();
          if (j2.data?.content) setTerms((p) => ({ ...p, ...j2.data.content }));
        }
        if (resShip.ok) {
          const j3 = await resShip.json();
          if (j3.data?.content) setShippingPolicy((p) => ({ ...p, ...j3.data.content }));
        }
      } finally {
        setLoading(false);
      }
    }
    loadPolicies();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const payload =
        activeTab === "privacy"
          ? { sectionKey: "legal_privacy", page: "legal", data: privacy }
          : activeTab === "terms"
          ? { sectionKey: "legal_terms", page: "legal", data: terms }
          : { sectionKey: "legal_shipping", page: "legal", data: shippingPolicy };

      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      if (!res.ok || !resData.success) throw new Error(resData.message || "Failed to save policy.");

      setToast({ type: "success", message: "Policy details updated successfully." });
    } catch (err) {
      setToast({ type: "error", message: err.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="Legal & Trade Policies CMS — Auronova Exports Admin">
      <AdminHeader
        badge="Legal & Compliance"
        title="Privacy Policy, Terms & Shipping Policy"
        description="Edit statutory terms of trade, buyer confidentiality protocols, and export shipping logistics policy."
        actions={
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#FAF7F0] bg-[#4A2C20] hover:bg-[#351E16] shadow-sm transition-colors disabled:opacity-50"
          >
            <Save size={14} className="text-[#D6A441]" />
            <span>{saving ? "Saving..." : "Save Policy"}</span>
          </button>
        }
      />

      {loading ? (
        <div className="bg-white rounded-2xl p-12 text-center text-xs text-[#24251F]/60 border border-[#E8E0D2]">
          Loading legal policies...
        </div>
      ) : (
        <div className="space-y-6">
          {/* Policy Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-[#E8E0D2] pb-4">
            <button
              onClick={() => setActiveTab("privacy")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === "privacy"
                  ? "bg-[#4A2C20] text-[#FAF7F0]"
                  : "bg-white text-[#24251F] border border-[#E8E0D2] hover:bg-[#FAF7F0]"
              }`}
            >
              <Shield size={14} className={activeTab === "privacy" ? "text-[#D6A441]" : "text-[#526747]"} />
              <span>Privacy Policy</span>
            </button>

            <button
              onClick={() => setActiveTab("terms")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === "terms"
                  ? "bg-[#4A2C20] text-[#FAF7F0]"
                  : "bg-white text-[#24251F] border border-[#E8E0D2] hover:bg-[#FAF7F0]"
              }`}
            >
              <Scale size={14} className={activeTab === "terms" ? "text-[#D6A441]" : "text-[#526747]"} />
              <span>Terms & Conditions</span>
            </button>

            <button
              onClick={() => setActiveTab("shipping")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === "shipping"
                  ? "bg-[#4A2C20] text-[#FAF7F0]"
                  : "bg-white text-[#24251F] border border-[#E8E0D2] hover:bg-[#FAF7F0]"
              }`}
            >
              <FileText size={14} className={activeTab === "shipping" ? "text-[#D6A441]" : "text-[#526747]"} />
              <span>Shipping Policy</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E0D2] shadow-sm space-y-5">
            {activeTab === "privacy" && (
              <>
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E0D2]">
                  <h3 className="font-bold text-sm text-[#24251F]">Privacy Policy Configuration</h3>
                  <a href="/privacy-policy" target="_blank" className="text-xs text-[#526747] hover:underline font-semibold">
                    View Live Page ↗
                  </a>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#24251F] block mb-1">Page Title</label>
                  <input
                    type="text"
                    value={privacy.title}
                    onChange={(e) => setPrivacy({ ...privacy, title: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm font-semibold text-[#24251F]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#24251F] block mb-1">Subtitle / Purpose</label>
                  <textarea
                    rows={2}
                    value={privacy.subtitle}
                    onChange={(e) => setPrivacy({ ...privacy, subtitle: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm text-[#24251F] resize-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#24251F] block mb-1">Last Updated Notice</label>
                  <input
                    type="text"
                    value={privacy.lastUpdated}
                    onChange={(e) => setPrivacy({ ...privacy, lastUpdated: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm text-[#24251F]"
                  />
                </div>
              </>
            )}

            {activeTab === "terms" && (
              <>
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E0D2]">
                  <h3 className="font-bold text-sm text-[#24251F]">Terms & Conditions Configuration</h3>
                  <a href="/terms" target="_blank" className="text-xs text-[#526747] hover:underline font-semibold">
                    View Live Page ↗
                  </a>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#24251F] block mb-1">Page Title</label>
                  <input
                    type="text"
                    value={terms.title}
                    onChange={(e) => setTerms({ ...terms, title: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm font-semibold text-[#24251F]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#24251F] block mb-1">Subtitle / Scope</label>
                  <textarea
                    rows={2}
                    value={terms.subtitle}
                    onChange={(e) => setTerms({ ...terms, subtitle: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm text-[#24251F] resize-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#24251F] block mb-1">Effective Date Notice</label>
                  <input
                    type="text"
                    value={terms.lastUpdated}
                    onChange={(e) => setTerms({ ...terms, lastUpdated: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm text-[#24251F]"
                  />
                </div>
              </>
            )}

            {activeTab === "shipping" && (
              <>
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E0D2]">
                  <h3 className="font-bold text-sm text-[#24251F]">Shipping Policy Configuration</h3>
                  <a href="/shipping-policy" target="_blank" className="text-xs text-[#526747] hover:underline font-semibold">
                    View Live Page ↗
                  </a>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#24251F] block mb-1">Page Title</label>
                  <input
                    type="text"
                    value={shippingPolicy.title}
                    onChange={(e) => setShippingPolicy({ ...shippingPolicy, title: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm font-semibold text-[#24251F]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#24251F] block mb-1">Subtitle / Scope</label>
                  <textarea
                    rows={2}
                    value={shippingPolicy.subtitle}
                    onChange={(e) => setShippingPolicy({ ...shippingPolicy, subtitle: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm text-[#24251F] resize-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#24251F] block mb-1">Effective Date Notice</label>
                  <input
                    type="text"
                    value={shippingPolicy.lastUpdated}
                    onChange={(e) => setShippingPolicy({ ...shippingPolicy, lastUpdated: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm text-[#24251F]"
                  />
                </div>
              </>
            )}
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


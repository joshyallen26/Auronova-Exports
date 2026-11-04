import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminHeader from "@/components/admin/AdminHeader";
import NotificationToast from "@/components/admin/NotificationToast";
import { Save, Compass, MapPin } from "lucide-react";

export default function AdminSourcingPage() {
  const [data, setData] = useState({
    headline: "Responsible, Direct Regional Sourcing",
    intro:
      "We work directly with primary farming cooperatives and estate clusters across Kerala and selected Indian agricultural belts like Erode for turmeric. This allows international buyers to access fresh, traceable commodities with minimal supply chain friction.",
    pillars: [
      {
        step: "01",
        title: "Origin Selection",
        desc: "Identifying harvest belts known for optimal microclimate and varietal authenticity.",
      },
      {
        step: "02",
        title: "Primary Processing & Curing",
        desc: "Controlled sun-drying, mechanical cleaning, destoning, and size-grading at origin.",
      },
      {
        step: "03",
        title: "Quality Verification",
        desc: "Moisture testing, foreign matter screening, and export standard alignment.",
      },
      {
        step: "04",
        title: "Consolidation & Lading",
        desc: "Container stuffing and port customs documentation directly at Cochin Port.",
      },
    ],
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    async function loadSourcing() {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/content?section=sourcing_overview");
        if (res.ok) {
          const json = await res.json();
          if (json.data?.content) setData(json.data.content);
        }
      } finally {
        setLoading(false);
      }
    }
    loadSourcing();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sectionKey: "sourcing_overview",
          page: "sourcing",
          data,
        }),
      });
      const resData = await res.json();
      if (!res.ok || !resData.success) throw new Error(resData.message || "Failed to save.");

      setToast({ type: "success", message: "Sourcing framework content saved." });
    } catch (err) {
      setToast({ type: "error", message: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handlePillarChange = (index, field, val) => {
    const updated = [...(data.pillars || [])];
    updated[index] = { ...updated[index], [field]: val };
    setData({ ...data, pillars: updated });
  };

  return (
    <AdminLayout title="Sourcing Framework — Auronova Exports Admin">
      <AdminHeader
        badge="Supply Chain"
        title="Sourcing Approach & Regional Origins"
        description="Manage the sourcing narrative, agricultural partner belts, Western Ghats terroir highlights, and Erode turmeric references."
        actions={
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#FAF7F0] bg-[#4A2C20] hover:bg-[#351E16] shadow-sm transition-colors disabled:opacity-50"
          >
            <Save size={14} className="text-[#D6A441]" />
            <span>{saving ? "Saving..." : "Save Sourcing"}</span>
          </button>
        }
      />

      {loading ? (
        <div className="bg-white rounded-2xl p-12 text-center text-xs text-[#24251F]/60 border border-[#E8E0D2]">
          Loading sourcing content...
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E0D2] shadow-sm space-y-4">
            <h2 className="font-bold text-sm text-[#4A2C20] uppercase tracking-wider">
              Core Sourcing Narrative
            </h2>

            <div>
              <label className="text-xs font-semibold text-[#24251F] block mb-1">
                Headline
              </label>
              <input
                type="text"
                value={data.headline}
                onChange={(e) => setData({ ...data, headline: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm font-bold text-[#24251F]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#24251F] block mb-1">
                Sourcing Introduction
              </label>
              <textarea
                rows={4}
                value={data.intro}
                onChange={(e) => setData({ ...data, intro: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm text-[#24251F] leading-relaxed resize-none"
              />
              <span className="text-[11px] text-[#24251F]/60 mt-1 block">
                Emphasize direct grower connections and Erode, Tamil Nadu alongside Kerala.
              </span>
            </div>
          </div>

          {/* 4 Steps */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E0D2] shadow-sm space-y-4">
            <h2 className="font-bold text-sm text-[#4A2C20] uppercase tracking-wider">
              Farm-to-Vessel Sourcing Pillars
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.pillars?.map((p, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2] space-y-3">
                  <span className="text-xs font-bold text-[#D6A441] block">Step 0{idx + 1}</span>
                  <div>
                    <label className="text-xs font-semibold text-[#24251F] block mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={p.title}
                      onChange={(e) => handlePillarChange(idx, "title", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#E8E0D2] bg-white text-xs font-bold text-[#24251F]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#24251F] block mb-1">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      value={p.desc}
                      onChange={(e) => handlePillarChange(idx, "desc", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#E8E0D2] bg-white text-xs text-[#24251F] resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>
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

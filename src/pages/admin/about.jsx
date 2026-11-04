import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminHeader from "@/components/admin/AdminHeader";
import NotificationToast from "@/components/admin/NotificationToast";
import { Save, RefreshCw, CheckCircle2 } from "lucide-react";

export default function AdminAboutPage() {
  const [data, setData] = useState({
    missionTitle: "Our Mission",
    missionText:
      "To connect India's spice-growing regions and agricultural producers with international buyers through a direct, transparent, and dependable sourcing approach. We aim to make authentic Indian spices and products more accessible to global markets while building meaningful business relationships between producers and buyers.",
    visionTitle: "Our Vision",
    visionText:
      "To build a trusted bridge between the source of Indian spices and products and the businesses that need them across the world. We envision a more direct and transparent sourcing network where international buyers can access authentic Indian products closer to their origins, with fewer unnecessary intermediaries and a clearer connection to the people and regions behind them.",
    values: [
      {
        title: "Direct Sourcing Transparency",
        desc: "Open communication regarding origins, harvest seasons, processing methods, and fair commercial pricing.",
      },
      {
        title: "Quality Alignment",
        desc: "Commitment to export physical cleanliness, moisture thresholds, and buyer quality specifications.",
      },
      {
        title: "Commercial Reliability",
        desc: "Transparent Incoterm pricing (FOB Cochin / CIF Worldwide), prompt response, and reliable shipping documentation.",
      },
    ],
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    async function loadAbout() {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/content?section=about_mission_vision");
        if (res.ok) {
          const json = await res.json();
          if (json.data?.content) {
            setData(json.data.content);
          }
        }
      } finally {
        setLoading(false);
      }
    }
    loadAbout();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sectionKey: "about_mission_vision",
          page: "about",
          data,
        }),
      });
      const resData = await res.json();
      if (!res.ok || !resData.success) throw new Error(resData.message || "Failed to save.");

      setToast({ type: "success", message: "Mission, Vision & About content updated successfully." });
    } catch (err) {
      setToast({ type: "error", message: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleValueChange = (index, field, val) => {
    const updated = [...(data.values || [])];
    updated[index] = { ...updated[index], [field]: val };
    setData({ ...data, values: updated });
  };

  return (
    <AdminLayout title="About Us & Company Content — Auronova Exports Admin">
      <AdminHeader
        badge="Company Content"
        title="About Us, Mission, Vision & Values"
        description="Edit the core corporate identity, purpose statements, vision, and operational values displayed across the About Us page."
        actions={
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#FAF7F0] bg-[#4A2C20] hover:bg-[#351E16] shadow-sm transition-colors disabled:opacity-50"
          >
            <Save size={14} className="text-[#D6A441]" />
            <span>{saving ? "Saving..." : "Save About Content"}</span>
          </button>
        }
      />

      {loading ? (
        <div className="bg-white rounded-2xl p-12 text-center text-xs text-[#24251F]/60 border border-[#E8E0D2]">
          Loading About Us content...
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {/* Mission & Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-[#E8E0D2] shadow-sm space-y-4">
              <span className="text-xs uppercase font-bold tracking-widest text-[#D6A441] block">
                Purpose Statement
              </span>
              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Mission Title
                </label>
                <input
                  type="text"
                  value={data.missionTitle}
                  onChange={(e) => setData({ ...data, missionTitle: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm font-bold text-[#24251F]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Mission Statement
                </label>
                <textarea
                  rows={6}
                  value={data.missionText}
                  onChange={(e) => setData({ ...data, missionText: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm text-[#24251F] leading-relaxed resize-none"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#E8E0D2] shadow-sm space-y-4">
              <span className="text-xs uppercase font-bold tracking-widest text-[#526747] block">
                Ambition Statement
              </span>
              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Vision Title
                </label>
                <input
                  type="text"
                  value={data.visionTitle}
                  onChange={(e) => setData({ ...data, visionTitle: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm font-bold text-[#24251F]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Vision Statement
                </label>
                <textarea
                  rows={6}
                  value={data.visionText}
                  onChange={(e) => setData({ ...data, visionText: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm text-[#24251F] leading-relaxed resize-none"
                />
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E0D2] shadow-sm space-y-4">
            <h2 className="font-bold text-sm text-[#4A2C20] uppercase tracking-wider">
              Core Operating Values
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.values?.map((val, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2] space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-[#24251F] block mb-1">
                      Value 0{idx + 1} Title
                    </label>
                    <input
                      type="text"
                      value={val.title}
                      onChange={(e) => handleValueChange(idx, "title", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#E8E0D2] bg-white text-xs font-bold text-[#24251F]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#24251F] block mb-1">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={val.desc}
                      onChange={(e) => handleValueChange(idx, "desc", e.target.value)}
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

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminHeader from "@/components/admin/AdminHeader";
import NotificationToast from "@/components/admin/NotificationToast";
import { Save, RefreshCw, CheckCircle2, Building2, Calendar, Globe, MapPin, Target } from "lucide-react";

export default function AdminAboutPage() {
  const [details, setDetails] = useState({
    registeredBusinessName: "Auronova Exports Pvt. Ltd.",
    establishmentYear: "Rooted in Malabar spice trade heritage",
    establishmentYearPlaceholder: "[Editable: e.g. Established 2024 / 2026 — manage via CMS]",
    portZoneAddress: "Spice Trade Centre, Cochin Port Zone, Kochi, Kerala 682 001, India",
    phone: "+91 (484) 290-0000",
    whatsapp: "+91 94000 00000",
    email: "exports@auronovaexports.com",
    storyHeadline: "The Heritage of Indian Spices, Anchored in Kerala",
    storyParagraph1:
      "India has enriched world gastronomy and trade for thousands of years through its unparalleled diversity of spices and agro-climatic zones. Within this vast subcontinental heritage, the state of Kerala on India's southwest coast has stood as the historic epicenter of maritime trade.",
    storyParagraph2:
      "At Auronova Exports, based in Cochin, we connect international food processors, brand packagers, and wholesale distributors directly to verified regional estates in Wayanad, Idukki, and agricultural sourcing regions across India such as Erode for turmeric.",
  });

  const [missionVision, setMissionVision] = useState({
    missionTitle: "Our Mission",
    missionText:
      "To connect India's spice-growing regions and agricultural producers with international buyers through a direct, transparent, and dependable sourcing approach. We aim to make authentic Indian spices and products more accessible to global markets while building meaningful business relationships between producers and buyers.",
    visionTitle: "Our Vision",
    visionText:
      "To build a trusted bridge between the source of Indian spices and products and the businesses that need them across the world. We envision a more direct and transparent sourcing network where international buyers can access authentic Indian products closer to their origins, with fewer unnecessary intermediaries and a clearer connection to the people and regions behind them.",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    async function loadAboutData() {
      try {
        setLoading(true);
        const [resDetails, resMV] = await Promise.all([
          fetch("/api/admin/content?section=about_details"),
          fetch("/api/admin/content?section=about_mission_vision"),
        ]);

        if (resDetails.ok) {
          const jsonD = await resDetails.json();
          if (jsonD.data?.content) setDetails((prev) => ({ ...prev, ...jsonD.data.content }));
        }
        if (resMV.ok) {
          const jsonMV = await resMV.json();
          if (jsonMV.data?.content) setMissionVision((prev) => ({ ...prev, ...jsonMV.data.content }));
        }
      } finally {
        setLoading(false);
      }
    }
    loadAboutData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const [res1, res2] = await Promise.all([
        fetch("/api/admin/content", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sectionKey: "about_details",
            page: "about",
            data: details,
          }),
        }),
        fetch("/api/admin/content", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sectionKey: "about_mission_vision",
            page: "about",
            data: missionVision,
          }),
        }),
      ]);

      if (!res1.ok || !res2.ok) throw new Error("Failed to save some About Us content sections.");

      setToast({ type: "success", message: "About Us content & company identity updated successfully." });
    } catch (err) {
      setToast({ type: "error", message: err.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="About Us & Company Content — Auronova Exports Admin">
      <AdminHeader
        badge="Company Content"
        title="About Us, Heritage & Corporate Identity"
        description="Manage company history, registered business identity, establishment year milestones, mission, vision, and regional sourcing details."
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
          {/* Registered Identity & Establishment Year */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E0D2] shadow-sm space-y-5">
            <div className="flex items-center gap-2 text-sm font-bold text-[#4A2C20] uppercase tracking-wider">
              <Building2 size={16} />
              <span>Registered Business Identity & Establishment Year</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Registered Business Name
                </label>
                <input
                  type="text"
                  value={details.registeredBusinessName}
                  onChange={(e) => setDetails({ ...details, registeredBusinessName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm font-semibold text-[#24251F]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Establishment Year / Heritage Notice
                </label>
                <input
                  type="text"
                  value={details.establishmentYear}
                  onChange={(e) => setDetails({ ...details, establishmentYear: e.target.value })}
                  placeholder="e.g. Established 2024 / Heritage Roots"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm text-[#24251F]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Establishment Placeholder / Milestone Notes
                </label>
                <input
                  type="text"
                  value={details.establishmentYearPlaceholder}
                  onChange={(e) => setDetails({ ...details, establishmentYearPlaceholder: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs text-[#24251F]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Port Zone Headquarters
                </label>
                <input
                  type="text"
                  value={details.portZoneAddress}
                  onChange={(e) => setDetails({ ...details, portZoneAddress: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs text-[#24251F]"
                />
              </div>
            </div>
          </div>

          {/* Company Story (Indian Spices first, then Kerala) */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E0D2] shadow-sm space-y-4">
            <h2 className="font-bold text-sm text-[#4A2C20] uppercase tracking-wider flex items-center gap-2">
              <Globe size={16} />
              <span>Company Story & Regional Focus</span>
            </h2>

            <div>
              <label className="text-xs font-semibold text-[#24251F] block mb-1">
                Story Headline
              </label>
              <input
                type="text"
                value={details.storyHeadline}
                onChange={(e) => setDetails({ ...details, storyHeadline: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm font-bold text-[#24251F]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#24251F] block mb-1">
                Paragraph 1 (Introducing Indian Spices & Heritage)
              </label>
              <textarea
                rows={3}
                value={details.storyParagraph1}
                onChange={(e) => setDetails({ ...details, storyParagraph1: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm text-[#24251F] resize-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#24251F] block mb-1">
                Paragraph 2 (Auronova Exports & Kerala Operations)
              </label>
              <textarea
                rows={3}
                value={details.storyParagraph2}
                onChange={(e) => setDetails({ ...details, storyParagraph2: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm text-[#24251F] resize-none"
              />
            </div>
          </div>

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
                  value={missionVision.missionTitle}
                  onChange={(e) => setMissionVision({ ...missionVision, missionTitle: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm font-bold text-[#24251F]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Mission Statement
                </label>
                <textarea
                  rows={6}
                  value={missionVision.missionText}
                  onChange={(e) => setMissionVision({ ...missionVision, missionText: e.target.value })}
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
                  value={missionVision.visionTitle}
                  onChange={(e) => setMissionVision({ ...missionVision, visionTitle: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm font-bold text-[#24251F]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Vision Statement
                </label>
                <textarea
                  rows={6}
                  value={missionVision.visionText}
                  onChange={(e) => setMissionVision({ ...missionVision, visionText: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm text-[#24251F] leading-relaxed resize-none"
                />
              </div>
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

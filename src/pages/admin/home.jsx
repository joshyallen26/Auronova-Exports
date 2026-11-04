import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminHeader from "@/components/admin/AdminHeader";
import NotificationToast from "@/components/admin/NotificationToast";
import {
  Save,
  Plus,
  Trash2,
  Image as ImageIcon,
  Eye,
  Sliders,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";

export default function AdminHomePage() {
  const [activeTab, setActiveTab] = useState("hero");
  const [heroData, setHeroData] = useState(null);
  const [introData, setIntroData] = useState(null);
  const [heritageData, setHeritageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/content");
      if (res.ok) {
        const data = await res.json();
        const content = data.content || {};
        if (content.home_hero?.content) setHeroData(content.home_hero.content);
        if (content.home_intro?.content) setIntroData(content.home_intro.content);
        if (content.home_heritage?.content) setHeritageData(content.home_heritage.content);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleSave = async (sectionKey, payload) => {
    try {
      setSaving(true);
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sectionKey,
          page: "home",
          data: payload,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to update homepage content.");

      setToast({ type: "success", message: "Homepage section updated successfully." });
    } catch (err) {
      setToast({ type: "error", message: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleHeroSlideChange = (index, field, value) => {
    setHeroData((prev) => {
      const slides = [...(prev?.slides || [])];
      slides[index] = { ...slides[index], [field]: value };
      return { ...prev, slides };
    });
  };

  const addHeroSlide = () => {
    setHeroData((prev) => {
      const slides = [...(prev?.slides || [])];
      slides.push({
        id: Date.now(),
        badge: "Direct Sourcing · Cochin, Kerala",
        headline: "Pure Indian Spices.",
        subheadline: "Exported Worldwide.",
        description: "Freshly harvested and sun-dried spices curated directly from regional grower belts.",
        image: "/images/bg-home-hero.jpg",
        primaryCtaText: "Explore Catalogue",
        primaryCtaLink: "/products",
        secondaryCtaText: "Request Quote",
        secondaryCtaLink: "#rfq-section",
      });
      return { ...prev, slides };
    });
  };

  const removeHeroSlide = (index) => {
    setHeroData((prev) => {
      const slides = [...(prev?.slides || [])];
      slides.splice(index, 1);
      return { ...prev, slides };
    });
  };

  return (
    <AdminLayout title="Home Page Management — Auronova Exports Admin">
      <AdminHeader
        badge="Page CMS"
        title="Home Page Management"
        description="Customize the full-width top hero image slider, company introduction narrative, regional origins, and featured section settings."
      />

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E8E0D2] pb-1 overflow-x-auto">
        {[
          { id: "hero", label: "Hero Image Slider" },
          { id: "intro", label: "Company Introduction" },
          { id: "heritage", label: "Heritage & Regional Origins" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-[#4A2C20] text-[#FAF7F0] shadow-sm"
                : "text-[#24251F]/70 hover:bg-white hover:text-[#24251F]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl p-12 text-center text-xs text-[#24251F]/60 border border-[#E8E0D2]">
          Loading homepage content configuration...
        </div>
      ) : (
        <>
          {/* TAB 1: HERO SLIDER */}
          {activeTab === "hero" && heroData && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-lg text-[#24251F]">Hero Slider Slides</h2>
                  <p className="text-xs text-[#24251F]/60">
                    Each slide showcases luxury spice photography with customizable headlines and CTA buttons.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={addHeroSlide}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-[#FAF7F0] border border-[#E8E0D2] hover:bg-[#E8E0D2] transition-colors"
                  >
                    <Plus size={14} className="text-[#526747]" />
                    <span>Add Slide</span>
                  </button>
                  <button
                    onClick={() => handleSave("home_hero", heroData)}
                    disabled={saving}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-[#FAF7F0] bg-[#4A2C20] hover:bg-[#351E16] shadow-sm transition-colors disabled:opacity-50"
                  >
                    <Save size={14} className="text-[#D6A441]" />
                    <span>{saving ? "Saving..." : "Save Slider"}</span>
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {heroData.slides?.map((slide, index) => (
                  <div
                    key={slide.id || index}
                    className="bg-white rounded-2xl p-6 border border-[#E8E0D2] shadow-sm space-y-4"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-[#FAF7F0]">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#D6A441]">
                        Slide 0{index + 1}
                      </span>
                      {heroData.slides.length > 1 && (
                        <button
                          onClick={() => removeHeroSlide(index)}
                          className="text-red-500 hover:text-red-700 text-xs flex items-center gap-1"
                        >
                          <Trash2 size={13} />
                          <span>Remove</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      {/* Left: Image preview & URL (4 cols) */}
                      <div className="lg:col-span-4 space-y-3">
                        <div className="aspect-[16/9] rounded-xl overflow-hidden bg-[#FAF7F0] border border-[#E8E0D2]">
                          <img
                            src={slide.image}
                            alt={slide.headline}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-[#24251F] block mb-1">
                            Slide Image Path *
                          </label>
                          <input
                            type="text"
                            value={slide.image}
                            onChange={(e) => handleHeroSlideChange(index, "image", e.target.value)}
                            className="w-full px-3 py-1.5 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs font-mono text-[#24251F]"
                          />
                        </div>
                      </div>

                      {/* Right: Content fields (8 cols) */}
                      <div className="lg:col-span-8 space-y-3">
                        <div>
                          <label className="text-xs font-semibold text-[#24251F] block mb-1">
                            Eyebrow Badge
                          </label>
                          <input
                            type="text"
                            value={slide.badge}
                            onChange={(e) => handleHeroSlideChange(index, "badge", e.target.value)}
                            className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs font-medium text-[#24251F]"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-semibold text-[#24251F] block mb-1">
                              Headline *
                            </label>
                            <input
                              type="text"
                              value={slide.headline}
                              onChange={(e) => handleHeroSlideChange(index, "headline", e.target.value)}
                              className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs font-bold text-[#24251F]"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-[#24251F] block mb-1">
                              Sub-Headline (Italicized)
                            </label>
                            <input
                              type="text"
                              value={slide.subheadline}
                              onChange={(e) => handleHeroSlideChange(index, "subheadline", e.target.value)}
                              className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs italic text-[#4A2C20]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-[#24251F] block mb-1">
                            Description Paragraph
                          </label>
                          <textarea
                            rows={2}
                            value={slide.description}
                            onChange={(e) => handleHeroSlideChange(index, "description", e.target.value)}
                            className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs text-[#24251F] resize-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={slide.primaryCtaText}
                              onChange={(e) => handleHeroSlideChange(index, "primaryCtaText", e.target.value)}
                              placeholder="Primary Button Text"
                              className="w-1/2 px-3 py-1.5 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs"
                            />
                            <input
                              type="text"
                              value={slide.primaryCtaLink}
                              onChange={(e) => handleHeroSlideChange(index, "primaryCtaLink", e.target.value)}
                              placeholder="Primary Link"
                              className="w-1/2 px-3 py-1.5 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs font-mono"
                            />
                          </div>

                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={slide.secondaryCtaText}
                              onChange={(e) => handleHeroSlideChange(index, "secondaryCtaText", e.target.value)}
                              placeholder="Secondary Button Text"
                              className="w-1/2 px-3 py-1.5 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs"
                            />
                            <input
                              type="text"
                              value={slide.secondaryCtaLink}
                              onChange={(e) => handleHeroSlideChange(index, "secondaryCtaLink", e.target.value)}
                              placeholder="Secondary Link"
                              className="w-1/2 px-3 py-1.5 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: COMPANY INTRODUCTION */}
          {activeTab === "intro" && introData && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E0D2] shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-[#FAF7F0]">
                <div>
                  <h2 className="font-bold text-lg text-[#24251F]">Company Introduction Section</h2>
                  <p className="text-xs text-[#24251F]/60">
                    Storytelling introducing Indian spices first, followed by Kerala as primary operations.
                  </p>
                </div>
                <button
                  onClick={() => handleSave("home_intro", introData)}
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-[#FAF7F0] bg-[#4A2C20] hover:bg-[#351E16] shadow-sm transition-colors disabled:opacity-50"
                >
                  <Save size={14} className="text-[#D6A441]" />
                  <span>{saving ? "Saving..." : "Save Intro"}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#24251F] block mb-1">
                    Eyebrow Text
                  </label>
                  <input
                    type="text"
                    value={introData.eyebrow || ""}
                    onChange={(e) => setIntroData({ ...introData, eyebrow: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs font-medium text-[#24251F]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#24251F] block mb-1">
                    Headline
                  </label>
                  <input
                    type="text"
                    value={introData.headline || ""}
                    onChange={(e) => setIntroData({ ...introData, headline: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm font-bold text-[#24251F]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Tagline Subtitle
                </label>
                <input
                  type="text"
                  value={introData.tagline || ""}
                  onChange={(e) => setIntroData({ ...introData, tagline: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs text-[#4A2C20]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Paragraph 1 (Introducing India First)
                </label>
                <textarea
                  rows={3}
                  value={introData.paragraph1 || ""}
                  onChange={(e) => setIntroData({ ...introData, paragraph1: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs text-[#24251F] resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Paragraph 2 (Auronova Exports & Kerala Direct Sourcing)
                </label>
                <textarea
                  rows={3}
                  value={introData.paragraph2 || ""}
                  onChange={(e) => setIntroData({ ...introData, paragraph2: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs text-[#24251F] resize-none"
                />
              </div>
            </div>
          )}

          {/* TAB 3: HERITAGE & REGIONS */}
          {activeTab === "heritage" && heritageData && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E0D2] shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-[#FAF7F0]">
                <div>
                  <h2 className="font-bold text-lg text-[#24251F]">Kerala Heritage & Regional Origins</h2>
                  <p className="text-xs text-[#24251F]/60">
                    Sourcing highlights including Western Ghats terroir and Erode turmeric.
                  </p>
                </div>
                <button
                  onClick={() => handleSave("home_heritage", heritageData)}
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-[#FAF7F0] bg-[#4A2C20] hover:bg-[#351E16] shadow-sm transition-colors disabled:opacity-50"
                >
                  <Save size={14} className="text-[#D6A441]" />
                  <span>{saving ? "Saving..." : "Save Heritage"}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#24251F] block mb-1">
                    Eyebrow
                  </label>
                  <input
                    type="text"
                    value={heritageData.eyebrow || ""}
                    onChange={(e) => setHeritageData({ ...heritageData, eyebrow: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#24251F] block mb-1">
                    Headline
                  </label>
                  <input
                    type="text"
                    value={heritageData.headline || ""}
                    onChange={(e) => setHeritageData({ ...heritageData, headline: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm font-bold text-[#24251F]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={heritageData.description || ""}
                  onChange={(e) => setHeritageData({ ...heritageData, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs text-[#24251F] resize-none"
                />
              </div>
            </div>
          )}
        </>
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

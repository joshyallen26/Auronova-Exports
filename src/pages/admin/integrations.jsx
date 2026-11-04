import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminHeader from "@/components/admin/AdminHeader";
import NotificationToast from "@/components/admin/NotificationToast";
import { Save, Sliders, MessageCircle, MapPin, Share2, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function AdminIntegrationsPage() {
  const [integrations, setIntegrations] = useState({
    whatsappNumber: "+91 94000 00000",
    whatsappPrefilledMessage: "Hello Auronova Exports, I am interested in sourcing Indian spices from your export catalogue.",
    googleMapsUrl: "https://maps.google.com/?q=Cochin+Port+Kochi+Kerala",
    googleMapsEmbedUrl: "",
    linkedinUrl: "https://linkedin.com",
    twitterUrl: "https://twitter.com",
    instagramUrl: "",
    companyRegistration: "CIN / Export Code: IEC Validated",
    spicesBoardRegNumber: "Registered with Spices Board India (CRES)",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    async function loadIntegrations() {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/integrations");
        if (res.ok) {
          const data = await res.json();
          if (data.integrations) setIntegrations((p) => ({ ...p, ...data.integrations }));
        }
      } finally {
        setLoading(false);
      }
    }
    loadIntegrations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIntegrations((p) => ({ ...p, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await fetch("/api/admin/integrations", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(integrations),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to save integrations.");

      setToast({ type: "success", message: "Integrations & external links saved successfully." });
    } catch (err) {
      setToast({ type: "error", message: err.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="Third-Party Integrations — Auronova Exports Admin">
      <AdminHeader
        badge="Integrations Hub"
        title="Third-Party Integrations & External Services"
        description="Configure commercial WhatsApp chat routing, Google Maps directions, social media platforms, and official registration notices."
        actions={
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#FAF7F0] bg-[#4A2C20] hover:bg-[#351E16] shadow-sm transition-colors disabled:opacity-50"
          >
            <Save size={14} className="text-[#D6A441]" />
            <span>{saving ? "Saving..." : "Save Integrations"}</span>
          </button>
        }
      />

      {loading ? (
        <div className="bg-white rounded-2xl p-12 text-center text-xs text-[#24251F]/60 border border-[#E8E0D2]">
          Loading integrations...
        </div>
      ) : (
        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            {/* WhatsApp Integration Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E0D2] shadow-sm space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-[#FAF7F0]">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-sm text-[#24251F]">WhatsApp Trade Desk Integration</h2>
                  <p className="text-xs text-[#24251F]/60">
                    Controls the direct WhatsApp floating chat button and quick-inquiry actions.
                  </p>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  WhatsApp Contact Number (With Country Code)
                </label>
                <input
                  type="text"
                  name="whatsappNumber"
                  value={integrations.whatsappNumber || ""}
                  onChange={handleChange}
                  placeholder="+91 94000 00000"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm font-mono text-[#24251F]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Default Prefilled Greeting
                </label>
                <textarea
                  rows={2}
                  name="whatsappPrefilledMessage"
                  value={integrations.whatsappPrefilledMessage || ""}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs text-[#24251F] resize-none"
                />
              </div>
            </div>

            {/* Google Maps Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E0D2] shadow-sm space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-[#FAF7F0]">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-sm text-[#24251F]">Google Maps Location Integration</h2>
                  <p className="text-xs text-[#24251F]/60">
                    Direct directions link and optional iframe embed code.
                  </p>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Google Maps URL (Opened when user clicks office address)
                </label>
                <input
                  type="url"
                  name="googleMapsUrl"
                  value={integrations.googleMapsUrl || ""}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs font-mono text-[#24251F]"
                />
              </div>
            </div>

            {/* Social Media Links */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E0D2] shadow-sm space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-[#FAF7F0]">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Share2 size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-sm text-[#24251F]">Social Media & Trade Profiles</h2>
                  <p className="text-xs text-[#24251F]/60">
                    Links rendered in the website footer and contact channels.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#24251F] block mb-1">
                    LinkedIn Company URL
                  </label>
                  <input
                    type="url"
                    name="linkedinUrl"
                    value={integrations.linkedinUrl || ""}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs font-mono text-[#24251F]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#24251F] block mb-1">
                    X / Twitter Profile URL
                  </label>
                  <input
                    type="url"
                    name="twitterUrl"
                    value={integrations.twitterUrl || ""}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs font-mono text-[#24251F]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Status & Guidelines */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-[#E8E0D2] shadow-sm space-y-4">
            <h2 className="font-bold text-sm text-[#4A2C20] uppercase tracking-wider">
              Verification Notice
            </h2>

            <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2] text-xs space-y-3">
              <div className="flex items-start gap-2 text-[#526747]">
                <ShieldCheck size={16} className="flex-shrink-0 mt-0.5" />
                <span className="font-semibold">Statutory Export Compliance</span>
              </div>
              <p className="text-[#24251F]/70 leading-relaxed">
                Registered merchant exporter under Spices Board of India, Kochi headquarters. All third-party links must point to official verified company pages.
              </p>
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

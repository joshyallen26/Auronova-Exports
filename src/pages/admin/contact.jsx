import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminHeader from "@/components/admin/AdminHeader";
import NotificationToast from "@/components/admin/NotificationToast";
import { Save, Phone, Mail, MapPin, Globe, Clock, Building } from "lucide-react";

export default function AdminContactPage() {
  const [form, setForm] = useState({
    companyName: "Auronova Exports Pvt. Ltd.",
    email: "exports@auronovaexports.com",
    phone: "+91 (484) 290-0000",
    whatsappNumber: "+91 94000 00000",
    whatsappPrefilledMessage: "Hello Auronova Exports, I am interested in sourcing Indian spices from your export catalogue.",
    officeAddress: "Spice Trade Centre, Cochin Port Zone, Kochi, Kerala 682 001, India",
    googleMapsUrl: "https://maps.google.com/?q=Cochin+Port+Kochi+Kerala",
    googleMapsEmbedUrl: "",
    portOfLading: "Cochin Seaport (ICTT / INCOK) & CIAL Air Cargo",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/integrations");
        if (res.ok) {
          const data = await res.json();
          if (data.integrations) setForm((p) => ({ ...p, ...data.integrations }));
        }
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await fetch("/api/admin/integrations", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to update contact details.");

      setToast({ type: "success", message: "Company contact details saved successfully." });
    } catch (err) {
      setToast({ type: "error", message: err.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="Contact Details & Head Office — Auronova Exports Admin">
      <AdminHeader
        badge="Company Profile"
        title="Contact Details & Office Location"
        description="Manage the company contact information, official emails, telephone numbers, trade desk WhatsApp lines, and registered Cochin office address."
        actions={
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#FAF7F0] bg-[#4A2C20] hover:bg-[#351E16] shadow-sm transition-colors disabled:opacity-50"
          >
            <Save size={14} className="text-[#D6A441]" />
            <span>{saving ? "Saving..." : "Save Contact Info"}</span>
          </button>
        }
      />

      {loading ? (
        <div className="bg-white rounded-2xl p-12 text-center text-xs text-[#24251F]/60 border border-[#E8E0D2]">
          Loading contact configuration...
        </div>
      ) : (
        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E0D2] shadow-sm space-y-5">
            <h2 className="font-bold text-sm text-[#4A2C20] uppercase tracking-wider">
              Official Trade Channels
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Registered Legal Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm font-semibold text-[#24251F]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Commercial Inquiries Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm text-[#24251F]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Trade Desk Telephone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm text-[#24251F]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Trade WhatsApp Number
                </label>
                <input
                  type="text"
                  name="whatsappNumber"
                  value={form.whatsappNumber}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm font-mono text-[#24251F]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#24251F] block mb-1">
                WhatsApp Default Prefilled Message
              </label>
              <textarea
                rows={2}
                name="whatsappPrefilledMessage"
                value={form.whatsappPrefilledMessage}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs text-[#24251F] resize-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#24251F] block mb-1">
                Registered Head Office Address
              </label>
              <textarea
                rows={2}
                name="officeAddress"
                value={form.officeAddress}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm text-[#24251F] resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Google Maps Location Link
                </label>
                <input
                  type="url"
                  name="googleMapsUrl"
                  value={form.googleMapsUrl}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs font-mono text-[#24251F]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Primary Port of Lading Information
                </label>
                <input
                  type="text"
                  name="portOfLading"
                  value={form.portOfLading}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs text-[#24251F]"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-[#E8E0D2] shadow-sm space-y-4">
            <h2 className="font-bold text-sm text-[#4A2C20] uppercase tracking-wider">
              Live Preview Summary
            </h2>

            <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2] space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <Building size={15} className="text-[#D6A441] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#24251F] block">{form.companyName}</span>
                  <span className="text-[11px] text-[#24251F]/70 block mt-0.5 leading-relaxed">
                    {form.officeAddress}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-2 border-t border-[#E8E0D2]">
                <Mail size={15} className="text-[#D6A441] flex-shrink-0" />
                <span className="font-medium text-[#526747]">{form.email}</span>
              </div>

              <div className="flex items-center gap-2.5 pt-2 border-t border-[#E8E0D2]">
                <Phone size={15} className="text-[#D6A441] flex-shrink-0" />
                <span className="font-medium text-[#24251F]">{form.phone}</span>
              </div>

              <div className="pt-2 border-t border-[#E8E0D2]">
                <span className="text-[10px] text-[#24251F]/50 block">Primary Port of Lading:</span>
                <span className="text-xs font-semibold text-[#24251F] block mt-0.5">
                  {form.portOfLading}
                </span>
              </div>
            </div>

            <div className="text-[11px] text-[#24251F]/60 leading-relaxed">
              Updating these details dynamically updates the public website header, footer, contact page, and inquiry receipts.
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

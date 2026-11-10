import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminHeader from "@/components/admin/AdminHeader";
import NotificationToast from "@/components/admin/NotificationToast";
import { Save, ShieldCheck, Plus, Trash2, CheckCircle2, AlertCircle, Info, ExternalLink } from "lucide-react";

export default function AdminCredentialsPage() {
  const [data, setData] = useState({
    eyebrow: "Statutory Export Compliance & Verification",
    headline: "Business Registrations & Export Credentials",
    description:
      "Auronova Exports conducts trade in strict adherence with statutory Indian export authorities. Displayed credentials reflect verified registrations and official export capabilities issued per commercial consignment.",
    items: [],
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    async function loadCredentials() {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/content?section=business_credentials");
        if (res.ok) {
          const json = await res.json();
          if (json.data?.content) setData(json.data.content);
        }
      } finally {
        setLoading(false);
      }
    }
    loadCredentials();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sectionKey: "business_credentials",
          page: "certifications",
          data,
        }),
      });
      const resData = await res.json();
      if (!res.ok || !resData.success) throw new Error(resData.message || "Failed to save credentials.");

      setToast({ type: "success", message: "Business registrations and credentials saved successfully." });
    } catch (err) {
      setToast({ type: "error", message: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...(data.items || [])];
    updated[index] = { ...updated[index], [field]: value };
    setData({ ...data, items: updated });
  };

  const handleToggleVerified = (index) => {
    const updated = [...(data.items || [])];
    updated[index] = { ...updated[index], isVerified: !updated[index].isVerified };
    setData({ ...data, items: updated });
  };

  const handleAddItem = () => {
    const newItem = {
      id: `cred_${Date.now()}`,
      name: "New Statutory Registration",
      authority: "Government / Statutory Authority",
      capability: "Export Capability",
      status: "Verified Capability",
      registrationNumber: "[Registration details editable via Admin CMS]",
      description: "Description of official regulatory alignment and statutory export compliance.",
      isVerified: true,
    };
    setData({ ...data, items: [...(data.items || []), newItem] });
  };

  const handleDeleteItem = (index) => {
    const updated = (data.items || []).filter((_, i) => i !== index);
    setData({ ...data, items: updated });
  };

  return (
    <AdminLayout title="Export Credentials & Registrations — Auronova Exports Admin">
      <AdminHeader
        badge="Regulatory Compliance"
        title="Business Registrations & Export Credentials"
        description="Manage APEDA, Spices Board of India, FSSAI, Certificate of Origin, and Phytosanitary verification settings. Control verified display status without inventing unverified registration numbers."
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={handleAddItem}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#24251F] bg-white border border-[#E8E0D2] hover:bg-[#FAF7F0] transition-colors"
            >
              <Plus size={14} className="text-[#526747]" />
              <span>Add Credential</span>
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#FAF7F0] bg-[#4A2C20] hover:bg-[#351E16] shadow-sm transition-colors disabled:opacity-50"
            >
              <Save size={14} className="text-[#D6A441]" />
              <span>{saving ? "Saving..." : "Save Credentials"}</span>
            </button>
          </div>
        }
      />

      {loading ? (
        <div className="bg-white rounded-2xl p-12 text-center text-xs text-[#24251F]/60 border border-[#E8E0D2]">
          Loading business credentials...
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {/* Header Info Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E0D2] shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#4A2C20] uppercase tracking-wider">
              <ShieldCheck size={16} />
              <span>Credentials Section Header</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Section Headline
                </label>
                <input
                  type="text"
                  value={data.headline}
                  onChange={(e) => setData({ ...data, headline: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm font-semibold text-[#24251F]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Eyebrow Label
                </label>
                <input
                  type="text"
                  value={data.eyebrow}
                  onChange={(e) => setData({ ...data, eyebrow: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm text-[#24251F]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#24251F] block mb-1">
                Section Overview Description
              </label>
              <textarea
                rows={2}
                value={data.description}
                onChange={(e) => setData({ ...data, description: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm text-[#24251F] resize-none"
              />
            </div>
          </div>

          {/* Credentials Items List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#4A2C20]">
                Verified Credentials & Authorities ({data.items?.length || 0})
              </h2>
              <span className="text-xs text-[#8C7F73]">
                Items toggleable for public display
              </span>
            </div>

            {data.items?.map((item, idx) => (
              <div
                key={item.id || idx}
                className={`p-6 rounded-2xl border transition-all ${
                  item.isVerified !== false
                    ? "bg-white border-[#E8E0D2] shadow-sm"
                    : "bg-gray-50 border-gray-200 opacity-60"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E0D2]">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-[#4A2C20]/10 text-[#4A2C20] font-bold text-xs flex items-center justify-center font-mono">
                      0{idx + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-base text-[#24251F]">
                        {item.name}
                      </h3>
                      <span className="text-xs text-[#8C7F73]">{item.authority}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleToggleVerified(idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                        item.isVerified !== false
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      <CheckCircle2 size={13} />
                      <span>{item.isVerified !== false ? "Verified (Active)" : "Hidden"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteItem(idx)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete credential"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <div>
                    <label className="text-xs font-semibold text-[#24251F] block mb-1">
                      Organization / Credential Name
                    </label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleItemChange(idx, "name", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#E8E0D2] bg-[#FAF7F0] text-xs font-bold text-[#24251F]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#24251F] block mb-1">
                      Statutory Authority / Ministry
                    </label>
                    <input
                      type="text"
                      value={item.authority}
                      onChange={(e) => handleItemChange(idx, "authority", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#E8E0D2] bg-[#FAF7F0] text-xs text-[#24251F]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#24251F] block mb-1">
                      Status Label (e.g. Verified Capability)
                    </label>
                    <input
                      type="text"
                      value={item.status}
                      onChange={(e) => handleItemChange(idx, "status", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#E8E0D2] bg-[#FAF7F0] text-xs text-[#24251F]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#24251F] block mb-1">
                      Capability Description
                    </label>
                    <input
                      type="text"
                      value={item.capability}
                      onChange={(e) => handleItemChange(idx, "capability", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#E8E0D2] bg-[#FAF7F0] text-xs text-[#24251F]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-[#24251F] block mb-1">
                      Registration Reference / Proforma Note (Placeholder)
                    </label>
                    <input
                      type="text"
                      value={item.registrationNumber}
                      onChange={(e) => handleItemChange(idx, "registrationNumber", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#E8E0D2] bg-[#FAF7F0] text-xs text-[#24251F]"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="text-xs font-semibold text-[#24251F] block mb-1">
                      Full Scope & Mandate Description
                    </label>
                    <textarea
                      rows={2}
                      value={item.description}
                      onChange={(e) => handleItemChange(idx, "description", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#E8E0D2] bg-[#FAF7F0] text-xs text-[#24251F] resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Verification Notice */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
            <Info size={16} className="text-amber-700 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Credibility Rule:</strong> The public site displays only credentials marked as &quot;Verified (Active)&quot;. Do not invent registration numbers or claim certifications that the company does not hold.
            </p>
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


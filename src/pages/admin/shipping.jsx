import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminHeader from "@/components/admin/AdminHeader";
import NotificationToast from "@/components/admin/NotificationToast";
import { Save, Ship, Package, Clock, Anchor, Plus, Trash2, CheckCircle2 } from "lucide-react";

export default function AdminShippingPage() {
  const [data, setData] = useState({
    incoterms: [],
    moq: {
      lcl: "500 kg to 3,000 kg (palletized export packaging for commercial trial validation)",
      fcl20: "14 to 15 Metric Tonnes (~20ft FCL container, commodity-dependent)",
      fcl40: "25 to 27 Metric Tonnes (~40ft FCL container for large-scale industrial bulk)",
      sample: "200g to 1kg representative sample packs for qualified commercial buyers",
      notes: "Minimum order quantities are negotiable based on commodity value, seasonal availability, and contract duration.",
    },
    leadTimes: {
      samples: "48 to 72 business hours for courier handover",
      lcl: "7 to 10 working days from PO confirmation to port gate-in",
      fcl: "10 to 18 working days from PO confirmation to container loading and bill of lading issuance",
      transitNotes: "Ocean transit times vary by destination: GCC / Middle East: 4–8 days; Europe: 18–24 days; Americas: 24–32 days.",
    },
    samplePolicy: {
      headline: "International Commercial Sample Policy",
      desc: "We supply representative harvest sample kits to verified food manufacturers, wholesale importers, and institutional buyers. Samples are packed in airtight barrier pouches with complete batch specifications and dispatched via DHL or FedEx air courier.",
      terms: "Samples are complimentary for qualified commercial buyers; international courier tariffs may apply for initial exploratory inquiries.",
    },
    portsOverview: {
      headline: "Kerala's Maritime Infrastructure & Port Operations",
      cochinHighlight: "Cochin Port (ICTT Vallarpadam / INCOK) is the sole Central Major Port in Kerala and serves as our dedicated, operational commercial gateway for all international maritime containerized spice cargo.",
      nonMajorNotice: "The 17 state-notified non-major ports administered by the Kerala Maritime Board (including Vizhinjam, Beypore, Kollam, and Azhikkal) represent coastal, riverine, and developing maritime infrastructure. Auronova Exports does not claim that all Kerala ports handle spice cargo; international ocean container shipments are routed exclusively through Cochin Seaport and CIAL Air Cargo.",
    },
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    async function loadShipping() {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/content?section=shipping_pricing");
        if (res.ok) {
          const json = await res.json();
          if (json.data?.content) setData(json.data.content);
        }
      } finally {
        setLoading(false);
      }
    }
    loadShipping();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sectionKey: "shipping_pricing",
          page: "shipping",
          data,
        }),
      });
      const resData = await res.json();
      if (!res.ok || !resData.success) throw new Error(resData.message || "Failed to save shipping terms.");

      setToast({ type: "success", message: "Shipping & pricing guidelines saved successfully." });
    } catch (err) {
      setToast({ type: "error", message: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleIncotermChange = (index, field, val) => {
    const updated = [...(data.incoterms || [])];
    updated[index] = { ...updated[index], [field]: val };
    setData({ ...data, incoterms: updated });
  };

  return (
    <AdminLayout title="Shipping & Pricing CMS — Auronova Exports Admin">
      <AdminHeader
        badge="Logistics CMS"
        title="Shipping, Incoterms, MOQ & Packaging"
        description="Configure commercial Incoterms (FOB Cochin, CIF, CFR, Air Cargo), Minimum Order Quantities (MOQ), operational lead times, and sample policies."
        actions={
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#FAF7F0] bg-[#4A2C20] hover:bg-[#351E16] shadow-sm transition-colors disabled:opacity-50"
          >
            <Save size={14} className="text-[#D6A441]" />
            <span>{saving ? "Saving..." : "Save Shipping Settings"}</span>
          </button>
        }
      />

      {loading ? (
        <div className="bg-white rounded-2xl p-12 text-center text-xs text-[#24251F]/60 border border-[#E8E0D2]">
          Loading shipping & pricing configuration...
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-8">
          {/* MOQ Guidance */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E0D2] shadow-sm space-y-4">
            <h2 className="font-bold text-sm text-[#4A2C20] uppercase tracking-wider flex items-center gap-2">
              <Package size={16} />
              <span>Minimum Order Quantity (MOQ) Guidance</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  LCL Palletized Trial Orders
                </label>
                <input
                  type="text"
                  value={data.moq?.lcl || ""}
                  onChange={(e) =>
                    setData({ ...data, moq: { ...data.moq, lcl: e.target.value } })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm text-[#24251F]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  20ft Full Container Load (FCL)
                </label>
                <input
                  type="text"
                  value={data.moq?.fcl20 || ""}
                  onChange={(e) =>
                    setData({ ...data, moq: { ...data.moq, fcl20: e.target.value } })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm text-[#24251F]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  40ft Full Container Load (FCL)
                </label>
                <input
                  type="text"
                  value={data.moq?.fcl40 || ""}
                  onChange={(e) =>
                    setData({ ...data, moq: { ...data.moq, fcl40: e.target.value } })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm text-[#24251F]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Representative Sample Kits
                </label>
                <input
                  type="text"
                  value={data.moq?.sample || ""}
                  onChange={(e) =>
                    setData({ ...data, moq: { ...data.moq, sample: e.target.value } })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm text-[#24251F]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  MOQ Negotiation & Flexibility Notes
                </label>
                <input
                  type="text"
                  value={data.moq?.notes || ""}
                  onChange={(e) =>
                    setData({ ...data, moq: { ...data.moq, notes: e.target.value } })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm text-[#24251F]"
                />
              </div>
            </div>
          </div>

          {/* Operational Lead Times */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E0D2] shadow-sm space-y-4">
            <h2 className="font-bold text-sm text-[#4A2C20] uppercase tracking-wider flex items-center gap-2">
              <Clock size={16} />
              <span>Operational Lead Times & Dispatch Schedules</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Sample Courier Dispatch
                </label>
                <input
                  type="text"
                  value={data.leadTimes?.samples || ""}
                  onChange={(e) =>
                    setData({ ...data, leadTimes: { ...data.leadTimes, samples: e.target.value } })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm text-[#24251F]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  LCL Palletized Dispatch
                </label>
                <input
                  type="text"
                  value={data.leadTimes?.lcl || ""}
                  onChange={(e) =>
                    setData({ ...data, leadTimes: { ...data.leadTimes, lcl: e.target.value } })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm text-[#24251F]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  FCL Container Stuffing
                </label>
                <input
                  type="text"
                  value={data.leadTimes?.fcl || ""}
                  onChange={(e) =>
                    setData({ ...data, leadTimes: { ...data.leadTimes, fcl: e.target.value } })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm text-[#24251F]"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Ocean Transit Estimates Notes
                </label>
                <input
                  type="text"
                  value={data.leadTimes?.transitNotes || ""}
                  onChange={(e) =>
                    setData({ ...data, leadTimes: { ...data.leadTimes, transitNotes: e.target.value } })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm text-[#24251F]"
                />
              </div>
            </div>
          </div>

          {/* Sample Policy */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E0D2] shadow-sm space-y-4">
            <h2 className="font-bold text-sm text-[#4A2C20] uppercase tracking-wider flex items-center gap-2">
              <Package size={16} />
              <span>International Sample Policy</span>
            </h2>

            <div>
              <label className="text-xs font-semibold text-[#24251F] block mb-1">
                Headline
              </label>
              <input
                type="text"
                value={data.samplePolicy?.headline || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    samplePolicy: { ...data.samplePolicy, headline: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm font-semibold text-[#24251F]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#24251F] block mb-1">
                Description
              </label>
              <textarea
                rows={2}
                value={data.samplePolicy?.desc || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    samplePolicy: { ...data.samplePolicy, desc: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm text-[#24251F] resize-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#24251F] block mb-1">
                Commercial Terms & Tariff Note
              </label>
              <input
                type="text"
                value={data.samplePolicy?.terms || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    samplePolicy: { ...data.samplePolicy, terms: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm text-[#24251F]"
              />
            </div>
          </div>

          {/* Incoterms Items List */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E0D2] shadow-sm space-y-4">
            <h2 className="font-bold text-sm text-[#4A2C20] uppercase tracking-wider flex items-center gap-2">
              <Ship size={16} />
              <span>Commercial Incoterms ({data.incoterms?.length || 0})</span>
            </h2>

            <div className="space-y-4">
              {data.incoterms?.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2] space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-[#24251F] block mb-1">
                        Incoterm Code
                      </label>
                      <input
                        type="text"
                        value={item.term}
                        onChange={(e) => handleIncotermChange(idx, "term", e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-[#E8E0D2] bg-white text-xs font-bold text-[#24251F]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold text-[#24251F] block mb-1">
                        Full Name / Location
                      </label>
                      <input
                        type="text"
                        value={item.fullName}
                        onChange={(e) => handleIncotermChange(idx, "fullName", e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-[#E8E0D2] bg-white text-xs text-[#24251F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#24251F] block mb-1">
                      Scope of Responsibility
                    </label>
                    <textarea
                      rows={2}
                      value={item.desc}
                      onChange={(e) => handleIncotermChange(idx, "desc", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#E8E0D2] bg-white text-xs text-[#24251F] resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#24251F] block mb-1">
                      Recommended Buyer Profile
                    </label>
                    <input
                      type="text"
                      value={item.idealFor}
                      onChange={(e) => handleIncotermChange(idx, "idealFor", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#E8E0D2] bg-white text-xs text-[#24251F]"
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


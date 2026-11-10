import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminHeader from "@/components/admin/AdminHeader";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import NotificationToast from "@/components/admin/NotificationToast";
import {
  Mail,
  Phone,
  Building,
  Globe,
  Clock,
  Search,
  Filter,
  CheckCircle2,
  Trash2,
  Eye,
  MessageSquare,
  ExternalLink,
  X,
  Send,
  Save,
} from "lucide-react";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [savingNotes, setSavingNotes] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState(null);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const url = statusFilter === "all" ? "/api/admin/enquiries" : `/api/admin/enquiries?status=${statusFilter}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data.enquiries || []);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter]);

  const filteredEnquiries = enquiries.filter((e) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      e.name?.toLowerCase().includes(q) ||
      e.email?.toLowerCase().includes(q) ||
      e.company?.toLowerCase().includes(q) ||
      e.country?.toLowerCase().includes(q) ||
      e.product?.toLowerCase().includes(q)
    );
  });

  const handleUpdateStatus = async (enquiryId, newStatus) => {
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: enquiryId, status: newStatus }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((item) => (item._id === enquiryId ? { ...item, status: newStatus } : item))
        );
        if (selectedEnquiry && selectedEnquiry._id === enquiryId) {
          setSelectedEnquiry((prev) => ({ ...prev, status: newStatus }));
        }
        setToast({ type: "success", message: `Status updated to ${newStatus}.` });
      }
    } catch (err) {
      setToast({ type: "error", message: "Failed to update status." });
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    try {
      setSavingNotes(true);
      const res = await fetch("/api/admin/enquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedEnquiry._id,
          notes: selectedEnquiry.notes,
          status: selectedEnquiry.status,
        }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((item) =>
            item._id === selectedEnquiry._id ? { ...item, notes: selectedEnquiry.notes } : item
          )
        );
        setToast({ type: "success", message: "Internal trade notes saved." });
      }
    } catch (err) {
      setToast({ type: "error", message: "Failed to save notes." });
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDeleteEnquiry = async () => {
    if (!deleteTarget) return;
    try {
      setDeleting(true);
      const res = await fetch(`/api/admin/enquiries?id=${deleteTarget._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setEnquiries((prev) => prev.filter((item) => item._id !== deleteTarget._id));
        if (selectedEnquiry?._id === deleteTarget._id) {
          setSelectedEnquiry(null);
        }
        setToast({ type: "success", message: "Enquiry record deleted." });
      }
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "new":
        return "bg-[#D6A441] text-[#24251F]";
      case "contacted":
        return "bg-blue-100 text-blue-800";
      case "in_progress":
        return "bg-[#526747]/15 text-[#526747]";
      case "closed":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <AdminLayout title="Export Enquiries & RFQ — Auronova Exports Admin">
      <AdminHeader
        badge="Commercial Desk"
        title="Commercial Trade Enquiries & RFQ"
        description="Review inbound export quotation requests, manage lead status, assign internal trade notes, and directly contact overseas buyers."
      />

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8E0D2] shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Status Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: "all", label: "All Enquiries" },
            { id: "new", label: "New Leads" },
            { id: "contacted", label: "Contacted" },
            { id: "in_progress", label: "In Review" },
            { id: "closed", label: "Completed" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === tab.id
                  ? "bg-[#4A2C20] text-[#FAF7F0] shadow-sm"
                  : "bg-[#FAF7F0] text-[#24251F]/70 hover:bg-[#E8E0D2] hover:text-[#24251F]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#24251F]/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by buyer, company, country..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
          />
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white rounded-2xl border border-[#E8E0D2] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF7F0] text-[11px] font-bold uppercase tracking-wider text-[#4A2C20] border-b border-[#E8E0D2]">
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Buyer & Company</th>
                <th className="py-3.5 px-4">Country</th>
                <th className="py-3.5 px-4">Spice Product & Volume</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E0D2]/60 text-xs">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#24251F]/60">
                    Loading commercial enquiries...
                  </td>
                </tr>
              ) : filteredEnquiries.length > 0 ? (
                filteredEnquiries.map((enq) => (
                  <tr
                    key={enq._id}
                    onClick={() => setSelectedEnquiry(enq)}
                    className="hover:bg-[#FAF7F0]/60 transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-4 text-[#24251F]/60 whitespace-nowrap">
                      {new Date(enq.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-bold text-sm text-[#24251F] group-hover:text-[#4A2C20]">
                        {enq.name}
                      </div>
                      <div className="text-[11px] text-[#24251F]/60 mt-0.5">
                        {enq.company ? `${enq.company} · ` : ""}
                        <span className="text-[#526747] font-medium">{enq.email}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-medium text-[#24251F]/80">
                      {enq.country || "—"}
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-semibold text-[#4A2C20] block">
                        {enq.product || "General Enquiry"}
                      </span>
                      {enq.volume && (
                        <span className="text-[11px] text-[#24251F]/60 block mt-0.5">
                          Volume: {enq.volume}
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={enq.status || "new"}
                        onChange={(e) => handleUpdateStatus(enq._id, e.target.value)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border-none focus:ring-1 focus:ring-[#D6A441] cursor-pointer ${getStatusBadge(
                          enq.status || "new"
                        )}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="in_progress">In Review</option>
                        <option value="closed">Completed</option>
                      </select>
                    </td>

                    <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => setSelectedEnquiry(enq)}
                          className="p-1.5 rounded-lg text-[#526747] hover:bg-[#FAF7F0] transition-colors"
                          title="View full enquiry details"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(enq)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                          title="Delete enquiry record"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#24251F]/60">
                    No enquiries found. Submissions from the website will appear here in real time.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-[#FAF7F0] border-t border-[#E8E0D2] flex items-center justify-between text-xs text-[#24251F]/70">
          <span>
            Total: <strong>{filteredEnquiries.length}</strong> enquiries
          </span>
          <span className="text-[11px] text-[#526747]">
            All enquiries are permanently persisted in MongoDB and storage.
          </span>
        </div>
      </div>

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 border border-[#E8E0D2] shadow-2xl relative my-8 space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-[#E8E0D2]">
              <div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusBadge(
                    selectedEnquiry.status || "new"
                  )}`}
                >
                  {selectedEnquiry.status || "new"}
                </span>
                <h3 className="font-bold text-xl text-[#24251F] mt-2">
                  {selectedEnquiry.name}
                </h3>
                <p className="text-xs text-[#24251F]/60">
                  Received on {new Date(selectedEnquiry.createdAt).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1 text-[#24251F]/40 hover:text-[#24251F]"
              >
                <X size={18} />
              </button>
            </div>

            {/* Buyer Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FAF7F0] p-4 rounded-xl border border-[#E8E0D2] text-xs">
              <div>
                <span className="text-[#24251F]/60 block">Company Name:</span>
                <span className="font-semibold text-[#24251F] block mt-0.5">
                  {selectedEnquiry.company || "Not specified"}
                </span>
              </div>
              <div>
                <span className="text-[#24251F]/60 block">Destination Country:</span>
                <span className="font-semibold text-[#24251F] block mt-0.5">
                  {selectedEnquiry.country || "Not specified"}
                </span>
              </div>
              <div>
                <span className="text-[#24251F]/60 block">Email Address:</span>
                <a
                  href={`mailto:${selectedEnquiry.email}`}
                  className="font-semibold text-[#526747] hover:underline block mt-0.5"
                >
                  {selectedEnquiry.email}
                </a>
              </div>
              <div>
                <span className="text-[#24251F]/60 block">Phone / WhatsApp:</span>
                <span className="font-semibold text-[#24251F] block mt-0.5">
                  {selectedEnquiry.phone || "Not provided"}
                </span>
              </div>
              <div>
                <span className="text-[#24251F]/60 block">Requested Commodity / Products:</span>
                <span className="font-semibold text-[#4A2C20] block mt-0.5">
                  {Array.isArray(selectedEnquiry.products) && selectedEnquiry.products.length > 0
                    ? selectedEnquiry.products.join(", ")
                    : selectedEnquiry.product}
                </span>
              </div>
              <div>
                <span className="text-[#24251F]/60 block">Quantity & Incoterm:</span>
                <span className="font-semibold text-[#24251F] block mt-0.5">
                  {selectedEnquiry.volume || "General Container"}{" "}
                  {selectedEnquiry.incoterm ? `· Term: ${selectedEnquiry.incoterm}` : ""}
                </span>
              </div>
            </div>

            {/* Uploaded Specification File */}
            {selectedEnquiry.fileAttachmentUrl && (
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5 truncate">
                  <FileText size={20} className="text-[#4A2C20] flex-shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-[#24251F] block">
                      Buyer Specification File Attached
                    </span>
                    <span className="text-[11px] text-[#4A2C20]/80 truncate block">
                      {selectedEnquiry.fileAttachmentName || "Specification Document"}
                    </span>
                  </div>
                </div>
                <a
                  href={selectedEnquiry.fileAttachmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-[#FAF7F0] bg-[#4A2C20] hover:bg-[#351E16] shadow-sm transition-colors flex-shrink-0"
                >
                  <ExternalLink size={13} className="text-[#D6A441]" />
                  <span>Download / View File</span>
                </a>
              </div>
            )}

            {/* Customer Message */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#4A2C20] block mb-1.5">
                Buyer Message / Commercial Specifications:
              </span>
              <div className="p-4 rounded-xl bg-white border border-[#E8E0D2] text-xs sm:text-sm text-[#24251F] leading-relaxed whitespace-pre-wrap">
                {selectedEnquiry.message || "No custom message provided."}
              </div>
            </div>

            {/* Internal Trade Notes */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#4A2C20] block mb-1.5">
                Internal Trade Desk Notes:
              </label>
              <textarea
                rows={3}
                value={selectedEnquiry.notes || ""}
                onChange={(e) =>
                  setSelectedEnquiry({ ...selectedEnquiry, notes: e.target.value })
                }
                placeholder="Log internal notes (e.g. quote sent on 4th Nov, sample courier dispatched via DHL)..."
                className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441] resize-none"
              />
            </div>

            {/* Footer Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#E8E0D2]">
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selectedEnquiry.email}?subject=Auronova Exports — Quotation for ${encodeURIComponent(
                    selectedEnquiry.product || "Spices"
                  )}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#24251F] bg-[#FAF7F0] border border-[#E8E0D2] hover:bg-[#E8E0D2] transition-colors"
                >
                  <Mail size={13} className="text-[#526747]" />
                  <span>Reply via Email</span>
                </a>

                {selectedEnquiry.phone && (
                  <a
                    href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                  >
                    <Send size={13} />
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  disabled={savingNotes}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-[#FAF7F0] bg-[#4A2C20] hover:bg-[#351E16] shadow-sm transition-colors disabled:opacity-50"
                >
                  <Save size={14} className="text-[#D6A441]" />
                  <span>{savingNotes ? "Saving..." : "Save Notes"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Enquiry Record?"
        message={`Are you sure you want to permanently remove the enquiry from ${deleteTarget?.name}?`}
        confirmLabel="Confirm Delete"
        confirmVariant="danger"
        loading={deleting}
        onConfirm={handleDeleteEnquiry}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* Toast Notification */}
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

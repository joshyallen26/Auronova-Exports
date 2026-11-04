import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminHeader from "@/components/admin/AdminHeader";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import NotificationToast from "@/components/admin/NotificationToast";
import {
  Anchor,
  Ship,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Filter,
  Search,
  ExternalLink,
  Shield,
  Save,
  X,
} from "lucide-react";

export default function AdminPortsPage() {
  const [ports, setPorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [classificationFilter, setClassificationFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingPort, setEditingPort] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState(null);

  const fetchPorts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/ports");
      if (res.ok) {
        const data = await res.json();
        setPorts(data.ports || []);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPorts();
  }, []);

  const filteredPorts = ports.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.district?.toLowerCase().includes(search.toLowerCase()) ||
      p.details?.toLowerCase().includes(search.toLowerCase());

    const matchClass =
      classificationFilter === "all" || p.classification === classificationFilter;

    const matchStatus =
      statusFilter === "all" ||
      (statusFilter === "operational" && p.status?.toLowerCase().includes("operational")) ||
      (statusFilter === "development" && p.status?.toLowerCase().includes("development")) ||
      (statusFilter === "inactive" && p.status?.toLowerCase().includes("inactive"));

    return matchSearch && matchClass && matchStatus;
  });

  const openNewModal = () => {
    setEditingPort({
      name: "",
      classification: "Notified Non-Major Port",
      status: "Operational",
      district: "Kerala",
      type: "Coastal port facility",
      details: "",
      spiceExportRole: "Part of Kerala's notified maritime infrastructure.",
      isPublished: true,
      sortOrder: ports.length,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (port) => {
    setEditingPort({ ...port });
    setIsModalOpen(true);
  };

  const handleSavePort = async (e) => {
    e.preventDefault();
    setSaving(true);
    const isNew = !editingPort._id;
    const url = isNew ? "/api/admin/ports" : `/api/admin/ports/${editingPort._id || editingPort.slug}`;
    const method = isNew ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPort),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to save port.");

      await fetchPorts();
      setIsModalOpen(false);
      setToast({ type: "success", message: `Port "${editingPort.name}" saved successfully.` });
    } catch (err) {
      setToast({ type: "error", message: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePort = async () => {
    if (!deleteTarget) return;
    try {
      setDeleting(true);
      const res = await fetch(`/api/admin/ports/${deleteTarget._id || deleteTarget.slug}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPorts((prev) => prev.filter((p) => p._id !== deleteTarget._id && p.slug !== deleteTarget.slug));
        setToast({ type: "success", message: `Port "${deleteTarget.name}" removed.` });
      } else {
        setToast({ type: "error", message: "Failed to delete port." });
      }
    } catch (e) {
      setToast({ type: "error", message: e.message });
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const togglePublish = async (port) => {
    const nextPublished = !port.isPublished;
    try {
      const res = await fetch(`/api/admin/ports/${port._id || port.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...port, isPublished: nextPublished }),
      });
      if (res.ok) {
        setPorts((prev) =>
          prev.map((p) =>
            (p._id && p._id === port._id) || p.slug === port.slug
              ? { ...p, isPublished: nextPublished }
              : p
          )
        );
        setToast({
          type: "success",
          message: `${port.name} is now ${nextPublished ? "published" : "hidden"}.`,
        });
      }
    } catch (e) {
      setToast({ type: "error", message: "Failed to update publish state." });
    }
  };

  return (
    <AdminLayout title="Kerala Ports Management — Auronova Exports Admin">
      <AdminHeader
        badge="Maritime CMS"
        title="Kerala Ports & Export Infrastructure (18 Ports)"
        description="Manage verified port records across Kerala's coastline: 1 Major Port (Cochin Port) and 17 Notified Non-Major Ports under Kerala Maritime Board."
        actions={
          <button
            onClick={openNewModal}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#FAF7F0] bg-[#4A2C20] hover:bg-[#351E16] shadow-sm transition-colors"
          >
            <Plus size={15} className="text-[#D6A441]" />
            <span>Add Port Record</span>
          </button>
        }
      />

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8E0D2] shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#24251F]/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ports by name, district, or type..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={classificationFilter}
            onChange={(e) => setClassificationFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs font-medium text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
          >
            <option value="all">Classification: All</option>
            <option value="Major Port">1 Major Port (Cochin)</option>
            <option value="Notified Non-Major Port">17 Non-Major Ports</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs font-medium text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
          >
            <option value="all">Status: All</option>
            <option value="operational">Operational</option>
            <option value="development">Under Development</option>
            <option value="inactive">Inactive / Heritage</option>
          </select>
        </div>
      </div>

      {/* Ports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          <div className="col-span-full py-16 text-center text-[#24251F]/60">
            Loading port infrastructure data...
          </div>
        ) : filteredPorts.length > 0 ? (
          filteredPorts.map((port) => {
            const isMajor = port.classification === "Major Port";
            return (
              <div
                key={port._id || port.slug || port.name}
                className={`bg-white rounded-2xl p-5 border shadow-sm transition-all flex flex-col justify-between ${
                  isMajor
                    ? "border-[#D6A441] ring-2 ring-[#D6A441]/20"
                    : "border-[#E8E0D2] hover:border-[#D6A441]/50"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        isMajor
                          ? "bg-[#D6A441] text-[#24251F]"
                          : "bg-[#526747]/10 text-[#526747]"
                      }`}
                    >
                      {port.classification}
                    </span>

                    <button
                      onClick={() => togglePublish(port)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition-colors ${
                        port.isPublished !== false
                          ? "bg-[#526747]/10 text-[#526747]"
                          : "bg-gray-100 text-gray-500"
                      }`}
                      title="Toggle published status"
                    >
                      {port.isPublished !== false ? "Published" : "Draft"}
                    </button>
                  </div>

                  <h3 className="font-bold text-lg text-[#24251F] flex items-center gap-2">
                    <Anchor size={17} className={isMajor ? "text-[#D6A441]" : "text-[#526747]"} />
                    <span>{port.name}</span>
                  </h3>

                  <div className="text-[11px] font-semibold text-[#4A2C20] mt-1 mb-2">
                    {port.district} District · <span className="text-[#24251F]/70">{port.status}</span>
                  </div>

                  <p className="text-xs text-[#24251F]/80 leading-relaxed mb-3">
                    {port.details}
                  </p>

                  <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2] text-[11px] text-[#526747] font-medium leading-relaxed">
                    <strong>Export Role:</strong> {port.spiceExportRole}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#FAF7F0] flex items-center justify-between">
                  <span className="text-[10px] text-[#24251F]/50">
                    Type: {port.type ? port.type.split(" ")[0] : "Coastal"}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(port)}
                      className="p-1.5 rounded-lg text-[#526747] hover:bg-[#FAF7F0] transition-colors"
                      title="Edit port details"
                    >
                      <Edit size={14} />
                    </button>
                    {!isMajor && (
                      <button
                        onClick={() => setDeleteTarget(port)}
                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                        title="Delete port"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-16 text-center text-[#24251F]/60">
            No ports match your filters.
          </div>
        )}
      </div>

      {/* Edit / Add Port Modal */}
      {isModalOpen && editingPort && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 border border-[#E8E0D2] shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E0D2] mb-5">
              <h3 className="font-bold text-lg text-[#24251F]">
                {editingPort._id ? `Edit: ${editingPort.name}` : "Add New Port Record"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-[#24251F]/40 hover:text-[#24251F]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSavePort} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#24251F] block mb-1">
                    Port Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPort.name}
                    onChange={(e) => setEditingPort({ ...editingPort, name: e.target.value })}
                    placeholder="e.g. Beypore Port"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#24251F] block mb-1">
                    District *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPort.district}
                    onChange={(e) => setEditingPort({ ...editingPort, district: e.target.value })}
                    placeholder="e.g. Kozhikode"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#24251F] block mb-1">
                    Classification *
                  </label>
                  <select
                    value={editingPort.classification}
                    onChange={(e) => setEditingPort({ ...editingPort, classification: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs font-semibold text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
                  >
                    <option value="Notified Non-Major Port">Notified Non-Major Port</option>
                    <option value="Major Port">Major Port</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#24251F] block mb-1">
                    Operational Status *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPort.status}
                    onChange={(e) => setEditingPort({ ...editingPort, status: e.target.value })}
                    placeholder="e.g. Operational / Coastal Cargo"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Port Type & Physical Facility
                </label>
                <input
                  type="text"
                  value={editingPort.type}
                  onChange={(e) => setEditingPort({ ...editingPort, type: e.target.value })}
                  placeholder="e.g. Riverine coastal cargo port & historic trading wharf"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Infrastructure & Operational Details *
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingPort.details}
                  onChange={(e) => setEditingPort({ ...editingPort, details: e.target.value })}
                  placeholder="Describe berth capability, cargo operations, and historical or commercial importance..."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441] resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Spice Trade / Export Context *
                </label>
                <input
                  type="text"
                  required
                  value={editingPort.spiceExportRole}
                  onChange={(e) => setEditingPort({ ...editingPort, spiceExportRole: e.target.value })}
                  placeholder="e.g. Primary commercial gateway used for maritime spice export shipments from Kerala."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8E0D2]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#24251F] hover:bg-[#FAF7F0] border border-[#E8E0D2]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-[#FAF7F0] bg-[#4A2C20] hover:bg-[#351E16] shadow-sm transition-colors disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Port"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title={`Delete "${deleteTarget?.name}"?`}
        message="Are you sure you want to remove this port record? You can re-add it or reset to default ports at any time."
        confirmLabel="Confirm Delete"
        confirmVariant="danger"
        loading={deleting}
        onConfirm={handleDeletePort}
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

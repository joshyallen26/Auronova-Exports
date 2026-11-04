import { useState, useEffect } from "react";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminHeader from "@/components/admin/AdminHeader";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import NotificationToast from "@/components/admin/NotificationToast";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  ExternalLink,
  Eye,
  CheckCircle2,
  XCircle,
  Package,
} from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || []);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = [
    "all",
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  const filteredProducts = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.botanicalName?.toLowerCase().includes(search.toLowerCase()) ||
      p.origin?.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      categoryFilter === "all" || p.category === categoryFilter;

    const matchStatus =
      statusFilter === "all" || p.status === statusFilter;

    return matchSearch && matchCategory && matchStatus;
  });

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setDeleting(true);
      const res = await fetch(`/api/admin/products/${deleteTarget._id || deleteTarget.slug}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p._id !== deleteTarget._id && p.slug !== deleteTarget.slug));
        setToast({ type: "success", message: `Product "${deleteTarget.name}" deleted successfully.` });
      } else {
        setToast({ type: "error", message: "Failed to delete product." });
      }
    } catch (e) {
      setToast({ type: "error", message: e.message });
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const toggleStatus = async (product) => {
    const nextStatus = product.status === "published" ? "draft" : "published";
    try {
      const res = await fetch(`/api/admin/products/${product._id || product.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...product, status: nextStatus }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) =>
            (p._id && p._id === product._id) || p.slug === product.slug
              ? { ...p, status: nextStatus }
              : p
          )
        );
        setToast({
          type: "success",
          message: `"${product.name}" status updated to ${nextStatus}.`,
        });
      }
    } catch (e) {
      setToast({ type: "error", message: "Failed to update status." });
    }
  };

  return (
    <AdminLayout title="Product Management — Auronova Exports Admin">
      <AdminHeader
        badge="Catalogue CMS"
        title="Spices Catalogue Management"
        description="Add, edit, publish, or remove spice commodities from the export catalogue. Origin information, packaging specifications, and B2B descriptions."
        actions={
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#FAF7F0] bg-[#4A2C20] hover:bg-[#351E16] shadow-sm transition-colors"
          >
            <Plus size={15} className="text-[#D6A441]" />
            <span>Add New Spice</span>
          </Link>
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
            placeholder="Search spice by name, botanical name, or origin..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs font-medium text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                Category: {c === "all" ? "All Categories" : c}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs font-medium text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
          >
            <option value="all">Status: All</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-[#E8E0D2] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF7F0] text-[11px] font-bold uppercase tracking-wider text-[#4A2C20] border-b border-[#E8E0D2]">
                <th className="py-3.5 px-4">Spice Product</th>
                <th className="py-3.5 px-4">Botanical Name</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Regional Origin</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E0D2]/60 text-xs">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#24251F]/60">
                    Loading products catalogue...
                  </td>
                </tr>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
                  <tr key={p._id || p.slug} className="hover:bg-[#FAF7F0]/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-12 h-12 rounded-xl object-cover border border-[#E8E0D2] flex-shrink-0"
                        />
                        <div>
                          <span className="font-bold text-sm text-[#24251F] block leading-tight">
                            {p.name}
                          </span>
                          <span className="text-[11px] text-[#24251F]/60 block mt-0.5">
                            /{p.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 italic text-[#24251F]/80">
                      {p.botanicalName || "—"}
                    </td>

                    <td className="py-3 px-4 font-medium text-[#4A2C20]">
                      {p.category}
                    </td>

                    <td className="py-3 px-4 max-w-xs">
                      <span className="text-[#526747] font-medium block truncate" title={p.origin}>
                        {p.origin}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleStatus(p)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${
                          p.status === "published"
                            ? "bg-[#526747]/10 text-[#526747] hover:bg-[#526747]/20"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                        title="Click to toggle published / draft"
                      >
                        {p.status === "published" ? (
                          <>
                            <CheckCircle2 size={12} />
                            <span>Published</span>
                          </>
                        ) : (
                          <>
                            <XCircle size={12} />
                            <span>Draft</span>
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <Link
                          href={`/products#${p.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-[#24251F]/60 hover:text-[#24251F] hover:bg-[#FAF7F0] transition-colors"
                          title="View on public website"
                        >
                          <ExternalLink size={15} />
                        </Link>
                        <Link
                          href={`/admin/products/${p._id || p.slug}`}
                          className="p-1.5 rounded-lg text-[#526747] hover:text-[#4A2C20] hover:bg-[#526747]/10 transition-colors"
                          title="Edit spice details"
                        >
                          <Edit size={15} />
                        </Link>
                        <button
                          onClick={() => setDeleteTarget(p)}
                          className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                          title="Delete spice"
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
                    No products found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-[#FAF7F0] border-t border-[#E8E0D2] flex items-center justify-between text-xs text-[#24251F]/70">
          <span>
            Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> products
          </span>
          <span className="text-[11px] text-[#4A2C20]">
            Products are synchronized with MongoDB and persistent fallback storage.
          </span>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title={`Delete "${deleteTarget?.name}"?`}
        message="Are you sure you want to remove this spice from the catalogue? This will remove it from the public catalogue."
        confirmLabel="Confirm Delete"
        confirmVariant="danger"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* Notification Toast */}
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

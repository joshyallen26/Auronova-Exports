import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminHeader from "@/components/admin/AdminHeader";
import ProductForm from "@/components/admin/ProductForm";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    async function loadProduct() {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/products/${id}`);
        if (!res.ok) {
          throw new Error("Product not found");
        }
        const data = await res.json();
        setProduct(data.product);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  return (
    <AdminLayout title={`Edit ${product?.name || "Spice"} — Auronova Exports Admin`}>
      <AdminHeader
        badge="Catalogue Editor"
        title={loading ? "Loading Spice Details..." : `Edit: ${product?.name}`}
        description="Update specifications, characteristics, origin, and packaging configurations."
        backHref="/admin/products"
        backLabel="Back to Products"
      />

      {loading ? (
        <div className="bg-white rounded-2xl p-12 text-center text-xs text-[#24251F]/60 border border-[#E8E0D2]">
          Loading product specifications...
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-700 p-6 rounded-2xl border border-red-200 text-xs">
          {error}. Please verify the product ID or return to the product list.
        </div>
      ) : (
        <ProductForm initialData={product} isNew={false} />
      )}
    </AdminLayout>
  );
}

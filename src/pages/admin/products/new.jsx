import AdminLayout from "@/components/admin/AdminLayout";
import AdminHeader from "@/components/admin/AdminHeader";
import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <AdminLayout title="Add New Spice Product — Auronova Exports Admin">
      <AdminHeader
        badge="Catalogue"
        title="Add New Spice Commodity"
        description="Add a new authentic Indian spice product to the international export catalogue."
        backHref="/admin/products"
        backLabel="Back to Products"
      />
      <ProductForm isNew={true} />
    </AdminLayout>
  );
}
